import { Language } from "@prisma/client";
import {
  getHomeSeekerMainMenuKeyboard,
  selectLanguageKeyboard,
} from "../../components/keyboards";
import { AM_LANGUAGE, EN_LANGUAGE } from "../../config/constants";
import { User } from "../../config/prisma";
import { MyContext, MyConversation } from "../../types";
async function handleCancelFromCtx(ctx: MyContext) {
  if (ctx.message?.text == ctx.t("CANCEL")) {
    await ctx.reply(ctx.t("mm"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
    return await ctx.conversation.exit();
  }
}
//TODO remove this fucntion
export async function settingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(ctx.t("SETTING"), {
    reply_markup: selectLanguageKeyboard,
  });
  const lang = await conversation.form.select([EN_LANGUAGE, AM_LANGUAGE]);
  await ctx.i18n.setLocale(lang == EN_LANGUAGE ? "en" : "am");
  await User.update({
    data: {
      language: AM_LANGUAGE == lang ? Language.AM : Language.EN,
    },
    where: {
      telegramId: String(ctx.from?.id),
    },
  });
  await ctx.reply(ctx.t("success-lang-chng"), {
    reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
  });
  return;
}
