import { HouseRequestType } from "@prisma/client";
import { getConfirmHousePostInlineKeyboard } from "../../components/inline-keyboard";
import {
  getCancelKeyboard,
  getHomeSeekerMainMenuKeyboard,
  getSelectPropertyTypeKeyboardWithCancel,
  getSelectRequestTypeKeyboardWithCancel,
  getSelectSubCityKeyboardWithCancel,
} from "../../components/keyboards";
import { ADMIN_TELEGRAM_ID, CANCEL, SUBMIT } from "../../config/constants";
import { HouseRequest, User } from "../../config/prisma";
import { MyContext, MyConversation } from "../../types";
import bot from "../../config/botConfig";
import { housePostBuilder } from "../../utils/housepost";
import { houseRequestBuilder } from "../../utils/houseRequest";
async function handleCancelFromCtx(ctx: MyContext) {
  if (ctx.message?.text == ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
    return await ctx.conversation.exit();
  }
}

export async function houseRequestConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  // **** choose rent or buy
  await ctx.reply(ctx.t("rent-buy"), {
    reply_markup: getSelectRequestTypeKeyboardWithCancel(ctx),
  });
  const houseRequestType = await conversation.form.select(
    [ctx.t("BUY_HOUSE"), ctx.t("RENT_HOUSE")],
    async (ctx) => {
      console.log("other");
      await handleCancelFromCtx(ctx);
    }
  );
  //**** end choose rent or buy

  // **** choose subcity
  await ctx.reply(ctx.t("Slct-sub-city-zhouse"), {
    reply_markup: getSelectSubCityKeyboardWithCancel(ctx),
  });
  const subCity = await conversation.form.select(
    JSON.parse(ctx.t("SUBCITIES")),
    async (ctx) => {
      await handleCancelFromCtx(ctx);
    }
  );
  // **** end choose subcity

  //****enter woreda/specific
  await ctx.reply(ctx.t("wrda-spcic-loc"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const woredaOrSpecificPlace = await conversation.form.text();
  if (woredaOrSpecificPlace === ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
    return;
  }
  //****end enter woreda/specific

  //*** property type
  await ctx.reply(ctx.t("pprty-type"), {
    reply_markup: getSelectPropertyTypeKeyboardWithCancel(ctx),
  });
  const propertyType = await conversation.form.select(
    JSON.parse(ctx.t("PROPERTY_TYPES")),
    async (ctx) => await handleCancelFromCtx(ctx)
  );
  //*** end property type

  await ctx.reply(ctx.t("area-z-house"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const area = await conversation.form.text();
  if (area === ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
    return;
  }
  await ctx.reply(ctx.t("nmbr-bedrooms"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const numberOfBedrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  await ctx.reply(ctx.t("nmbr-bathrooms"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const numberOfBathrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  await ctx.reply(ctx.t("price-z-house"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const priceOfTheHouse = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  await ctx.reply(
    housePostBuilder(ctx, {
      area,
      numberOfBathrooms,
      numberOfBedrooms,
      priceOfTheHouse,
      subCity,
      woredaOrSpecificPlace,
      housePostType: houseRequestType,
      propertyType,
    }),
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: getConfirmHousePostInlineKeyboard(ctx),
      },
    }
  );
  const cbData = await conversation.waitFor("callback_query:data");
  if (cbData.callbackQuery.data == SUBMIT) {
    await HouseRequest.create({
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
          houseRequestType == ctx.t("BUY_HOUSE")
            ? HouseRequestType.BUY
            : HouseRequestType.RENT,
      },
    });
    const user = await User.findUnique({
      where: {
        telegramId: String(ctx.from?.id),
      },
    });
    await ctx.reply(ctx.t("success-submit-request"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
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
    await ctx.reply(ctx.t("submission-cancle"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
  }
}
