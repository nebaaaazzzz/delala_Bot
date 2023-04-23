import { createConversation } from "@grammyjs/conversations";
import { MY_HOUSES, RENT_HOUSE, SELL_HOUSE } from "../config/constants";
import { Composer } from "grammy";
import { MyContext } from "../types";
import { houseRentPostConversation } from "../conversations/broker/houseRentPostConversation";
import { houseSellPostConversation } from "../conversations/broker/houseSellPostConversation";
import { getMyHouses, paginateHouse } from "../utils/broker/pagination";
import { hears } from "@grammyjs/i18n";

export default function (brokerRouter: Composer<MyContext>) {
  brokerRouter.errorBoundary((err) => {
    console.log("broker sell house error : ", err.message);
  }, createConversation(houseRentPostConversation));
  brokerRouter.errorBoundary(
    (err) => {
      console.log("broker sell house error : ", err.message);
    }, //error handler for conversation
    createConversation(houseSellPostConversation)
  );
  brokerRouter.filter(hears("RENT_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseRentPostConversation");
  });
  brokerRouter.filter(hears("SELL_HOUSE"), async (ctx) => {
    await ctx.conversation.enter("houseSellPostConversation");
  });
  brokerRouter.filter(hears("MY_HOUSES"), getMyHouses);
  brokerRouter.callbackQuery(/^(\/house\/page\/.+)/gi, paginateHouse);
}
