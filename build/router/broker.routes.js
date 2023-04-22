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
const _constants = require("../config/constants");
const _houseRentPostConversation = require("../conversations/broker/houseRentPostConversation");
const _houseSellPostConversation = require("../conversations/broker/houseSellPostConversation");
function _default(brokerRouter) {
    brokerRouter.errorBoundary(()=>{}, (0, _conversations.createConversation)(_houseRentPostConversation.houseRentPostConversation));
    brokerRouter.errorBoundary(()=>{}, (0, _conversations.createConversation)(_houseSellPostConversation.houseSellPostConversation));
    brokerRouter.hears(_constants.RENT_HOUSE, async (ctx)=>{
        await ctx.conversation.enter("houseRentPostConversation");
    });
    brokerRouter.hears(_constants.SELL_HOUSE, async (ctx)=>{
        await ctx.conversation.enter("houseSellPostConversation");
    });
}
