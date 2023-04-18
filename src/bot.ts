import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import dotenv from "dotenv";
import { MyContext } from "./types";
import greetingConversation from "./conversations/greeting.conversation";
import { RENT_HOUSE, SELL_HOUSE, SETTING } from "./config/constants";
import { sellHouseConversation } from "./conversations/broker/sell-house.conversation";
import { rentHouseConversation } from "./conversations/broker/rent-house.conversation";
import { Router } from "@grammyjs/router";
import { PrismaAdapter } from "@grammyjs/storage-prisma";
import { Session, User } from "./config/prisma";
dotenv.config();
const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);
const router = new Router<MyContext>(async (ctx) => {
  if (ctx.from?.id) {
    const result = await User.findFirst({
      where: {
        telegramId: String(ctx.from?.id),
      },
    });
    if (result) {
      if (result.userType === "BROKER") {
        return "BROKER";
      } else {
        return "USER";
      }
    } else {
      return "NOT_REGISTED";
    }
  }
});
bot.use(session({ initial: () => ({}), storage: new PrismaAdapter(Session) }));
bot.use(conversations());
bot.use(createConversation(greetingConversation));
bot.use(createConversation(sellHouseConversation));
bot.use(createConversation(rentHouseConversation));

bot.command("start", async (ctx) => {
  // enter the function "greeting" you declared
  await ctx.conversation.enter("greetingConversation");
});
bot.hears(RENT_HOUSE, async (ctx) => {
  await ctx.conversation.enter("rentHouseConversation");
});
bot.hears(SELL_HOUSE, async (ctx) => {
  await ctx.conversation.enter("sellHouseConversation");
});
bot.hears(SETTING, async (ctx) => {
  return ctx.reply("renting house");
});
bot.start({
  onStart(botInfo) {
    console.log("Started on :", botInfo.username);
  },
});
