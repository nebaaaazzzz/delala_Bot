import {
  brokerMainMenuKeyboard,
  cancelKeyboard,
} from "../../components/keyboards";
import {
  ADMIN_TELEGRAM_ID,
  CANCEL,
  PROPERTY_TYPES,
  SUBCITIES,
  SUBMIT,
} from "../../config/constants";
import { MyContext, MyConversation } from "../../types";
import {
  selectPropertyKeyboardWithCancle,
  selectSubCityKeyboardWithCancle,
} from "../../components/keyboards";
import {
  housePostBuilder,
  housePostWithStatusBuilder,
} from "../../utils/housepost";
import { confirmHousePostInlineKeyboard } from "../../components/inline-keyboard";
import { House, HouseImage } from "../../config/prisma";
import { HousePostType } from "@prisma/client";
import bot from "../../config/botConfig";
async function handleCancelFromCtx(ctx: MyContext) {
  if (ctx.message?.text == CANCEL) {
    await ctx.reply("Main menu", {
      reply_markup: brokerMainMenuKeyboard,
    });
    return await ctx.conversation.exit();
  }
}
export async function housePostConversation(
  conversation: MyConversation,
  ctx: MyContext,
  housePostType: HousePostType
) {
  let imgArray = [];
  const IMG_SIZE = 3;
  for (; imgArray.length < 3; ) {
    await ctx.reply(
      `Please share ${IMG_SIZE - imgArray.length} photos of the house`,
      {
        reply_markup: cancelKeyboard,
      }
    );
    const img = await conversation.waitFor(":photo", {
      otherwise: async (ctx) => {
        return await handleCancelFromCtx(ctx);
      },
    });
    imgArray.push(img.message?.photo[0].file_id);
  }
  await ctx.reply("Select subcity of the house", {
    reply_markup: selectSubCityKeyboardWithCancle,
  });
  const subCity = await conversation.form.select(SUBCITIES, async (ctx) => {
    await handleCancelFromCtx(ctx);
  });

  //**woreda start */
  await ctx.reply("woreda / specific", {
    reply_markup: cancelKeyboard,
  });
  const woredaOrSpecificPlace = await conversation.form.text();
  if (woredaOrSpecificPlace === CANCEL) {
    await ctx.reply("Main menu", {
      reply_markup: brokerMainMenuKeyboard,
    });
    return;
  }
  //**end woreda  */

  //**start property type  */
  await ctx.reply("property type", {
    reply_markup: selectPropertyKeyboardWithCancle,
  });
  const propertyType = await conversation.form.select(
    PROPERTY_TYPES,
    async (ctx) => await handleCancelFromCtx(ctx)
  );
  //**end property type  */

  //**start area  */
  await ctx.reply("Area ", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
  const area = await conversation.form.text();
  //**end area  */

  //**start num of bedroom  */
  await ctx.reply("Number of bedrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBedrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });

  //**start num of bathroom  */
  await ctx.reply("number of bathrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBathrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  //**end num of bathroom  */

  //**start price  */
  await ctx.reply("price of the house", {
    reply_markup: cancelKeyboard,
  });
  const priceOfTheHouse = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  //**end price  */

  await ctx.replyWithMediaGroup([
    {
      type: "photo",
      media: imgArray[0] as string,
      parse_mode: "HTML",
      caption: housePostBuilder({
        area,
        numberOfBathrooms,
        numberOfBedrooms,
        priceOfTheHouse,
        subCity,
        woredaOrSpecificPlace,
        propertyType,
      }),
    },
    {
      type: "photo",
      media: imgArray[1] as string,
    },
    {
      type: "photo",
      media: imgArray[2] as string,
    },
  ]);
  await ctx.reply("confirmation to submit the house", {
    reply_markup: confirmHousePostInlineKeyboard,
  });
  const cbData = await conversation.waitFor("callback_query:data");
  let submitted = cbData.callbackQuery.data == SUBMIT;
  if (submitted) {
    const house = await House.create({
      data: {
        numberOfBathrooms,
        numberOfBedrooms,
        subCity,
        userTelegramID: String(ctx.from?.id),
        woredaOrSpecificPlace,
        area,
        propertyType,
        housePostType: housePostType,
        price: priceOfTheHouse,
      },
    });
    for (let i = 0; i < 3; i++) {
      await HouseImage.create({
        data: {
          houseId: house.id,
          image: imgArray[i] as string,
          // houseID: house.id,
          // imageID: messagId[i],
        },
      });
    }
    await ctx.reply("Successfully submitted the house wait for a review", {
      reply_markup: brokerMainMenuKeyboard,
    });
    const message = await bot.api.sendMediaGroup(ADMIN_TELEGRAM_ID, [
      {
        type: "photo",
        media: imgArray[0] as string,
        parse_mode: "HTML",
        caption: housePostWithStatusBuilder(house.status, {
          area,
          numberOfBathrooms,
          numberOfBedrooms,
          priceOfTheHouse,
          subCity,
          woredaOrSpecificPlace,
          propertyType,
        }),
      },
      {
        type: "photo",
        media: imgArray[1] as string,
      },
      {
        type: "photo",
        media: imgArray[2] as string,
      },
    ]);
    await bot.api.sendMessage(ADMIN_TELEGRAM_ID, "confirm", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              callback_data: `/house/approve/${house.id}`,
              text: "Approve",
            },
            {
              callback_data: `/house/reject/${house.id}`,
              text: "Reject",
            },
          ],
        ],
      },
    });
  } else {
    await ctx.reply("Submission cancled", {
      reply_markup: brokerMainMenuKeyboard,
    });
  }
}
