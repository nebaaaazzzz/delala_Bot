import { MyContext, MyConversation } from "../types";

export default async function greetingConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(`Welcome! ${ctx?.from?.first_name}`);
  let message = await ctx.reply("Select language", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "English",
            callback_data: "en",
          },
          {
            text: "Amharic",
            callback_data: "am",
          },
        ],
      ],
    },
  });
  const { callbackQuery } = await conversation.waitFor("callback_query:data"); //TODO add regex to limit worde l
  if (callbackQuery.data === "en") {
    await ctx.reply("You selected English");
  } else {
    await ctx.reply("You selected Amharic");
  }
}
