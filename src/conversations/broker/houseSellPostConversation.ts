import { HousePostType } from "@prisma/client";
import { confirmHousePostInlineKeyboard } from "../../components/inline-keyboard";
import {
  brokerMainMenuKeyboard,
  cancelKeyboard,
  selectSubCityKeyboardWithCancle,
} from "../../components/keyboards";
import {
  ADMIN_TELEGRAM_ID,
  CANCEL,
  SUBCITIES,
  SUBMIT,
} from "../../config/constants";
import { House, HouseImage } from "../../config/prisma";
import { MyContext, MyConversation } from "../../types";
import bot from "../../config/botConfig";
import {
  housePostBuilder,
  housePostWithStatusBuilder,
} from "../../utils/housepost";
import { Conversation, ConversationFn } from "@grammyjs/conversations";
async function handleCancel(ctx: MyContext) {
  if (ctx.message?.text == CANCEL) {
    await ctx.reply("Canceled");
    await ctx.reply("Main menu", {
      reply_markup: brokerMainMenuKeyboard,
    });
    return await ctx.conversation.exit();
  }
}
export async function houseSellPostConversation(
  conversation: MyConversation,
  ctx: MyContext
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
        return await handleCancel(ctx);
      },
    });
    imgArray.push(img.message?.photo[0].file_id);
  }
  await ctx.reply("Select subcity of the house", {
    reply_markup: selectSubCityKeyboardWithCancle,
  });
  const subCity = await conversation.form.select(SUBCITIES, async (ctx) => {
    await handleCancel(ctx);
  });
  await ctx.reply("woreda / specific", {
    reply_markup: cancelKeyboard,
  });
  const woredaOrSpecificPlace = await conversation.form.text(async (ctx) => {});
  await handleCancel(ctx);
  await ctx.reply("property type", {
    reply_markup: cancelKeyboard,
  });

  const propertyType = await conversation.form.text(async (ctx) => {
    return await handleCancel(ctx);
  });
  await handleCancel(ctx);

  await ctx.reply("Area squre meter in number");
  const area = await conversation.form.number(async (ctx) => {
    return await handleCancel(ctx);
  });
  await ctx.reply("Number of bedrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBedrooms = await conversation.form.number(async (ctx) => {
    return await handleCancel(ctx);
  });
  await ctx.reply("number of bathrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBathrooms = await conversation.form.number(async (ctx) => {
    return await handleCancel(ctx);
  });
  await ctx.reply("price of the house", {
    reply_markup: cancelKeyboard,
  });
  const priceOfTheHouse = await conversation.form.number(async (ctx) => {
    return await handleCancel(ctx);
  });
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
  if (cbData.callbackQuery.data == SUBMIT) {
    const house = await House.create({
      data: {
        numberOfBathrooms,
        numberOfBedrooms,
        subCity,
        userTelegramID: String(ctx.from?.id),
        woredaOrSpecificPlace,
        area,
        propertyType,
        housePostType: HousePostType.SALE,
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
    return;
  } else if (cbData.callbackQuery.data == CANCEL) {
    await ctx.reply("Submission cancled", {
      reply_markup: brokerMainMenuKeyboard,
    });
  }
}
