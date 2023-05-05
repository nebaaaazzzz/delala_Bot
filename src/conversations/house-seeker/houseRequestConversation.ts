import { getConfirmHousePostInlineKeyboard } from "../../components/inline-keyboard";
import {
  getCancelKeyboard,
  getSelectPropertyTypeKeyboardWithCancel,
  getSelectRequestTypeKeyboardWithCancel,
  getSelectSubCityKeyboardWithCancel,
  getUserMainMenuKeyboard,
} from "../../components/keyboards";
import { ADMIN_TELEGRAM_ID, CANCEL, SUBMIT } from "../../config/constants";
import { MyContext, MyConversation } from "../../types";
import bot from "../../config/botConfig";
import {
  houseRequestBuilder,
  houseRequestPostBuilder,
} from "../../utils/houseRequest";
import { HouseRequest } from "../../entity/HouseRequest";
import { User } from "../../entity/User";
async function handleCancelFromCtx(ctx: MyContext) {
  if (ctx.message?.text == ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
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

  //*** property type
  await ctx.reply(ctx.t("pprty-type"), {
    reply_markup: getSelectPropertyTypeKeyboardWithCancel(ctx),
  });
  const propertyType = await conversation.form.select(
    JSON.parse(ctx.t("PROPERTY_TYPES")),
    async (ctx) => await handleCancelFromCtx(ctx)
  );
  await ctx.reply(ctx.t("nmbr-bedrooms"), {
    reply_markup: getCancelKeyboard(ctx),
  });
  const numberOfBedrooms = await conversation.form.number(async (ctx) => {
    await handleCancelFromCtx(ctx);
  });
  await ctx.reply(
    houseRequestPostBuilder(ctx, {
      numberOfBedrooms,
      subCity,
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
    await HouseRequest.insert({
      numberOfBedrooms,
      subCity,
      user: (await User.findOne({
        where: {
          telegramId: String(ctx.from?.id),
        },
      })) as User,
      // userTelegramID: String(ctx.from?.id),
      propertyType,
      houseRequestType:
        houseRequestType == ctx.t("BUY_HOUSE") ? "BUY" : "RENT,",
    });
    const user = await User.findOne(
      {
        where: {
          telegramId: String(ctx.from?.id),
        },
      }
      // String(ctx.from?.id),
    );
    await ctx.reply(ctx.t("success-submit-request"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
    await bot.api.sendMessage(
      ADMIN_TELEGRAM_ID,
      houseRequestBuilder({
        houseRequestType,
        numberOfBedrooms,
        phoneNumber: String(user?.phoneNumber),
        subCity,
      }),
      {
        parse_mode: "HTML",
      }
    );
    return;
  } else if (cbData.callbackQuery.data == CANCEL) {
    await houseRequestConversation(conversation, ctx);
  }
}
