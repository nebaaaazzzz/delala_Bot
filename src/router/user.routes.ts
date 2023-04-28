import { createConversation } from "@grammyjs/conversations";
import { AM_LANGUAGE, CANCEL, EN_LANGUAGE } from "../config/constants";
import { Composer } from "grammy";
import { MyContext } from "../types";
import { houseRentPostConversation } from "../conversations/user/houseRentPostConversation";
import { houseSellPostConversation } from "../conversations/user/houseSellPostConversation";
import { getMyHouses, paginateHouse } from "../utils/broker/pagination";
import { hears } from "@grammyjs/i18n";
import {
  getBrokerMainMenuKeyboard,
  getHomeSeekerMainMenuKeyboard,
  getSettingsKeyboard,
  getUserMainMenuKeyboard,
  selectLanguageKeyboard,
} from "../components/keyboards";
import { Language } from "@prisma/client";
import { User } from "../config/prisma";
import { houseRequestConversation } from "../conversations/house-seeker/houseRequestConversation";
import { settingConversation } from "../conversations/house-seeker/setting.conversation";

export default function (userRouter: Composer<MyContext>) {
  /**==============CONVERSATION REGISTRATION START================ */
  //TODO : fix conversation might stuck in error
  userRouter.errorBoundary((err) => {
    console.log("house rent post conversaion : ", err.message);
  }, createConversation(houseRentPostConversation));
  userRouter.errorBoundary(
    (err) => {
      console.log("house rent sell conversaion : ", err.message);
    }, //error handler for conversation
    createConversation(houseSellPostConversation)
  );
  userRouter.errorBoundary((e) => {
    console.log(e.message);
  }, createConversation(houseRequestConversation));
  userRouter.callbackQuery(CANCEL, async (ctx) => {
    console.log("callback query cancel");
    await ctx.conversation.reenter("houseRequestConversation");
  });
  /**==============CONVERSATION REGISTRATION END================ */

  userRouter.filter(hears("RENT_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseRentPostConversation");
  });
  userRouter.filter(hears("SELL_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseSellPostConversation");
  });
  userRouter.filter(hears("MY_HOUSES"), getMyHouses);
  userRouter.callbackQuery(/^(\/house\/page\/.+)/gi, paginateHouse);
  userRouter.filter(hears("BROKER"), async (ctx) => {
    ctx.reply(ctx.t("BROKER"), {
      reply_markup: getBrokerMainMenuKeyboard(ctx),
    });
  });
  userRouter.filter(hears("HOME_SEEKER"), async (ctx) => {
    ctx.reply(ctx.t("HOME_SEEKER"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
  });
  userRouter.filter(hears("back"), async (ctx) => {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
  });
  userRouter.filter(hears("REQUEST_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseRequestConversation");
  });
  userRouter.filter(hears("SETTING"), async (ctx) => {
    console.log("Ssss  : ", await ctx.conversation);
    await ctx.reply(ctx.t("SETTING"), {
      reply_markup: getSettingsKeyboard(ctx),
    });
  });
  userRouter.filter(hears("cng_lang"), async (ctx) => {
    await ctx.reply(ctx.t("SETTING"), {
      reply_markup: selectLanguageKeyboard,
    });
  });
  userRouter.filter(hears("ABOUT_US"), async (ctx) => {
    await ctx.reply(ctx.t("ABOUT_US_TEXT"));
  });
  userRouter.hears([EN_LANGUAGE, AM_LANGUAGE], async (ctx) => {
    const language = ctx.message?.text;
    await ctx.i18n.setLocale(language == AM_LANGUAGE ? "am" : "en");
    await User.update({
      data: {
        language: AM_LANGUAGE == language ? Language.AM : Language.EN,
      },
      where: {
        telegramId: String(ctx.from?.id),
      },
    });
    await ctx.reply(ctx.t("success-lang-chng"), {
      reply_markup: getUserMainMenuKeyboard(ctx),
    });
  });
}
