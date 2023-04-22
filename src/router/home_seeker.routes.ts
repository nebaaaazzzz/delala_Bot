import { Composer } from "grammy";
import { MyContext } from "../types";
import { REQUEST_HOUSE, SETTING } from "../config/constants";
import { createConversation } from "@grammyjs/conversations";
import { houseRequestConversation } from "../conversations/house-seeker/houseRequestConversation";
import { settingConversation } from "../conversations/house-seeker/setting.conversation";

export default function (userRouter: Composer<MyContext>) {
  userRouter.errorBoundary((e) => {},
  createConversation(houseRequestConversation));
  userRouter.errorBoundary((e) => {}, createConversation(settingConversation));
  userRouter.hears(REQUEST_HOUSE, async (ctx) => {
    await ctx.conversation.enter("houseRequestConversation");
  });
  userRouter.hears(SETTING, async (ctx) => {
    await ctx.conversation.enter("settingConversation");
  });
}
