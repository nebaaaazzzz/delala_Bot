"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _client = require("@prisma/client");
const _inlinekeyboard = require("../../components/inline-keyboard");
const _keyboards = require("../../components/keyboards");
const _constants = require("../../config/constants");
const _prisma = require("../../config/prisma");
const _botConfig = /*#__PURE__*/ _interop_require_default(require("../../config/botConfig"));
const _housepost = require("../../utils/housepost");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function handleCancel(ctx) {
    if (ctx.message?.text == _constants.CANCEL) {
        await ctx.reply("Canceled");
        await ctx.reply("Main menu", {
            reply_markup: _keyboards.brokerMainMenuKeyboard
        });
        return await ctx.conversation.exit();
    }
}
async function houseRentPostConversation(conversation, ctx) {
    let imgArray = [];
    const IMG_SIZE = 3;
    for(; imgArray.length < 3;){
        await ctx.reply(`Please share ${IMG_SIZE - imgArray.length} photos of the house`, {
            reply_markup: _keyboards.cancelKeyboard
        });
        const img = await conversation.waitFor(":photo", {
            otherwise: async (ctx)=>{
                return await handleCancel(ctx);
            }
        });
        imgArray.push(img.message?.photo[0].file_id);
    }
    await ctx.reply("Select subcity of the house", {
        reply_markup: _keyboards.selectSubCityKeyboardWithCancle
    });
    const subCity = await conversation.form.select(_constants.SUBCITIES, async (ctx)=>{
        await handleCancel(ctx);
        await ctx.reply("Please select subcity of the house");
    });
    await ctx.reply("woreda / specific", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const woredaOrSpecificPlace = await conversation.form.text();
    await ctx.reply("property type", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const propertyType = await conversation.form.text();
    await ctx.reply("Area squre meter in number");
    const area = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter area in number"));
    await ctx.reply("Number of bedrooms in number", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const numberOfBedrooms = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter number of bedrooms in number"));
    await ctx.reply("number of bathrooms in number", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const numberOfBathrooms = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter number of bathrooms in number"));
    await ctx.reply("price of the house", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const priceOfTheHouse = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter number of bathrooms in number"));
    await ctx.replyWithMediaGroup([
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
                woredaOrSpecificPlace
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
    await ctx.reply("confirmation to submit the house", {
        reply_markup: _inlinekeyboard.confirmHousePostInlineKeyboard
    });
    const cbData = await conversation.waitFor("callback_query:data");
    if (cbData.callbackQuery.data == _constants.SUBMIT) {
        const house = await _prisma.House.create({
            data: {
                numberOfBathrooms,
                numberOfBedrooms,
                subCity,
                userTelegramID: String(ctx.from?.id),
                woredaOrSpecificPlace,
                area,
                propertyType,
                housePostType: _client.HousePostType.RENT,
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
        await ctx.reply("Successfully submitted the house wait for a review", {
            reply_markup: _keyboards.brokerMainMenuKeyboard
        });
        const message = await _botConfig.default.api.sendMediaGroup(_constants.ADMIN_TELEGRAM_ID, [
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
                    woredaOrSpecificPlace
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
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            callback_data: `/house/approve/${house.id}`,
                            text: "Approve"
                        },
                        {
                            callback_data: `/house/reject/${house.id}`,
                            text: "Reject"
                        }
                    ]
                ]
            }
        });
        return;
    } else if (cbData.callbackQuery.data == _constants.CANCEL) {
        await ctx.reply("Submission cancled", {
            reply_markup: _keyboards.brokerMainMenuKeyboard
        });
    }
}
