"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    approveHouse: function() {
        return approveHouse;
    },
    rejectHouse: function() {
        return rejectHouse;
    }
});
const _botConfig = /*#__PURE__*/ _interop_require_default(require("../../config/botConfig"));
const _constants = require("../../config/constants");
const _prisma = require("../../config/prisma");
const _housepost = require("../../utils/housepost");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const BOT_ID = "delalaet_bot";
const approveHouse = async (ctx)=>{
    await handleApproval(ctx, "APPROVED");
};
const rejectHouse = async (ctx)=>{
    await handleApproval(ctx, "REJECTED");
};
async function handleApproval(ctx, status) {
    await ctx.answerCallbackQuery();
    const messageId = ctx.message?.message_id;
    //["" , "house" , "page" , "param"]
    if (ctx?.callbackQuery?.data) {
        const splittedPath = ctx.callbackQuery?.data.split("/");
        const houseId = Number(splittedPath[3]);
        const captionId = Number(splittedPath[4]);
        // approve the house
        const house = await _prisma.House.update({
            where: {
                id: houseId
            },
            include: {
                user: true
            },
            data: {
                status: status
            }
        });
        const houseImages = await _prisma.HouseImage.findMany({
            where: {
                houseId: house.id
            }
        });
        //update the message to show new status for the admin
        try {
            await _botConfig.default.api.editMessageCaption(_constants.ADMIN_TELEGRAM_ID, captionId, {
                caption: (0, _housepost.housePostWithStatusBuilder)(house.status, {
                    area: house.area,
                    numberOfBathrooms: house.numberOfBathrooms,
                    numberOfBedrooms: house.numberOfBedrooms,
                    priceOfTheHouse: house.price,
                    subCity: house.subCity,
                    woredaOrSpecificPlace: house.woredaOrSpecificPlace,
                    housePostType: house.housePostType,
                    propertyType: house.propertyType
                })
            });
        } catch (e) {
            console.log(e.message);
        }
        //post to the channel approved house
        if (status === "APPROVED") {
            await _botConfig.default.api.sendMediaGroup(_constants.CHANNEL_ID, [
                {
                    type: "photo",
                    media: houseImages[0].image,
                    parse_mode: "HTML",
                    caption: (0, _housepost.housePostBuilder)({
                        area: house.area,
                        numberOfBathrooms: house.numberOfBathrooms,
                        numberOfBedrooms: house.numberOfBedrooms,
                        priceOfTheHouse: house.price,
                        subCity: house.subCity,
                        woredaOrSpecificPlace: house.woredaOrSpecificPlace,
                        housePostType: house.housePostType,
                        propertyType: house.propertyType
                    }) + `
            <b>Contact </b>: ${_constants.ADMIN_PHONE_NUMBER}
          `
                },
                {
                    type: "photo",
                    media: houseImages[0].image
                },
                {
                    type: "photo",
                    media: houseImages[0].image
                }
            ]);
        }
        //send to the user the house is posted
        await _botConfig.default.api.sendMediaGroup(house.user.telegramId, [
            {
                type: "photo",
                media: houseImages[0].image,
                parse_mode: "HTML",
                caption: (0, _housepost.housePostWithStatusBuilder)(house.status, {
                    area: house.area,
                    numberOfBathrooms: house.numberOfBathrooms,
                    numberOfBedrooms: house.numberOfBedrooms,
                    priceOfTheHouse: house.price,
                    subCity: house.subCity,
                    woredaOrSpecificPlace: house.woredaOrSpecificPlace,
                    housePostType: house.housePostType,
                    propertyType: house.propertyType
                })
            },
            {
                type: "photo",
                media: houseImages[0].image
            },
            {
                type: "photo",
                media: houseImages[0].image
            }
        ]);
    }
}
