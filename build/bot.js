"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _grammy = require("grammy");
const _conversations = require("@grammyjs/conversations");
const _botConfig = /*#__PURE__*/ _interop_require_default(require("./config/botConfig"));
const _router = /*#__PURE__*/ _interop_require_default(require("./config/router"));
const _adminroutes = /*#__PURE__*/ _interop_require_default(require("./router/admin.routes"));
const _userroutes = /*#__PURE__*/ _interop_require_default(require("./router/user.routes"));
const _loginroutes = /*#__PURE__*/ _interop_require_default(require("./router/login.routes"));
const _constants = require("./config/constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
_botConfig.default.use((0, _conversations.conversations)());
_botConfig.default.use(_router.default);
_botConfig.default.use((ctx, next)=>{
    console.log(ctx.chat.id);
});
(0, _adminroutes.default)(_router.default.route(_constants.ADMIN));
(0, _loginroutes.default)(_router.default.route(_constants.NOT_REGISTERED));
(0, _userroutes.default)(_router.default.route(_constants.REGISTERED));
// async function testConversation(conversation: MyConversation, ctx: MyContext) {
//   console.log("lang : ", await ctx.i18n.getLocale());
// }
// bot.use(createConversation(testConversation));
// bot.command("language", async (ctx) => {
//   await ctx.conversation.enter("testConversation");
// });
// bot.on(":text", async (ctx) => {
//   console.log(ctx.chat.id);
// });
//THIS CODE TO GET CHALLE ID
// bot.on("channel_post", async (ctx) => {
//   console.log(ctx.chat.id);
// });
// bot.command("test", async (ctx) => {
//   // await bot.api.sendMessage(CHANNEL_ID, "TEST123");
//   await ctx.reply(` ${1.1} `, {
//     parse_mode: "HTML",
//   });
// });
_botConfig.default.catch((err)=>{
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof _grammy.GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof _grammy.HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});
// });
_botConfig.default.start({
    onStart: (botInfo)=>{
        console.log("Started on :", botInfo.username);
    }
});
