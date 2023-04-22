dotenv.config();
import { lazySession, session } from "grammy";
import { conversations } from "@grammyjs/conversations";
import dotenv from "dotenv";
import { PrismaAdapter } from "@grammyjs/storage-prisma";
import { Session } from "./config/prisma";
import bot from "./config/botConfig";
import router from "./config/router";
import { UserType } from "@prisma/client";
import adminRoutes from "./router/admin.routes";
import brokerRoutes from "./router/broker.routes";
import home_seekerRoutes from "./router/home_seeker.routes";
import loginRoutes from "./router/login.routes";
import { NOT_REGISTERD } from "./config/constants";
bot.use(
  lazySession({
    initial: () => ({ pageNumber: 1 }),
    getSessionKey: (ctx) => String(ctx.from?.id),
    storage: new PrismaAdapter(Session),
  })
);
bot.use(conversations());
bot.use(router);
adminRoutes(router.route(UserType.ADMIN));
loginRoutes(router.route(NOT_REGISTERD));
brokerRoutes(router.route(UserType.BROKER));
home_seekerRoutes(router.route(UserType.HOME_SEEKER));
bot.start({
  onStart(botInfo) {
    console.log("Started on :", botInfo.username);
  },
});

//THIS CODE TO GET CHALLE ID
// bot.on("channel_post", async (ctx) => {
//   console.log(ctx.chat.id);
// });
// bot.command("test", async (ctx) => {
//   // await bot.api.sendMessage(CHANNEL_ID, "TEST123");
//   await ctx.reply(` ${1.1} `, {
//     parse_mode: "HTML",
//   });
// });
