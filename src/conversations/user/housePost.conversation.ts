import {
  getBrokerMainMenuKeyboard,
  getCancelKeyboard,
  getCancelWithDoneKeyboard,
  getUserMainMenuKeyboard,
} from "../../components/keyboards";
import {
  ADMIN_TELEGRAM_ID,
  MAX_IMG_SIZE,
  SUBMIT,
} from "../../config/constants";
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
import bot from "../../config/botConfig";
import { House } from "../../entity/House";
import { HouseImage } from "../../entity/HouseImage";
import { User } from "../../entity/User";
import { InputMediaPhoto } from "grammy/types";
async function handleCancelFromCtx(ctx: MyContext) {
  if (ctx.message?.text == ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
    return await ctx.conversation.exit();
  } else if (ctx.message?.text == ctx.t("DONE")) {
    return true; // TO BREAK THE FOR LOOP
  }
}
export async function housePostConversation(
  conversation: MyConversation,
  ctx: MyContext,
  housePostType: any
) {
  let message;
  let imgArray: string[] = [];
  for (; imgArray.length < MAX_IMG_SIZE; ) {
    await ctx.reply(
      // IMG_SIZE - imgArray.lengthJ
      ctx.t("pls-shr-pic-z-house", {
        imgLength: MAX_IMG_SIZE - imgArray.length,
      }),
      {
        reply_markup:
          imgArray.length >= 3
            ? getCancelWithDoneKeyboard(ctx) // IF IMG ARRAY LENGTH IS GREATER THAN 3
            : getCancelKeyboard(ctx),
      }
    );
    const img = await conversation.waitFor([":text", ":photo"]);
    if (img.message?.photo) {
      imgArray.push(img.message?.photo[0].file_id as string);
    } else {
      if (img.message?.text == ctx.t("DONE")) {
        break;
      } else if (img.message?.text == ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
          reply_markup: getUserMainMenuKeyboard(ctx),
        });
        return await ctx.conversation.exit();
      }
    }
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
    ...(Array(imgArray.length - 1)
      .fill(1)
      .map((_, i) => {
        return {
          type: "photo",
          media: imgArray[i + 1] as string,
        };
      }) as InputMediaPhoto[]),
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
    let houseImageArray: HouseImage[] = [];
    for (let i = 0; i < imgArray.length - 1; i++) {
      const houseImage = new HouseImage();
      houseImage.image = imgArray[i] as string;
      houseImageArray.push(houseImage);
      await houseImage.save();
    }
    const house = new House();
    house.area = area;
    house.numberOfBathrooms = numberOfBathrooms;
    house.numberOfBedrooms = numberOfBedrooms;
    house.subCity = subCity;
    house.user = (await User.findOne({
      where: {
        telegramId: String(ctx.from?.id),
      },
    })) as User;
    house.price = priceOfTheHouse;
    house.housePostType = housePostType;
    house.woredaOrSpecificPlace = woredaOrSpecificPlace;
    house.propertyType = propertyType;
    house.houseImages = houseImageArray;
    const savedHouse = await house.save();
    await ctx.reply(ctx.t("success-submit-house"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
    message = await bot.api.sendMediaGroup(ADMIN_TELEGRAM_ID, [
      {
        type: "photo",
        media: imgArray[0] as string,
        parse_mode: "HTML",
        caption: housePostWithStatusBuilder(ctx, "PENDING", {
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
      ...(Array(imgArray.length - 1)
        .fill(1)
        .map((_, i) => {
          return {
            type: "photo",
            media: imgArray[i + 1] as string,
          };
        }) as InputMediaPhoto[]),
    ]);
    await bot.api.sendMessage(ADMIN_TELEGRAM_ID, "confirm", {
      reply_to_message_id: message[0].message_id,
      reply_markup: {
        inline_keyboard: [
          [
            {
              callback_data: `/house/approve/${savedHouse.id}/${message[0].message_id}`,
              text: "Approve",
            },
            {
              callback_data: `/house/reject/${savedHouse.id}/${message[0].message_id}`,
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
