import { Language, UserType } from "@prisma/client";
import {
  getBrokerMainMenuKeyboard,
  getHomeSeekerMainMenuKeyboard,
  getSelectUserTypeKeyboard,
  getSharePhoneKeyboard,
} from "../components/keyboards";
import { User } from "../config/prisma";
import { MyContext, MyConversation } from "../types";
import brokerRegistration from "./broker/broker-registration.conversation";
import { i18n } from "../config/botConfig";
export default async function greetingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await conversation.run(i18n);
  await ctx.reply(ctx.t("pick-acct-type"), {
    reply_markup: getSelectUserTypeKeyboard(ctx),
  });

  const userType = await conversation.form.select([
    ctx.t("BROKER"),
    ctx.t("HOME_SEEKER"),
  ]);
  if (userType == ctx.t("BROKER")) {
    const { contact, fullName, subCity } = await brokerRegistration(
      conversation,
      ctx
    );
    await User.create({
      data: {
        telegramId: String(ctx.from?.id),
        userType: UserType.BROKER,
        telegramFirstName: ctx.from?.first_name,
        telegramLastName: ctx.from?.last_name,
        fullName,
        subCity,
        phoneNumber: contact.message?.contact?.phone_number,
        language:
          (await ctx.i18n.getLocale()) == "am" ? Language.AM : Language.EN,
        userName: ctx.from?.username,
      },
    });
    await ctx.reply(ctx.t("success-registerd"), {
      reply_markup: getBrokerMainMenuKeyboard(ctx),
    });
  } else {
    await ctx.reply(ctx.t("pls-share-yr-ctact"), {
      reply_markup: getSharePhoneKeyboard(ctx),
    });
    const contact = await conversation.waitFor(":contact");
    await User.create({
      data: {
        telegramId: String(ctx.from?.id),
        telegramFirstName: ctx.from?.first_name,
        telegramLastName: ctx.from?.last_name,
        phoneNumber: contact.message?.contact?.phone_number,
        language:
          (await ctx.i18n.getLocale()) == "am" ? Language.AM : Language.EN,
        userType: UserType.HOME_SEEKER,
        userName: ctx.from?.username,
      },
    });
    await ctx.reply(ctx.t("success-registerd"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
  }
}
