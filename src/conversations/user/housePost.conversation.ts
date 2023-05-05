import {
  getBrokerMainMenuKeyboard,
  getCancelKeyboard,
  getUserMainMenuKeyboard,
} from "../../components/keyboards";
import { ADMIN_TELEGRAM_ID, SUBMIT } from "../../config/constants";
import { MyContext, MyConversation, SessionData } from "../../types";
import {
  getSelectPropertyTypeKeyboardWithCancel,
  getSelectSubCityKeyboardWithCancel,
} from "../../components/keyboards";
import {
  housePostBuilder,
  housePostWithStatusBuilder,
} from "../../utils/housepost";
import { getConfirmHousePostInlineKeyboard } from "../../components/inline-keyboard";
import { House, HouseImage } from "../../config/db";
import { HousePostType } from "@prisma/client";
import bot from "../../config/botConfig";
async function handleCancelFromCtx(ctx: MyContext) {
  if (ctx.message?.text == ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
    return await ctx.conversation.exit();
  }
}
export async function housePostConversation(
  conversation: MyConversation,
  ctx: MyContext,
  housePostType: HousePostType
) {
  let message;
  let imgArray = [];
  const IMG_SIZE = 3;
  for (; imgArray.length < 3; ) {
    await ctx.reply(
      // IMG_SIZE - imgArray.length
      ctx.t("pls-shr-pic-z-house", {
        imgLength: IMG_SIZE - imgArray.length,
      }),
      {
        reply_markup: getCancelKeyboard(ctx),
      }
    );
    const img = await conversation.waitFor(":photo", {
      otherwise: async (ctx) => {
        return await handleCancelFromCtx(ctx);
      },
    });
    imgArray.push(img.message?.photo[0].file_id);
  }
  await ctx.reply(ctx.t("Slct-sub-city-zhouse"), {
    reply_markup: getSelectSubCityKeyboardWithCancel(ctx),
  });
  const subCity = await conversation.form.select(
    JSON.parse(ctx.t("SUBCITIES")),
    async (ctx) => {
      await handleCancelFromCtx(ctx);
    }
  );

  //**woreda start */
  await ctx.reply(ctx.t("wrda-spcic-loc"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const woredaOrSpecificPlace = await conversation.form.text();
  if (woredaOrSpecificPlace === ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
    return;
  }
  //**end woreda  */

  //**start property type  */
  await ctx.reply(ctx.t("pprty-type"), {
    reply_markup: getSelectPropertyTypeKeyboardWithCancel(ctx),
  });
  const propertyType = await conversation.form.select(
    JSON.parse(ctx.t("PROPERTY_TYPES")),
    async (ctx) => await handleCancelFromCtx(ctx)
  );
  //**end property type  */

  //**start area  */
  await ctx.reply(ctx.t("area-z-house"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const area = await conversation.form.text();
  if (area === ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
    return;
  }
  //**end area  */

  //**start num of bedroom  */
  await ctx.reply(ctx.t("nmbr-bedrooms"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const numberOfBedrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });

  //**start num of bathroom  */
  await ctx.reply(ctx.t("nmbr-bathrooms"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const numberOfBathrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  //**end num of bathroom  */

  //**start price  */
  await ctx.reply(ctx.t("price-z-house"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const priceOfTheHouse = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  //**end price  */

  message = await ctx.replyWithMediaGroup([
    {
      type: "photo",
      media: imgArray[0] as string,
      parse_mode: "HTML",
      caption: housePostBuilder(ctx, {
        area,
        numberOfBathrooms,
        numberOfBedrooms,
        priceOfTheHouse,
        subCity,
        woredaOrSpecificPlace,
        propertyType,
        housePostType,
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
  await ctx.reply(ctx.t("cfirm-submit-house"), {
    reply_to_message_id: message[0].message_id,
    reply_markup: {
      remove_keyboard: true,
      inline_keyboard: getConfirmHousePostInlineKeyboard(ctx),
    },
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
    await ctx.reply(ctx.t("success-submit-house"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
    message = await bot.api.sendMediaGroup(ADMIN_TELEGRAM_ID, [
      {
        type: "photo",
        media: imgArray[0] as string,
        parse_mode: "HTML",
        caption: housePostWithStatusBuilder(ctx, house.status, {
          area,
          numberOfBathrooms,
          numberOfBedrooms,
          priceOfTheHouse,
          subCity,
          woredaOrSpecificPlace,
          propertyType,
          housePostType,
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
      reply_to_message_id: message[0].message_id,
      reply_markup: {
        inline_keyboard: [
          [
            {
              callback_data: `/house/approve/${house.id}/${message[0].message_id}`,
              text: "Approve",
            },
            {
              callback_data: `/house/reject/${house.id}/${message[0].message_id}`,
              text: "Reject",
            },
          ],
        ],
      },
    });
  } else {
    await housePostConversation(conversation, ctx, housePostType);
  }
}
