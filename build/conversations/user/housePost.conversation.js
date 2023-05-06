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
const _botConfig = /*#__PURE__*/ _interop_require_default(require("../../config/botConfig"));
const _House = require("../../entity/House");
const _HouseImage = require("../../entity/HouseImage");
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
    } else if (ctx.message?.text == ctx.t("DONE")) {
        return true; // TO BREAK THE FOR LOOP
    }
}
async function housePostConversation(conversation, ctx, housePostType) {
    let message;
    let imgArray = [];
    for(; imgArray.length < _constants.MAX_IMG_SIZE;){
        await ctx.reply(// IMG_SIZE - imgArray.lengthJ
        ctx.t("pls-shr-pic-z-house", {
            imgLength: _constants.MAX_IMG_SIZE - imgArray.length
        }), {
            reply_markup: imgArray.length >= 3 ? (0, _keyboards.getCancelWithDoneKeyboard)(ctx) // IF IMG ARRAY LENGTH IS GREATER THAN 3
             : (0, _keyboards.getCancelKeyboard)(ctx)
        });
        const img = await conversation.waitFor([
            ":text",
            ":photo"
        ]);
        if (img.message?.photo) {
            imgArray.push(img.message?.photo[0].file_id);
        } else {
            if (img.message?.text == ctx.t("DONE")) {
                break;
            } else if (img.message?.text == ctx.t("CANCEL")) {
                await ctx.reply(ctx.t("mm"), {
                    reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
                });
                return await ctx.conversation.exit();
            }
        }
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
            reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
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
        reply_markup: (0, _keyboards.getCancelKeyboard)(ctx)
    });
    const area = await conversation.form.text();
    if (area === ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
        });
        return;
    }
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
            caption: (0, _housepost.housePostBuilder)(ctx, {
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
        ...Array(_constants.MAX_IMG_SIZE - 1).fill(1).map((_, i)=>{
            return {
                type: "photo",
                media: imgArray[i + 1]
            };
        })
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
        let houseImageArray = [];
        for(let i = 0; i < _constants.MAX_IMG_SIZE; i++){
            const houseImage = new _HouseImage.HouseImage();
            houseImage.image = imgArray[i];
            houseImageArray.push(houseImage);
            await houseImage.save();
        }
        const house = new _House.House();
        house.area = area;
        house.numberOfBathrooms = numberOfBathrooms;
        house.numberOfBedrooms = numberOfBedrooms;
        house.subCity = subCity;
        house.user = await _User.User.findOne({
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        house.price = priceOfTheHouse;
        house.housePostType = housePostType;
        house.woredaOrSpecificPlace = woredaOrSpecificPlace;
        house.propertyType = propertyType;
        house.houseImages = houseImageArray;
        const savedHouse = await house.save();
        console.log(savedHouse);
        await ctx.reply(ctx.t("success-submit-house"), {
            reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
        });
        message = await _botConfig.default.api.sendMediaGroup(_constants.ADMIN_TELEGRAM_ID, [
            {
                type: "photo",
                media: imgArray[0],
                parse_mode: "HTML",
                caption: (0, _housepost.housePostWithStatusBuilder)(ctx, "PENDING", {
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
            ...Array(_constants.MAX_IMG_SIZE - 1).fill(1).map((_, i)=>{
                return {
                    type: "photo",
                    media: imgArray[i + 1]
                };
            })
        ]);
        await _botConfig.default.api.sendMessage(_constants.ADMIN_TELEGRAM_ID, "confirm", {
            reply_to_message_id: message[0].message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            callback_data: `/house/approve/${savedHouse.id}/${message[0].message_id}`,
                            text: "Approve"
                        },
                        {
                            callback_data: `/house/reject/${savedHouse.id}/${message[0].message_id}`,
                            text: "Reject"
                        }
                    ]
                ]
            }
        });
    } else {
        await housePostConversation(conversation, ctx, housePostType);
    }
}
