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
    if (ctx.message?.text == _constants.CANCEL) {
        await ctx.reply("Main menu", {
            reply_markup: _keyboards.homeSeekerMainMenuKeyboard
        });
        return await ctx.conversation.exit();
    }
}
async function houseRequestConversation(conversation, ctx) {
    // **** choose rent or buy
    await ctx.reply("rent or buy", {
        reply_markup: _keyboards.selectRequestTypeKeyboardWithCancel
    });
    const houseRequestType = await conversation.form.select([
        _constants.BUY_HOUSE,
        _constants.RENT_HOUSE
    ], async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    //**** end choose rent or buy
    // **** choose subcity
    await ctx.reply("Select subcity of the house", {
        reply_markup: _keyboards.selectSubCityKeyboardWithCancle
    });
    const subCity = await conversation.form.select(_constants.SUBCITIES, async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    // **** end choose subcity
    //****enter woreda/specific
    await ctx.reply("woreda / specific", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const woredaOrSpecificPlace = await conversation.form.text();
    if (woredaOrSpecificPlace === _constants.CANCEL) {
        await ctx.reply("Main menu", {
            reply_markup: _keyboards.homeSeekerMainMenuKeyboard
        });
        return;
    }
    //****end enter woreda/specific
    //*** property type
    await ctx.reply("property type", {
        reply_markup: _keyboards.selectPropertyKeyboardWithCancle
    });
    const propertyType = await conversation.form.select(_constants.PROPERTY_TYPES, async (ctx)=>await handleCancelFromCtx(ctx));
    //*** end property type
    await ctx.reply("Area ", {
        reply_markup: {
            remove_keyboard: true
        }
    });
    const area = await conversation.form.text(async (ctx)=>{
        await handleCancelFromCtx(ctx);
        await ctx.reply("Please enter area ", {
            reply_markup: {
                remove_keyboard: true
            }
        });
    });
    await ctx.reply("Number of bedrooms in number", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const numberOfBedrooms = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    await ctx.reply("number of bathrooms in number", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const numberOfBathrooms = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    await ctx.reply("price of the house", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const priceOfTheHouse = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    await ctx.reply((0, _housepost.housePostBuilder)({
        area,
        numberOfBathrooms,
        numberOfBedrooms,
        priceOfTheHouse,
        subCity,
        woredaOrSpecificPlace
    }), {
        parse_mode: "HTML",
        reply_markup: _inlinekeyboard.confirmHousePostInlineKeyboard
    });
    const cbData = await conversation.waitFor("callback_query:data");
    if (cbData.callbackQuery.data == _constants.SUBMIT) {
        const house = await _prisma.HouseRequest.create({
            data: {
                numberOfBathrooms,
                numberOfBedrooms,
                subCity,
                userTelegramID: String(ctx.from?.id),
                woredaOrSpecificPlace,
                area,
                propertyType,
                price: priceOfTheHouse,
                houseRequestType: houseRequestType == "Buy house" ? _client.HouseRequestType.BUY : _client.HouseRequestType.RENT
            }
        });
        const user = await _prisma.User.findUnique({
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        await ctx.reply("Successfully submitted we will contact you with you requirement", {
            reply_markup: _keyboards.homeSeekerMainMenuKeyboard
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
        await ctx.reply("Submission cancled", {
            reply_markup: _keyboards.homeSeekerMainMenuKeyboard
        });
    }
}
