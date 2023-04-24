import { createConversation } from "@grammyjs/conversations";
import { AM_LANGUAGE, EN_LANGUAGE } from "../config/constants";
import { Composer } from "grammy";
import { MyContext } from "../types";
import { houseRentPostConversation } from "../conversations/broker/houseRentPostConversation";
import { houseSellPostConversation } from "../conversations/broker/houseSellPostConversation";
import { getMyHouses, paginateHouse } from "../utils/broker/pagination";
import { hears } from "@grammyjs/i18n";
import {
  getBrokerMainMenuKeyboard,
  selectLanguageKeyboard,
} from "../components/keyboards";
import { Language } from "@prisma/client";
import { User } from "../config/prisma";

export default function (brokerRouter: Composer<MyContext>) {
  //TODO : fix conversation might stuck in error
  brokerRouter.errorBoundary((err) => {
    console.log("broker sell house error : ", err.message);
  }, createConversation(houseRentPostConversation));
  brokerRouter.errorBoundary(
    (err) => {
      console.log("broker sell house error : ", err.message);
    }, //error handler for conversation
    createConversation(houseSellPostConversation)
  );
  brokerRouter.filter(hears("RENT_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseRentPostConversation");
  });
  brokerRouter.command("start", async (ctx) => {
    ctx.reply(await ctx.i18n.getLocale());
  });
  brokerRouter.filter(hears("SELL_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseSellPostConversation");
  });
  brokerRouter.filter(hears("MY_HOUSES"), getMyHouses);
  brokerRouter.callbackQuery(/^(\/house\/page\/.+)/gi, paginateHouse);

  brokerRouter.filter(hears("SETTING"), async (ctx) => {
    await ctx.reply(ctx.t("SETTING"), {
      reply_markup: selectLanguageKeyboard,
    });
  });
  brokerRouter.hears([EN_LANGUAGE, AM_LANGUAGE], async (ctx) => {
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
      reply_markup: getBrokerMainMenuKeyboard(ctx),
    });
  });
}
