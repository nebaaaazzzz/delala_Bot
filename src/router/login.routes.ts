import { createConversation } from "@grammyjs/conversations";
import { NOT_REGISTERD } from "../config/constants";
import router from "../config/router";
import greetingConversation from "../conversations/greeting.conversation";
import { Composer } from "grammy";
import { MyContext } from "../types";
export default function (loginRouter: Composer<MyContext>) {
  loginRouter.use(createConversation(greetingConversation));

  loginRouter.command("start", async (ctx) => {
    // enter the function "greeting" you declared
    await ctx.conversation.enter("greetingConversation");
  });
}
