"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "housePostConversation", {
    enumerable: true,
    get: function() {
        return housePostConversation;
    }
});
const _keyboards = require("../../components/keyboards");
const _constants = require("../../config/constants");
const _housepost = require("../../utils/housepost");
const _inlinekeyboard = require("../../components/inline-keyboard");
const _prisma = require("../../config/prisma");
const _botConfig = /*#__PURE__*/ _interop_require_default(require("../../config/botConfig"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function handleCancelFromCtx(ctx) {
    if (ctx.message?.text == ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getBrokerMainMenuKeyboard)(ctx)
        });
        return await ctx.conversation.exit();
    }
}
async function housePostConversation(conversation, ctx, housePostType) {
    let message;
    let imgArray = [];
    const IMG_SIZE = 3;
    for(; imgArray.length < 3;){
        await ctx.reply(// IMG_SIZE - imgArray.length
        ctx.t("pls-shr-pic-z-house", {
            imgLength: IMG_SIZE - imgArray.length
        }), {
            reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
        });
        const img = await conversation.waitFor(":photo", {
            otherwise: async (ctx)=>{
                return await handleCancelFromCtx(ctx);
            }
        });
        imgArray.push(img.message?.photo[0].file_id);
    }
    await ctx.reply(ctx.t("Slct-sub-city-zhouse"), {
        reply_markup: (0, _keyboards.getSelectSubCityKeyboardWithCancel)(ctx)
    });
    const subCity = await conversation.form.select(JSON.parse(ctx.t("SUBCITIES")), async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    //**woreda start */
    await ctx.reply(ctx.t("wrda-spcic-loc"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const woredaOrSpecificPlace = await conversation.form.text();
    if (woredaOrSpecificPlace === ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getBrokerMainMenuKeyboard)(ctx)
        });
        return;
    }
    //**end woreda  */
    //**start property type  */
    await ctx.reply(ctx.t("pprty-type"), {
        reply_markup: (0, _keyboards.getSelectPropertyTypeKeyboardWithCancel)(ctx)
    });
    const propertyType = await conversation.form.select(JSON.parse(ctx.t("PROPERTY_TYPES")), async (ctx)=>await handleCancelFromCtx(ctx));
    //**end property type  */
    //**start area  */
    await ctx.reply(ctx.t("area-z-house"), {
        reply_markup: {
            remove_keyboard: true
        }
    });
    const area = await conversation.form.text();
    //**end area  */
    //**start num of bedroom  */
    await ctx.reply(ctx.t("nmbr-bedrooms"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const numberOfBedrooms = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    //**start num of bathroom  */
    await ctx.reply(ctx.t("nmbr-bathrooms"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const numberOfBathrooms = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    //**end num of bathroom  */
    //**start price  */
    await ctx.reply(ctx.t("price-z-house"), {
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const priceOfTheHouse = await conversation.form.number(async (ctx)=>{
        await handleCancelFromCtx(ctx);
    });
    //**end price  */
    message = await ctx.replyWithMediaGroup([
        {
            type: "photo",
            media: imgArray[0],
            parse_mode: "HTML",
            caption: (0, _housepost.housePostBuilder)({
                area,
                numberOfBathrooms,
                numberOfBedrooms,
                priceOfTheHouse,
                subCity,
                woredaOrSpecificPlace,
                propertyType,
                housePostType
            })
        },
        {
            type: "photo",
            media: imgArray[1]
        },
        {
            type: "photo",
            media: imgArray[2]
        }
    ]);
    await ctx.reply(ctx.t("cfirm-submit-house"), {
        reply_to_message_id: message[0].message_id,
        reply_markup: {
            remove_keyboard: true,
            inline_keyboard: (0, _inlinekeyboard.getConfirmHousePostInlineKeyboard)(ctx)
        }
    });
    const cbData = await conversation.waitFor("callback_query:data");
    let submitted = cbData.callbackQuery.data == _constants.SUBMIT;
    if (submitted) {
        const house = await _prisma.House.create({
            data: {
                numberOfBathrooms,
                numberOfBedrooms,
                subCity,
                userTelegramID: String(ctx.from?.id),
                woredaOrSpecificPlace,
                area,
                propertyType,
                housePostType: housePostType,
                price: priceOfTheHouse
            }
        });
        for(let i = 0; i < 3; i++){
            await _prisma.HouseImage.create({
                data: {
                    houseId: house.id,
                    image: imgArray[i]
                }
            });
        }
        await ctx.reply(ctx.t("success-submit-house"), {
            reply_markup: (0, _keyboards.getBrokerMainMenuKeyboard)(ctx)
        });
        message = await _botConfig.default.api.sendMediaGroup(_constants.ADMIN_TELEGRAM_ID, [
            {
                type: "photo",
                media: imgArray[0],
                parse_mode: "HTML",
                caption: (0, _housepost.housePostWithStatusBuilder)(house.status, {
                    area,
                    numberOfBathrooms,
                    numberOfBedrooms,
                    priceOfTheHouse,
                    subCity,
                    woredaOrSpecificPlace,
                    propertyType,
                    housePostType
                })
            },
            {
                type: "photo",
                media: imgArray[1]
            },
            {
                type: "photo",
                media: imgArray[2]
            }
        ]);
        await _botConfig.default.api.sendMessage(_constants.ADMIN_TELEGRAM_ID, "confirm", {
            reply_to_message_id: message[0].message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            callback_data: `/house/approve/${house.id}/${message[0].message_id}`,
                            text: "Approve"
                        },
                        {
                            callback_data: `/house/reject/${house.id}/${message[0].message_id}`,
                            text: "Reject"
                        }
                    ]
                ]
            }
        });
    } else {
        await ctx.reply(ctx.t("submission-cancle"), {
            reply_markup: (0, _keyboards.getBrokerMainMenuKeyboard)(ctx)
        });
    }
}
