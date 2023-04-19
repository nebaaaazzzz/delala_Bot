import { Language, UserType } from "@prisma/client";
import { selectLanguageInlineKeyboard } from "../components/inline-keyboard";
import {
  brokerMainMenuKeyboard,
  selectUserTypeKeyboard,
} from "../components/keyboards";
import { BROKER, EN_LANGUAGE, HOME_SEEKER } from "../config/constants";
import { User } from "../config/prisma";
import { MyContext, MyConversation } from "../types";
import brokerRegistration from "./broker-registration.conversation";
export default async function greetingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(`Welcome! ${ctx?.from?.first_name}`);
  let message = await ctx.reply("Select language", {
    reply_markup: selectLanguageInlineKeyboard,
  });
  const { callbackQuery } = await conversation.waitFor("callback_query:data", {
    otherwise: () => {
      ctx.reply("please select language");
    },
  }); //TODO add regex to limit worde l
  const language = callbackQuery.data;
  if (language === EN_LANGUAGE) {
    await ctx.reply("You selected English", {
      reply_markup: selectUserTypeKeyboard,
    });
  } else {
    await ctx.reply("You selected Amharic", {
      reply_markup: selectUserTypeKeyboard,
    });
  }
  const userType = await conversation.form.select(
    [BROKER, HOME_SEEKER],
    async (ctx) =>
      ctx.reply("Select One of", {
        reply_markup: selectUserTypeKeyboard,
      })
  );
  if (userType == BROKER) {
    const { contact, fullName, subCity } = await brokerRegistration(
      conversation,
      ctx
    );
    await User.create({
      data: {
        telegramId: String(ctx.from?.id),
        userType: UserType.BROKER,
        firstName: ctx.from?.first_name,
        lastName: ctx.from?.last_name,
        phoneNumber: contact.message?.contact?.phone_number,
        language: language as Language,
        userName: ctx.from?.username,
      },
    });
    await ctx.reply("successfuly registerd", {
      reply_markup: brokerMainMenuKeyboard,
    });
  } else {
  }
}
