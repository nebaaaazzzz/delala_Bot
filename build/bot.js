"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _grammy = require("grammy");
const _conversations = require("@grammyjs/conversations");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _storageprisma = require("@grammyjs/storage-prisma");
const _prisma = require("./config/prisma");
const _botConfig = /*#__PURE__*/ _interop_require_default(require("./config/botConfig"));
const _router = /*#__PURE__*/ _interop_require_default(require("./config/router"));
const _client = require("@prisma/client");
const _adminroutes = /*#__PURE__*/ _interop_require_default(require("./router/admin.routes"));
const _brokerroutes = /*#__PURE__*/ _interop_require_default(require("./router/broker.routes"));
const _home_seekerroutes = /*#__PURE__*/ _interop_require_default(require("./router/home_seeker.routes"));
const _loginroutes = /*#__PURE__*/ _interop_require_default(require("./router/login.routes"));
const _constants = require("./config/constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
_botConfig.default.use((0, _grammy.lazySession)({
    initial: ()=>({
            pageNumber: 1
        }),
    getSessionKey: (ctx)=>String(ctx.from?.id),
    storage: new _storageprisma.PrismaAdapter(_prisma.Session)
}));
_botConfig.default.use((0, _conversations.conversations)());
_botConfig.default.use(_router.default);
(0, _adminroutes.default)(_router.default.route(_client.UserType.ADMIN));
(0, _loginroutes.default)(_router.default.route(_constants.NOT_REGISTERD));
(0, _brokerroutes.default)(_router.default.route(_client.UserType.BROKER));
(0, _home_seekerroutes.default)(_router.default.route(_client.UserType.HOME_SEEKER));
_botConfig.default.start({
    onStart (botInfo) {
        console.log("Started on :", botInfo.username);
    }
}); //THIS CODE TO GET CHALLE ID
 // bot.on("channel_post", async (ctx) => {
 //   console.log(ctx.chat.id);
 // });
 // bot.command("test", async (ctx) => {
 //   // await bot.api.sendMessage(CHANNEL_ID, "TEST123");
 //   await ctx.reply(` ${1.1} `, {
 //     parse_mode: "HTML",
 //   });
 // });
