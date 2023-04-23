import { Composer } from "grammy";
import { MyContext } from "../types";
import { createConversation } from "@grammyjs/conversations";
import { houseRequestConversation } from "../conversations/house-seeker/houseRequestConversation";
import { settingConversation } from "../conversations/house-seeker/setting.conversation";
import { hears } from "@grammyjs/i18n";

export default function (userRouter: Composer<MyContext>) {
  userRouter.errorBoundary((e) => {},
  createConversation(houseRequestConversation));
  userRouter.errorBoundary((e) => {}, createConversation(settingConversation));
  userRouter.filter(hears("REQUEST_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseRequestConversation");
  });
  userRouter.filter(hears("SETTING"), async (ctx) => {
    await ctx.conversation.enter("settingConversation");
  });
}
