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
    paginateHouses: function() {
        return paginateHouses;
    },
    getHouses: function() {
        return getHouses;
    }
});
const _grammy = require("grammy");
const _prisma = require("../../config/prisma");
const _housepost = require("../housepost");
const paginateHouses = async (ctx)=>{
    const session = ctx.session;
    //["" , "house" , "page" , "param"]
    if (ctx.callbackQuery?.data) {
        const splittedPath = ctx.callbackQuery.data.split("/");
        session.adminUserPageNumber = Number(splittedPath[3]);
        const currentPageNumber = session.adminUserPageNumber;
        const houses = await _prisma.House.findMany({
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
                    callback_data: `/houses/page/1`
                });
            }
            if (currentPageNumber > 2) {
                inlineKeyboard.add({
                    text: `‹${currentPageNumber - 1}`,
                    callback_data: `/houses/page/` + (currentPageNumber - 1).toString()
                });
            }
            inlineKeyboard.add({
                text: `-${currentPageNumber}-`,
                callback_data: `/houses/page/` + currentPageNumber.toString()
            });
            if (currentPageNumber < postedHouseLength - 1) {
                inlineKeyboard.add({
                    text: `${currentPageNumber + 1}›`,
                    callback_data: `/houses/page/${currentPageNumber + 1}`
                });
            }
            if (currentPageNumber < postedHouseLength) {
                inlineKeyboard.add({
                    text: `${postedHouseLength}»`,
                    callback_data: `/houses/page/` + postedHouseLength.toString()
                });
            }
            await ctx.reply((0, _housepost.housePostWithStatusBuilder)(house.status, {
                area: house.area,
                housePostType: house.housePostType,
                numberOfBathrooms: house.numberOfBathrooms,
                numberOfBedrooms: house.numberOfBedrooms,
                priceOfTheHouse: house.price,
                propertyType: house.propertyType,
                subCity: house.propertyType,
                woredaOrSpecificPlace: house.woredaOrSpecificPlace
            }), {
                parse_mode: "HTML",
                reply_markup: inlineKeyboard
            });
        } else {
            await ctx.reply("No Home Seeer to Display");
        }
    //console.log(houses);
    }
};
const getHouses = async (ctx)=>{
    const session = await ctx.session;
    const houses = await _prisma.House.findMany({
        orderBy: [
            {
                createdAt: "desc"
            }
        ]
    });
    if (houses.length) {
        const userHousePostLength = houses.length;
        const house = houses[0];
        session.adminUserPageNumber = 0;
        const inlineKeyboard = new _grammy.InlineKeyboard();
        inlineKeyboard.text(` -${1}›`, `/houses/page/${1}`);
        for(let i = 2; i <= (userHousePostLength > 5 ? 5 : userHousePostLength); i++){
            inlineKeyboard.text(` ${i}`, `/houses/page/${i}`);
        }
        await ctx.reply((0, _housepost.housePostWithStatusBuilder)(house.status, {
            area: house.area,
            housePostType: house.housePostType,
            numberOfBathrooms: house.numberOfBathrooms,
            numberOfBedrooms: house.numberOfBedrooms,
            priceOfTheHouse: house.price,
            propertyType: house.propertyType,
            subCity: house.propertyType,
            woredaOrSpecificPlace: house.woredaOrSpecificPlace
        }), {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard
        });
    } else {
        await ctx.reply("No Home Seeer to Display");
    }
};
