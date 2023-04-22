import { Language, UserType } from "@prisma/client";
import {
  brokerMainMenuKeyboard,
  homeSeekerMainMenuKeyboard,
  selectLanguageKeyboard,
  selectUserTypeKeyboard,
  sharePhoneKeyboard,
} from "../components/keyboards";
import {
  AM_LANGUAGE,
  BROKER,
  EN_LANGUAGE,
  HOME_SEEKER,
} from "../config/constants";
import { User } from "../config/prisma";
import { MyContext, MyConversation } from "../types";
import brokerRegistration from "./broker/broker-registration.conversation";
export default async function greetingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(`Welcome! ${ctx?.from?.first_name}`);
  let message = await ctx.reply("Select language", {
    reply_markup: selectLanguageKeyboard,
  });
  const language = await conversation.form.select([EN_LANGUAGE, AM_LANGUAGE]); //TODO add regex to limit worde l
  await ctx.reply("Select account type", {
    reply_markup: selectUserTypeKeyboard,
  });

  const userType = await conversation.form.select([BROKER, HOME_SEEKER]);
  if (userType == BROKER) {
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
    await ctx.reply("successfuly registerd", {
      reply_markup: brokerMainMenuKeyboard,
    });
  } else {
    await ctx.reply("please share your contact", {
      reply_markup: sharePhoneKeyboard,
    });
    const contact = await conversation.waitFor(":contact", {
      otherwise: () => {
        ctx.reply("please share your contact");
      },
    });
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
    await ctx.reply("successfuly registerd", {
      reply_markup: homeSeekerMainMenuKeyboard,
    });
  }
}
