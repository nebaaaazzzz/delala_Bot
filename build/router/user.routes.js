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
const _houseRentPostConversation = require("../conversations/user/houseRentPostConversation");
const _houseSellPostConversation = require("../conversations/user/houseSellPostConversation");
const _pagination = require("../utils/broker/pagination");
const _i18n = require("@grammyjs/i18n");
const _keyboards = require("../components/keyboards");
const _client = require("@prisma/client");
const _prisma = require("../config/prisma");
const _houseRequestConversation = require("../conversations/house-seeker/houseRequestConversation");
function _default(userRouter) {
    /**==============CONVERSATION REGISTRATION START================ */ //TODO : fix conversation might stuck in error
    userRouter.errorBoundary((err)=>{
        console.log("house rent post conversaion : ", err.message);
    }, (0, _conversations.createConversation)(_houseRentPostConversation.houseRentPostConversation));
    userRouter.errorBoundary((err)=>{
        console.log("house rent sell conversaion : ", err.message);
    }, (0, _conversations.createConversation)(_houseSellPostConversation.houseSellPostConversation));
    userRouter.errorBoundary((e)=>{
        console.log(e.message);
    }, (0, _conversations.createConversation)(_houseRequestConversation.houseRequestConversation));
    userRouter.callbackQuery(_constants.CANCEL, async (ctx)=>{
        console.log("callback query cancel");
        await ctx.conversation.reenter("houseRequestConversation");
    });
    /**==============CONVERSATION REGISTRATION END================ */ userRouter.filter((0, _i18n.hears)("RENT_HOUSE"), async (ctx)=>{
        await ctx.conversation.enter("houseRentPostConversation");
    });
    userRouter.filter((0, _i18n.hears)("SELL_HOUSE"), async (ctx)=>{
        await ctx.conversation.enter("houseSellPostConversation");
    });
    userRouter.filter((0, _i18n.hears)("MY_HOUSES"), _pagination.getMyHouses);
    userRouter.callbackQuery(/^(\/house\/page\/.+)/gi, _pagination.paginateHouse);
    userRouter.filter((0, _i18n.hears)("BROKER"), async (ctx)=>{
        ctx.reply(ctx.t("BROKER"), {
            reply_markup: (0, _keyboards.getBrokerMainMenuKeyboard)(ctx)
        });
    });
    userRouter.filter((0, _i18n.hears)("HOME_SEEKER"), async (ctx)=>{
        ctx.reply(ctx.t("HOME_SEEKER"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
        });
    });
    userRouter.filter((0, _i18n.hears)("back"), async (ctx)=>{
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
        });
    });
    userRouter.filter((0, _i18n.hears)("CHANNEL"), async (ctx)=>{
        ctx.reply(ctx.t("CHANNEL_TEXT"), {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: ctx.t("CHANNEL"),
                            url: "https://t.me/+LglF5WEWWERlZWM8"
                        }
                    ]
                ]
            }
        });
    });
    userRouter.filter((0, _i18n.hears)("REQUEST_HOUSE"), async (ctx)=>{
        await ctx.conversation.enter("houseRequestConversation");
    });
    userRouter.filter((0, _i18n.hears)("SETTING"), async (ctx)=>{
        console.log("Ssss  : ", await ctx.conversation);
        await ctx.reply(ctx.t("SETTING"), {
            reply_markup: (0, _keyboards.getSettingsKeyboard)(ctx)
        });
    });
    userRouter.filter((0, _i18n.hears)("cng_lang"), async (ctx)=>{
        await ctx.reply(ctx.t("SETTING"), {
            reply_markup: _keyboards.selectLanguageKeyboard
        });
    });
    userRouter.filter((0, _i18n.hears)("ABOUT_US"), async (ctx)=>{
        await ctx.reply(ctx.t("ABOUT_US_TEXT"));
    });
    userRouter.hears([
        _constants.EN_LANGUAGE,
        _constants.AM_LANGUAGE
    ], async (ctx)=>{
        const language = ctx.message?.text;
        await ctx.i18n.setLocale(language == _constants.AM_LANGUAGE ? "am" : "en");
        await _prisma.User.update({
            data: {
                language: _constants.AM_LANGUAGE == language ? _client.Language.AM : _client.Language.EN
            },
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        await ctx.reply(ctx.t("success-lang-chng"), {
            reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
        });
    });
}
