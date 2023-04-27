import { createConversation } from "@grammyjs/conversations";
import greetingConversation from "../conversations/greeting.conversation";
import { Composer } from "grammy";
import { MyContext, MyConversation } from "../types";
import {
  getSelectUserTypeKeyboard,
  selectLanguageKeyboard,
} from "../components/keyboards";
import { AM_LANGUAGE, EN_LANGUAGE } from "../config/constants";

export default function (loginRouter: Composer<MyContext>) {
  loginRouter.use(createConversation(greetingConversation));
  loginRouter.command("start", async (ctx) => {
    await ctx.reply(`Welcome! /  እንኳን ደና መጡ  ${ctx?.from?.first_name}`);
    await ctx.reply("Select language / ቋንቋ ይምረጡ ", {
      reply_markup: selectLanguageKeyboard,
    });
  });
  loginRouter.hears([AM_LANGUAGE, EN_LANGUAGE], async (ctx) => {
    const language = ctx.message?.text;
    await ctx.i18n.setLocale(language == AM_LANGUAGE ? "am" : "en");
    await ctx.conversation.enter("greetingConversation");
  });
}
