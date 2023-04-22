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
    const messageId = ctx.callbackQuery?.message?.message_id;
    //["" , "house" , "page" , "param"]
    if (ctx?.callbackQuery?.data) {
        const splittedPath = ctx.callbackQuery?.data.split("/");
        const houseId = Number(splittedPath[3]);
        //approve the house
        const house = await _prisma.House.update({
            where: {
                id: houseId
            },
            include: {
                user: true
            },
            data: {
                status: "APPROVED"
            }
        });
        const houseImages = await _prisma.HouseImage.findMany({
            where: {
                houseId: house.id
            }
        });
        //post to the channel approved house
        const message = await _botConfig.default.api.sendMediaGroup(_constants.CHANNEL_ID, [
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
                    woredaOrSpecificPlace: house.woredaOrSpecificPlace
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
        //update the message to show new status for the admin
        // await bot.api.editMessageCaption(ADMIN_TELEGRAM_ID, messageId as number, {
        //   caption: `
        //   ///////////////${house.status}////////////
        //   *Subcity : * ${house.subCity}
        //    *woreds : *  ${house.woredaOrSpecificPlace}
        //    *area : *     ${house.area}
        //    *Number of bedroom : * ${house.numberOfBedrooms}
        //    *Number of bathroom : * ${house.numberOfBathrooms}
        //    *House Post type : * ${house.housePostType}
        //    *Price : * ${house.price}`,
        // });
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
                    woredaOrSpecificPlace: house.woredaOrSpecificPlace
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
};
const rejectHouse = async (ctx)=>{
    const messageId = ctx.callbackQuery?.message?.message_id;
    if (ctx.callbackQuery?.data) {
        //["" , "house" , "page" , "param"]
        const splittedPath = ctx.callbackQuery.data.split("/");
        const houseId = Number(splittedPath[3]);
        const house = await _prisma.House.update({
            where: {
                id: houseId
            },
            include: {
                user: true
            },
            data: {
                status: "REJECTED"
            }
        });
        const houseImages = await _prisma.HouseImage.findMany({
            where: {
                houseId: house.id
            }
        });
        //update the message to show new status for the admin
        // await bot.api.editMessageCaption(BOT_ID, messageId as number, {
        //   caption: housePostWithStatusBuilder(house.status, {
        //     area: house.area,
        //     numberOfBathrooms: house.numberOfBathrooms,
        //     numberOfBedrooms: house.numberOfBedrooms,
        //     priceOfTheHouse: house.price,
        //     subCity: house.subCity,
        //     woredaOrSpecificPlace: house.woredaOrSpecificPlace,
        //   }),
        // });
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
                    woredaOrSpecificPlace: house.woredaOrSpecificPlace
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
};
