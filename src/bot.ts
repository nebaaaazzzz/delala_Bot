import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import dotenv from "dotenv";
import { MyContext, MyConversation } from "./types";
import greetingConversation from "./conversations/greeting.conversation";
dotenv.config();
const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(greetingConversation));

bot.command("start", async (ctx) => {
  // enter the function "greeting" you declared
  await ctx.conversation.enter("greetingConversation");
});
bot.start({
  onStart(botInfo) {
    console.log("Started on :", botInfo.username);
  },
});
