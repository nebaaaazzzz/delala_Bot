"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _grammy = require("grammy");
const _conversations = require("@grammyjs/conversations");
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _greetingconversation = /*#__PURE__*/ _interop_require_default(require("./conversations/greeting.conversation"));
const _constants = require("./config/constants");
const _sellhouseconversation = require("./conversations/broker/sell-house.conversation");
const _renthouseconversation = require("./conversations/broker/rent-house.conversation");
const _router = require("@grammyjs/router");
const _storageprisma = require("@grammyjs/storage-prisma");
const _prisma = require("./config/prisma");
const _client = require("@prisma/client");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config();
const bot = new _grammy.Bot(process.env.TELEGRAM_TOKEN);
bot.use((0, _grammy.session)({
    initial: ()=>({}),
    getSessionKey: (ctx)=>String(ctx.from?.id),
    storage: new _storageprisma.PrismaAdapter(_prisma.Session)
}));
bot.use((0, _conversations.conversations)());
const router = new _router.Router(async (ctx)=>{
    if (ctx.from?.id) {
        const result = await _prisma.User.findFirst({
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        console.log(result);
        if (result) {
            if (result.userType === _client.UserType.BROKER) {
                return _client.UserType.BROKER;
            } else {
                return _client.UserType.HOME_SEEKER;
            }
        } else {
            return _constants.NOT_REGISTERD;
        }
    } else {
        return _constants.NOT_REGISTERD;
    }
});
bot.use(router);
const loginRouter = router.route(_constants.NOT_REGISTERD);
const brokerRouter = router.route(_client.UserType.BROKER);
const userRouter = router.route(_client.UserType.HOME_SEEKER);
loginRouter.use((0, _conversations.createConversation)(_greetingconversation.default));
brokerRouter.use((0, _conversations.createConversation)(_sellhouseconversation.sellHouseConversation));
brokerRouter.use((0, _conversations.createConversation)(_renthouseconversation.rentHouseConversation));
loginRouter.command("start", async (ctx)=>{
    // enter the function "greeting" you declared
    await ctx.conversation.enter("greetingConversation");
});
brokerRouter.hears(_constants.RENT_HOUSE, async (ctx)=>{
    await ctx.conversation.enter("rentHouseConversation");
});
brokerRouter.hears(_constants.SELL_HOUSE, async (ctx)=>{
    await ctx.conversation.enter("sellHouseConversation");
});
bot.hears(_constants.SETTING, async (ctx)=>{
    return ctx.reply("renting house");
});
bot.start({
    onStart (botInfo) {
        console.log("Started on :", botInfo.username);
    }
});
