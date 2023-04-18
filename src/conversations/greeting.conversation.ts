import { selectLanguageInlineKeyboard } from "../components/inline-keyboard";
import { selectUserTypeKeyboard } from "../components/keyboards";
import { BROKER, EN_LANGUAGE, HOME_SEEKER } from "../config/constants";
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
  if (callbackQuery.data === EN_LANGUAGE) {
    await ctx.reply("You selected English", {
      reply_markup: selectUserTypeKeyboard,
    });
  } else {
    await ctx.reply("You selected Amharic", {
      reply_markup: selectUserTypeKeyboard,
    });
  }
  const d = await conversation.form.select([BROKER, HOME_SEEKER], async (ctx) =>
    ctx.reply("Select One of", {
      reply_markup: selectUserTypeKeyboard,
    })
  );
  if (d == BROKER) {
    await brokerRegistration(conversation, ctx);
  } else {
  }
  console.log(d);
}
