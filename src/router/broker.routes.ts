import { createConversation } from "@grammyjs/conversations";
import { MY_HOUSES, RENT_HOUSE, SELL_HOUSE } from "../config/constants";
import { Composer } from "grammy";
import { MyContext } from "../types";
import { houseRentPostConversation } from "../conversations/broker/houseRentPostConversation";
import { houseSellPostConversation } from "../conversations/broker/houseSellPostConversation";
import { getMyHouses, paginateHouse } from "../utils/broker/pagination";

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
  brokerRouter.hears(MY_HOUSES, getMyHouses);
  brokerRouter.callbackQuery(/^(\/house\/page\/.+)/gi, paginateHouse);
}
