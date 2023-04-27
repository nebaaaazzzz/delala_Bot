import { Language } from "@prisma/client";
import {
  getUserMainMenuKeyboard,
  getSharePhoneKeyboard,
} from "../components/keyboards";
import { User } from "../config/prisma";
import { MyContext, MyConversation } from "../types";
import { i18n } from "../config/botConfig";
export default async function greetingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await conversation.run(i18n);
  await ctx.reply(ctx.t("pls-share-yr-ctact"), {
    reply_markup: getSharePhoneKeyboard(ctx),
  });
  const contact = await conversation.waitFor(":contact");
  await ctx.reply(ctx.t("pls-snd-yr-fn"), {
    reply_markup: {
      remove_keyboard: true,
    },
  });
  const fullName = await conversation.form.text();
  await User.create({
    data: {
      telegramId: String(ctx.from?.id),
      telegramFirstName: ctx.from?.first_name,
      telegramLastName: ctx.from?.last_name,
      fullName,
      phoneNumber: contact.message?.contact?.phone_number,
      language:
        (await ctx.i18n.getLocale()) == "am" ? Language.AM : Language.EN,
      userName: ctx.from?.username,
    },
  });
  await ctx.reply(ctx.t("success-registerd"), {
    reply_markup: getUserMainMenuKeyboard(ctx),
  });
}
