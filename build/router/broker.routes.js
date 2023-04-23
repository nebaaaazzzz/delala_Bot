"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _conversations = require("@grammyjs/conversations");
const _houseRentPostConversation = require("../conversations/broker/houseRentPostConversation");
const _houseSellPostConversation = require("../conversations/broker/houseSellPostConversation");
const _pagination = require("../utils/broker/pagination");
const _i18n = require("@grammyjs/i18n");
function _default(brokerRouter) {
    brokerRouter.errorBoundary((err)=>{
        console.log("broker sell house error : ", err.message);
    }, (0, _conversations.createConversation)(_houseRentPostConversation.houseRentPostConversation));
    brokerRouter.errorBoundary((err)=>{
        console.log("broker sell house error : ", err.message);
    }, (0, _conversations.createConversation)(_houseSellPostConversation.houseSellPostConversation));
    brokerRouter.filter((0, _i18n.hears)("RENT_HOUSE"), async (ctx)=>{
        await ctx.conversation.enter("houseRentPostConversation");
    });
    brokerRouter.filter((0, _i18n.hears)("SELL_HOUSE"), async (ctx)=>{
        await ctx.conversation.enter("houseSellPostConversation");
    });
    brokerRouter.filter((0, _i18n.hears)("MY_HOUSES"), _pagination.getMyHouses);
    brokerRouter.callbackQuery(/^(\/house\/page\/.+)/gi, _pagination.paginateHouse);
}
