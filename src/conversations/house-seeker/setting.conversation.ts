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

export async function settingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("setting", {
    reply_markup: selectLanguageKeyboard,
  });
  const lang = await conversation.form.select([EN_LANGUAGE, AM_LANGUAGE]);
  await User.update({
    data: {
      language: AM_LANGUAGE == lang ? Language.AM : Language.EN,
    },
    where: {
      telegramId: String(ctx.from?.id),
    },
  });
  await ctx.reply("successfuly language set", {
    reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
  });
  return;
}
