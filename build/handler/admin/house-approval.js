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
const _House = require("../../entity/House");
const _housepost = require("../../utils/housepost");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const approveHouse = async (ctx)=>{
    console.log("approve");
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
        let house = await _House.House.findOne({
            relations: {
                user: true,
                houseImages: true
            },
            where: {
                id: houseId
            }
        });
        if (house?.status == status) {
            return await ctx.reply("House Already " + status);
        } else {
            await _House.House.update({
                id: houseId
            }, {
                status: status
            });
            let house = await _House.House.findOne({
                relations: {
                    user: true,
                    houseImages: true
                },
                where: {
                    id: houseId
                }
            });
            let houseImages = house.houseImages;
            //update the message to show new status for the admin
            try {
                await _botConfig.default.api.editMessageCaption(_constants.ADMIN_TELEGRAM_ID, captionId, {
                    parse_mode: "HTML",
                    caption: (0, _housepost.housePostWithStatusBuilder)(ctx, house.status, {
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
                        caption: (0, _housepost.housePostBuilder)(ctx, {
                            area: house.area,
                            numberOfBathrooms: house.numberOfBathrooms,
                            numberOfBedrooms: house.numberOfBedrooms,
                            priceOfTheHouse: house.price,
                            subCity: house.subCity,
                            woredaOrSpecificPlace: house.woredaOrSpecificPlace,
                            housePostType: house.housePostType,
                            propertyType: house.propertyType
                        }) + `
          FOR MORE INFORMATION PLEASE CONTACT Us
          <b>Phone </b>: ${_constants.ADMIN_PHONE_NUMBER}
          <b>Telegram </b>: @${_constants.ADMIN_TELEGRAM_USERNAME}
            `
                    },
                    ...Array(houseImages.length - 1).fill(1).map((_, i)=>{
                        return {
                            type: "photo",
                            media: houseImages[i + 1].image
                        };
                    })
                ]);
            }
            await ctx.i18n.useLocale(house.user.language);
            //send to the user the house is posted
            await _botConfig.default.api.sendMediaGroup(house.user.telegramId, [
                {
                    type: "photo",
                    media: houseImages[0].image,
                    parse_mode: "HTML",
                    caption: (0, _housepost.housePostWithStatusBuilder)(ctx, house.status, {
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
                ...Array(houseImages.length - 1).fill(1).map((_, i)=>{
                    return {
                        type: "photo",
                        media: houseImages[i + 1].image
                    };
                })
            ]);
        }
    // approve the house
    }
}
