import { HouseRequestType } from "@prisma/client";
import { confirmHousePostInlineKeyboard } from "../../components/inline-keyboard";
import {
  cancelKeyboard,
  homeSeekerMainMenuKeyboard,
  selectPropertyKeyboardWithCancle,
  selectRequestTypeKeyboardWithCancel,
  selectSubCityKeyboardWithCancle,
} from "../../components/keyboards";
import {
  ADMIN_TELEGRAM_ID,
  BUY_HOUSE,
  CANCEL,
  PROPERTY_TYPES,
  RENT_HOUSE,
  SUBCITIES,
  SUBMIT,
} from "../../config/constants";
import { HouseRequest, User } from "../../config/prisma";
import { MyContext, MyConversation } from "../../types";
import bot from "../../config/botConfig";
import { housePostBuilder } from "../../utils/housepost";
import { houseRequestBuilder } from "../../utils/houseRequest";
async function handleCancelFromCtx(ctx: MyContext) {
  if (ctx.message?.text == CANCEL) {
    await ctx.reply("Main menu", {
      reply_markup: homeSeekerMainMenuKeyboard,
    });
    return await ctx.conversation.exit();
  }
}
// async function handleCancel(text:string){
//   if (text == CANCEL) {
//     await ctx.reply("Canceled");
//     await ctx.reply("Main menu", {
//       reply_markup: brokerMainMenuKeyboard,
//     });
//     return await ctx.conversation.exit();
//   }
// }
export async function houseRequestConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  // **** choose rent or buy
  await ctx.reply("rent or buy", {
    reply_markup: selectRequestTypeKeyboardWithCancel,
  });
  const houseRequestType = await conversation.form.select(
    [BUY_HOUSE, RENT_HOUSE],
    async (ctx) => {
      await handleCancelFromCtx(ctx);
    }
  );
  //**** end choose rent or buy

  // **** choose subcity
  await ctx.reply("Select subcity of the house", {
    reply_markup: selectSubCityKeyboardWithCancle,
  });
  const subCity = await conversation.form.select(SUBCITIES, async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  // **** end choose subcity

  //****enter woreda/specific
  await ctx.reply("woreda / specific", {
    reply_markup: cancelKeyboard,
  });
  const woredaOrSpecificPlace = await conversation.form.text();
  if (woredaOrSpecificPlace === CANCEL) {
    await ctx.reply("Main menu", {
      reply_markup: homeSeekerMainMenuKeyboard,
    });
    return;
  }
  //****end enter woreda/specific

  //*** property type
  await ctx.reply("property type", {
    reply_markup: selectPropertyKeyboardWithCancle,
  });
  const propertyType = await conversation.form.select(
    PROPERTY_TYPES,
    async (ctx) => await handleCancelFromCtx(ctx)
  );
  //*** end property type

  await ctx.reply("Area ", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
  const area = await conversation.form.text(async (ctx) => {
    await handleCancelFromCtx(ctx);
    await ctx.reply("Please enter area ", {
      reply_markup: {
        remove_keyboard: true,
      },
    });
  });
  await ctx.reply("Number of bedrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBedrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  await ctx.reply("number of bathrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBathrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  await ctx.reply("price of the house", {
    reply_markup: cancelKeyboard,
  });
  const priceOfTheHouse = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  await ctx.reply(
    housePostBuilder({
      area,
      numberOfBathrooms,
      numberOfBedrooms,
      priceOfTheHouse,
      subCity,
      woredaOrSpecificPlace,
    }),
    {
      parse_mode: "HTML",
      reply_markup: confirmHousePostInlineKeyboard,
    }
  );
  const cbData = await conversation.waitFor("callback_query:data");
  if (cbData.callbackQuery.data == SUBMIT) {
    const house = await HouseRequest.create({
      data: {
        numberOfBathrooms,
        numberOfBedrooms,
        subCity,
        userTelegramID: String(ctx.from?.id),
        woredaOrSpecificPlace,
        area,
        propertyType,
        price: priceOfTheHouse,
        houseRequestType:
          houseRequestType == "Buy house"
            ? HouseRequestType.BUY
            : HouseRequestType.RENT,
      },
    });
    const user = await User.findUnique({
      where: {
        telegramId: String(ctx.from?.id),
      },
    });
    await ctx.reply(
      "Successfully submitted we will contact you with you requirement",
      {
        reply_markup: homeSeekerMainMenuKeyboard,
      }
    );
    await bot.api.sendMessage(
      ADMIN_TELEGRAM_ID,
      houseRequestBuilder({
        area,
        houseRequestType,
        numberOfBathrooms,
        numberOfBedrooms,
        phoneNumber: String(user?.phoneNumber),
        priceOfTheHouse,
        subCity,
        woredaOrSpecificPlace,
      }),
      {
        parse_mode: "HTML",
      }
    );
    return;
  } else if (cbData.callbackQuery.data == CANCEL) {
    await ctx.reply("Submission cancled", {
      reply_markup: homeSeekerMainMenuKeyboard,
    });
  }
}
