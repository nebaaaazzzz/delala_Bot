dotenv.config();
import { session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import dotenv from "dotenv";
import { MyContext } from "./types";
import greetingConversation from "./conversations/greeting.conversation";
import {
  CHANNEL_ID,
  NOT_REGISTERD,
  RENT_HOUSE,
  SELL_HOUSE,
  SETTING,
} from "./config/constants";
import { sellHouseConversation } from "./conversations/broker/sell-house.conversation";
import { rentHouseConversation } from "./conversations/broker/rent-house.conversation";
import { Router } from "@grammyjs/router";
import { PrismaAdapter } from "@grammyjs/storage-prisma";
import { Session, User } from "./config/prisma";
import { UserType } from "@prisma/client";
import bot from "./config/botConfig";
import { approveHouse, rejectHouse } from "./handler/admin/house-approval";
bot.use(
  session({
    initial: () => ({}),
    getSessionKey: (ctx) => String(ctx.from?.id),
    storage: new PrismaAdapter(Session),
  })
);
bot.use(conversations());
const router = new Router<MyContext>(async (ctx) => {
  if (ctx.from?.id) {
    const result = await User.findFirst({
      where: {
        telegramId: String(ctx.from?.id),
      },
    });
    if (result) {
      if (result.userType === UserType.BROKER) {
        return UserType.BROKER;
      } else {
        return UserType.HOME_SEEKER;
      }
    } else {
      return NOT_REGISTERD;
    }
  } else {
    return NOT_REGISTERD;
  }
});

bot.use(router);
const loginRouter = router.route(NOT_REGISTERD);
const brokerRouter = router.route(UserType.BROKER);
const userRouter = router.route(UserType.HOME_SEEKER);
loginRouter.use(createConversation(greetingConversation));
brokerRouter.use(createConversation(sellHouseConversation));
brokerRouter.use(createConversation(rentHouseConversation));
//THIS CODE TO DET CHALLE ID
// bot.on("channel_post", async (ctx) => {
//   console.log(ctx.chat.id);
// });
bot.command("test", async (ctx) => {
  // await bot.api.sendMessage(CHANNEL_ID, "TEST123");
  await ctx.reply(` ${1.1} `, {
    parse_mode: "HTML",
  });
});
loginRouter.command("start", async (ctx) => {
  // enter the function "greeting" you declared
  await ctx.conversation.enter("greetingConversation");
});
brokerRouter.hears(RENT_HOUSE, async (ctx) => {
  await ctx.conversation.enter("rentHouseConversation");
});
brokerRouter.hears(SELL_HOUSE, async (ctx) => {
  await ctx.conversation.enter("sellHouseConversation");
});
bot.hears(SETTING, async (ctx) => {
  return ctx.reply("renting house");
});
bot.callbackQuery(/^(\/house\/approve\/.+)/gi, approveHouse);

bot.callbackQuery(/^(\/house\/reject\/.+)/gi, rejectHouse);
bot.start({
  onStart(botInfo) {
    console.log("Started on :", botInfo.username);
  },
});
