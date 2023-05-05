"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "houseRequestConversation", {
    enumerable: true,
    get: function() {
        return houseRequestConversation;
    }
});
const _inlinekeyboard = require("../../components/inline-keyboard");
const _keyboards = require("../../components/keyboards");
const _constants = require("../../config/constants");
const _botConfig = /*#__PURE__*/ _interop_require_default(require("../../config/botConfig"));
const _houseRequest = require("../../utils/houseRequest");
const _HouseRequest = require("../../entity/HouseRequest");
const _User = require("../../entity/User");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function handleCancelFromCtx(ctx) {
    if (ctx.message?.text == ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
        });
        return await ctx.conversation.exit();
    }
}
async function houseRequestConversation(conversation, ctx) {
    // **** choose rent or buy
    await ctx.reply(ctx.t("rent-buy"), {
        reply_markup: (0, _keyboards.getSelectRequestTypeKeyboardWithCancel)(ctx)
    });
    const houseRequestType = await conversation.form.select([
        ctx.t("BUY_HOUSE"),
        ctx.t("RENT_HOUSE")
    ], async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    //**** end choose rent or buy
    // **** choose subcity
    await ctx.reply(ctx.t("Slct-sub-city-zhouse"), {
        reply_markup: (0, _keyboards.getSelectSubCityKeyboardWithCancel)(ctx)
    });
    const subCity = await conversation.form.select(JSON.parse(ctx.t("SUBCITIES")), async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    // **** end choose subcity
    //*** property type
    await ctx.reply(ctx.t("pprty-type"), {
        reply_markup: (0, _keyboards.getSelectPropertyTypeKeyboardWithCancel)(ctx)
    });
    const propertyType = await conversation.form.select(JSON.parse(ctx.t("PROPERTY_TYPES")), async (ctx)=>await handleCancelFromCtx(ctx));
    await ctx.reply(ctx.t("nmbr-bedrooms"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const numberOfBedrooms = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    await ctx.reply((0, _houseRequest.houseRequestPostBuilder)(ctx, {
        numberOfBedrooms,
        subCity,
        housePostType: houseRequestType,
        propertyType
    }), {
        parse_mode: "HTML",
        reply_markup: {
            inline_keyboard: (0, _inlinekeyboard.getConfirmHousePostInlineKeyboard)(ctx)
        }
    });
    const cbData = await conversation.waitFor("callback_query:data");
    if (cbData.callbackQuery.data == _constants.SUBMIT) {
        await _HouseRequest.HouseRequest.insert({
            numberOfBedrooms,
            subCity,
            user: await _User.User.findOne({
                where: {
                    telegramId: String(ctx.from?.id)
                }
            }),
            // userTelegramID: String(ctx.from?.id),
            propertyType,
            houseRequestType: houseRequestType == ctx.t("BUY_HOUSE") ? "BUY" : "RENT,"
        });
        const user = await _User.User.findOne({
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        await ctx.reply(ctx.t("success-submit-request"), {
            reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
        });
        await _botConfig.default.api.sendMessage(_constants.ADMIN_TELEGRAM_ID, (0, _houseRequest.houseRequestBuilder)({
            houseRequestType,
            numberOfBedrooms,
            phoneNumber: String(user?.phoneNumber),
            subCity
        }), {
            parse_mode: "HTML"
        });
        return;
    } else if (cbData.callbackQuery.data == _constants.CANCEL) {
        await houseRequestConversation(conversation, ctx);
    }
}
