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
const _constants = require("../config/constants");
const _conversations = require("@grammyjs/conversations");
const _houseRequestConversation = require("../conversations/house-seeker/houseRequestConversation");
const _settingconversation = require("../conversations/house-seeker/setting.conversation");
function _default(userRouter) {
    userRouter.errorBoundary((e)=>{}, (0, _conversations.createConversation)(_houseRequestConversation.houseRequestConversation));
    userRouter.errorBoundary((e)=>{}, (0, _conversations.createConversation)(_settingconversation.settingConversation));
    userRouter.hears(_constants.REQUEST_HOUSE, async (ctx)=>{
        await ctx.conversation.enter("houseRequestConversation");
    });
    userRouter.hears(_constants.SETTING, async (ctx)=>{
        await ctx.conversation.enter("settingConversation");
    });
}
