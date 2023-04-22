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
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _default(loginRouter) {
    loginRouter.use((0, _conversations.createConversation)(_greetingconversation.default));
    loginRouter.command("start", async (ctx)=>{
        // enter the function "greeting" you declared
        await ctx.conversation.enter("greetingConversation");
    });
}
