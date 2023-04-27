import dotenv from "dotenv";
dotenv.config();
import { GrammyError, HttpError, lazySession } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import bot from "./config/botConfig";
import router from "./config/router";
import { UserType } from "@prisma/client";
import adminRoutes from "./router/admin.routes";
import brokerRoutes from "./router/broker.routes";
import home_seekerRoutes from "./router/home_seeker.routes";
import loginRoutes from "./router/login.routes";
import { NOT_REGISTERD } from "./config/constants";
import { MyContext, MyConversation } from "./types";
import { Menu, MenuRange } from "@grammyjs/menu";

bot.use(conversations());
bot.use(router);
adminRoutes(router.route(UserType.ADMIN));
loginRoutes(router.route(NOT_REGISTERD));
brokerRoutes(router.route(UserType.BROKER));
home_seekerRoutes(router.route(UserType.HOME_SEEKER));
// async function testConversation(conversation: MyConversation, ctx: MyContext) {
//   console.log("lang : ", await ctx.i18n.getLocale());
// }
// bot.use(createConversation(testConversation));
// bot.command("language", async (ctx) => {
//   await ctx.conversation.enter("testConversation");
// });

bot.start({
  onStart(botInfo) {
    console.log("Started on :", botInfo.username);
  },
});
const menu = new Menu("dynamic");
menu
  .url("About", "https://grammy.dev/plugins/menu")
  .row()
  .dynamic(() => {
    // Generate a part of the menu dynamically!
    const range = new MenuRange();
    for (let i = 0; i < 3; i++) {
      range.text(i.toString(), (ctx) => ctx.reply(`You chose ${i}`)).row();
    }
    return range;
  })
  .text("Cancel", (ctx) => ctx.deleteMessage());
bot.use(menu);
bot.command("test", async (ctx) => {
  await ctx.reply("Check out this menu:", { reply_markup: menu });
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
