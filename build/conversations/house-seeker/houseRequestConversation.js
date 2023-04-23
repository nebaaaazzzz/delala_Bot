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
const _client = require("@prisma/client");
const _inlinekeyboard = require("../../components/inline-keyboard");
const _keyboards = require("../../components/keyboards");
const _constants = require("../../config/constants");
const _prisma = require("../../config/prisma");
const _botConfig = /*#__PURE__*/ _interop_require_default(require("../../config/botConfig"));
const _housepost = require("../../utils/housepost");
const _houseRequest = require("../../utils/houseRequest");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function handleCancelFromCtx(ctx) {
    if (ctx.message?.text == ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
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
    //****enter woreda/specific
    await ctx.reply(ctx.t("wrda-spcic-loc"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const woredaOrSpecificPlace = await conversation.form.text();
    if (woredaOrSpecificPlace === ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
        });
        return;
    }
    //****end enter woreda/specific
    //*** property type
    await ctx.reply(ctx.t("pprty-type"), {
        reply_markup: (0, _keyboards.getSelectPropertyTypeKeyboardWithCancel)(ctx)
    });
    const propertyType = await conversation.form.select(JSON.parse(ctx.t("PROPERTY_TYPES")), async (ctx)=>await handleCancelFromCtx(ctx));
    //*** end property type
    await ctx.reply(ctx.t("area-z-house"), {
        reply_markup: {
            remove_keyboard: true
        }
    });
    const area = await conversation.form.text();
    if (area === ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
        });
        return;
    }
    await ctx.reply(ctx.t("nmbr-bedrooms"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const numberOfBedrooms = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    await ctx.reply(ctx.t("nmbr-bathrooms"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const numberOfBathrooms = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    await ctx.reply(ctx.t("price-z-house"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const priceOfTheHouse = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    await ctx.reply((0, _housepost.housePostBuilder)(ctx, {
        area,
        numberOfBathrooms,
        numberOfBedrooms,
        priceOfTheHouse,
        subCity,
        woredaOrSpecificPlace,
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
        await _prisma.HouseRequest.create({
            data: {
                numberOfBathrooms,
                numberOfBedrooms,
                subCity,
                userTelegramID: String(ctx.from?.id),
                woredaOrSpecificPlace,
                area,
                propertyType,
                price: priceOfTheHouse,
                houseRequestType: houseRequestType == ctx.t("BUY_HOUSE") ? _client.HouseRequestType.BUY : _client.HouseRequestType.RENT
            }
        });
        const user = await _prisma.User.findUnique({
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        await ctx.reply(ctx.t("success-submit-request"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
        });
        await _botConfig.default.api.sendMessage(_constants.ADMIN_TELEGRAM_ID, (0, _houseRequest.houseRequestBuilder)({
            area,
            houseRequestType,
            numberOfBathrooms,
            numberOfBedrooms,
            phoneNumber: String(user?.phoneNumber),
            priceOfTheHouse,
            subCity,
            woredaOrSpecificPlace
        }), {
            parse_mode: "HTML"
        });
        return;
    } else if (cbData.callbackQuery.data == _constants.CANCEL) {
        await ctx.reply(ctx.t("submission-cancle"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
        });
    }
}
