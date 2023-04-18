"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _grammy = require("grammy");
const _conversations = require("@grammyjs/conversations");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _greetingconversation = /*#__PURE__*/ _interop_require_default(require("./conversations/greeting.conversation"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
const bot = new _grammy.Bot(process.env.TELEGRAM_TOKEN);
bot.use((0, _grammy.session)({
    initial: ()=>({})
}));
bot.use((0, _conversations.conversations)());
bot.use((0, _conversations.createConversation)(_greetingconversation.default));
bot.command("start", async (ctx)=>{
    // enter the function "greeting" you declared
    await ctx.conversation.enter("greetingConversation");
});
bot.start({
    onStart (botInfo) {
        console.log("Started on :", botInfo.username);
    }
});
