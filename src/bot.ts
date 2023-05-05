import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { GrammyError, HttpError } from "grammy";
import { conversations } from "@grammyjs/conversations";
import bot from "./config/botConfig";
import router from "./config/router";
import adminRoutes from "./router/admin.routes";
import userRoutes from "./router/user.routes";
import loginRoutes from "./router/login.routes";
import { ADMIN, NOT_REGISTERED, REGISTERED } from "./config/constants";
import sequelize from "./config/db";

async function bootstrap() {
  try {
    await sequelize.authenticate();
    console.log("connected successfuly");
  } catch (err: any) {
    console.log("db connection failed : ", err.message);
    process.exit(1);
  }
  bot.use(conversations());
  bot.use(router);
  // bot.use((ctx, next) => {
  //   console.log(ctx.chat.id);
  // });
  adminRoutes(router.route(ADMIN));
  loginRoutes(router.route(NOT_REGISTERED));
  userRoutes(router.route(REGISTERED));
  // async function testConversation(conversation: MyConversation, ctx: MyContext) {
  //   console.log("lang : ", await ctx.i18n.getLocale());
  // }
  // bot.use(createConversation(testConversation));
  // bot.command("language", async (ctx) => {
  //   await ctx.conversation.enter("testConversation");
  // });
  // bot.on(":text", async (ctx) => {
  //   console.log(ctx.chat.id);
  // });
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
  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });
  // });
  bot.start({
    onStart: (botInfo) => {
      console.log("Started on :", botInfo.username);
    },
  });
}
bootstrap();
