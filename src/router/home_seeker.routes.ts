import { Composer } from "grammy";
import { MyContext } from "../types";
import { createConversation } from "@grammyjs/conversations";
import { houseRequestConversation } from "../conversations/house-seeker/houseRequestConversation";
import { settingConversation } from "../conversations/house-seeker/setting.conversation";
import { hears } from "@grammyjs/i18n";
import {
  getHomeSeekerMainMenuKeyboard,
  selectLanguageKeyboard,
} from "../components/keyboards";
import { AM_LANGUAGE, EN_LANGUAGE } from "../config/constants";
import { User } from "../config/prisma";
import { Language } from "@prisma/client";

export default function (userRouter: Composer<MyContext>) {
  userRouter.errorBoundary((e) => {},
  createConversation(houseRequestConversation));
  userRouter.errorBoundary((e) => {}, createConversation(settingConversation));
  userRouter.filter(hears("REQUEST_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseRequestConversation");
  });

  userRouter.filter(hears("SETTING"), async (ctx) => {
    await ctx.reply(ctx.t("SETTING"), {
      reply_markup: selectLanguageKeyboard,
    });
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
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
  });
}
