import { createConversation } from "@grammyjs/conversations";
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
