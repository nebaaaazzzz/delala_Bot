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
const _greetingconversation = /*#__PURE__*/ _interop_require_default(require("../conversations/greeting.conversation"));
const _keyboards = require("../components/keyboards");
const _constants = require("../config/constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _default(loginRouter) {
    loginRouter.use((0, _conversations.createConversation)(_greetingconversation.default));
    loginRouter.command("start", async (ctx)=>{
        await ctx.reply(`Welcome! /  እንኳን ደና መጡ  ${ctx?.from?.first_name}`);
        await ctx.reply("Select language / ቋንቋ ይምረጡ ", {
            reply_markup: _keyboards.selectLanguageKeyboard
        });
    });
    loginRouter.hears([
        _constants.AM_LANGUAGE,
        _constants.EN_LANGUAGE
    ], async (ctx)=>{
        const language = ctx.message?.text;
        await ctx.i18n.setLocale(language == _constants.AM_LANGUAGE ? "am" : "en");
        await ctx.conversation.enter("greetingConversation");
    });
}
