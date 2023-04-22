import { createConversation } from "@grammyjs/conversations";
import { RENT_HOUSE, SELL_HOUSE } from "../config/constants";
import { Composer } from "grammy";
import { MyContext } from "../types";
import { housePostBuilder } from "../utils/housepost";
import { HousePostType } from "@prisma/client";
import { houseRentPostConversation } from "../conversations/broker/houseRentPostConversation";
import { houseSellPostConversation } from "../conversations/broker/houseSellPostConversation";

export default function (brokerRouter: Composer<MyContext>) {
  brokerRouter.errorBoundary(() => {},
  createConversation(houseRentPostConversation));
  brokerRouter.errorBoundary(
    () => {}, //error handler for conversation
    createConversation(houseSellPostConversation)
  );
  brokerRouter.hears(RENT_HOUSE, async (ctx) => {
    await ctx.conversation.enter("houseRentPostConversation");
  });
  brokerRouter.hears(SELL_HOUSE, async (ctx) => {
    await ctx.conversation.enter("houseSellPostConversation");
  });
}
