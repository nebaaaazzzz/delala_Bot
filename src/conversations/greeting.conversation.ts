import { Language, UserType } from "@prisma/client";
import {
  getBrokerMainMenuKeyboard,
  getHomeSeekerMainMenuKeyboard,
  getSelectUserTypeKeyboard,
  getSharePhoneKeyboard,
  selectLanguageKeyboard,
} from "../components/keyboards";
import { AM_LANGUAGE, EN_LANGUAGE } from "../config/constants";
import { User } from "../config/prisma";
import { MyContext, MyConversation } from "../types";
import brokerRegistration from "./broker/broker-registration.conversation";
export default async function greetingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(`Welcome! /  እንኳን ደና መጡ  ${ctx?.from?.first_name}`);
  await ctx.reply("Select language / ቋንቋ ይምረጡ ", {
    reply_markup: selectLanguageKeyboard,
  });
  const language = await conversation.form.select([EN_LANGUAGE, AM_LANGUAGE]); //TODO add regex to limit worde l
  await ctx.i18n.setLocale(language == AM_LANGUAGE ? "am" : "en");
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
        language: language == AM_LANGUAGE ? Language.AM : Language.EN,
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
        language: language as Language,
        userType: UserType.HOME_SEEKER,
        userName: ctx.from?.username,
      },
    });
    await ctx.reply(ctx.t("success-registerd"), {
      reply_markup: getHomeSeekerMainMenuKeyboard(ctx),
    });
  }
}
