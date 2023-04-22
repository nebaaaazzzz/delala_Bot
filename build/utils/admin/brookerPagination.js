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
    paginateHouse: function() {
        return paginateHouse;
    },
    getMyHouses: function() {
        return getMyHouses;
    }
});
const _grammy = require("grammy");
const _prisma = require("../../config/prisma");
const _housepost = require("../housepost");
const paginateHouse = async (ctx)=>{
    const session = ctx.session;
    //["" , "house" , "page" , "param"]
    if (ctx.callbackQuery?.data) {
        const splittedPath = ctx.callbackQuery.data.split("/");
        session.adminBrokerPageNumber = Number(splittedPath[3]);
        const currentPageNumber = session.pageNumber;
        const userId = ctx.from?.id;
        if (userId) {
            const houses = await _prisma.House.findMany({
                where: {
                    userTelegramID: String(userId)
                },
                orderBy: [
                    {
                        createdAt: "desc"
                    }
                ]
            });
            if (houses.length) {
                const postedHouseLength = houses.length;
                const house = houses[currentPageNumber - 1];
                const inlineKeyboard = new _grammy.InlineKeyboard();
                if (currentPageNumber > 1) {
                    inlineKeyboard.add({
                        text: `«1`,
                        callback_data: `/house/page/1`
                    });
                }
                if (currentPageNumber > 2) {
                    inlineKeyboard.add({
                        text: `‹${currentPageNumber - 1}`,
                        callback_data: `/house/page/` + (currentPageNumber - 1).toString()
                    });
                }
                inlineKeyboard.add({
                    text: `-${currentPageNumber}-`,
                    callback_data: `/house/page/` + currentPageNumber.toString()
                });
                if (currentPageNumber < postedHouseLength - 1) {
                    inlineKeyboard.add({
                        text: `${currentPageNumber + 1}›`,
                        callback_data: `/house/page/${currentPageNumber + 1}`
                    });
                }
                if (currentPageNumber < postedHouseLength) {
                    inlineKeyboard.add({
                        text: `${postedHouseLength}»`,
                        callback_data: `/house/page/` + postedHouseLength.toString()
                    });
                }
                await ctx.reply((0, _housepost.housePostWithStatusBuilder)(house.status, {
                    area: house.area,
                    housePostType: house.housePostType,
                    numberOfBathrooms: house.numberOfBathrooms,
                    numberOfBedrooms: house.numberOfBedrooms,
                    priceOfTheHouse: house.price,
                    propertyType: house.propertyType,
                    subCity: house.subCity,
                    woredaOrSpecificPlace: house.woredaOrSpecificPlace
                }), {
                    parse_mode: "HTML",
                    reply_markup: inlineKeyboard
                });
            } else {
                await ctx.reply("No Posted House to Display");
            }
        //console.log(houses);
        }
    }
};
const getMyHouses = async (ctx)=>{
    const session = await ctx.session;
    const userId = ctx.from?.id;
    if (userId) {
        const houses = await _prisma.House.findMany({
            where: {
                userTelegramID: String(userId)
            },
            orderBy: [
                {
                    createdAt: "desc"
                }
            ]
        });
        if (houses.length) {
            const userHousePostLength = houses.length;
            const house = houses[0];
            session.pageNumber = 0;
            const inlineKeyboard = new _grammy.InlineKeyboard();
            inlineKeyboard.text(` -${1}›`, `/house/page/${1}`);
            for(let i = 2; i <= (userHousePostLength > 5 ? 5 : userHousePostLength); i++){
                inlineKeyboard.text(` ${i}`, `/house/page/${i}`);
            }
            await ctx.reply((0, _housepost.housePostWithStatusBuilder)(house.status, {
                area: house.area,
                housePostType: house.housePostType,
                numberOfBathrooms: house.numberOfBathrooms,
                numberOfBedrooms: house.numberOfBedrooms,
                priceOfTheHouse: house.price,
                propertyType: house.propertyType,
                subCity: house.subCity,
                woredaOrSpecificPlace: house.woredaOrSpecificPlace
            }), {
                parse_mode: "HTML",
                reply_markup: inlineKeyboard
            });
        } else {
            await ctx.reply("No Posted House to Display");
        }
    }
};
