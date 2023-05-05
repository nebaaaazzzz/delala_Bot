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
    paginateBroker: function() {
        return paginateBroker;
    },
    getBrokers: function() {
        return getBrokers;
    }
});
const _grammy = require("grammy");
const _db = require("../../config/db");
const _client = require("@prisma/client");
const _paginationPost = require("./paginationPost");
const paginateBroker = async (ctx)=>{
    const session = ctx.session;
    //["" , "house" , "page" , "param"]
    if (ctx.callbackQuery?.data) {
        const splittedPath = ctx.callbackQuery.data.split("/");
        session.adminBrokerPageNumber = Number(splittedPath[3]);
        const currentPageNumber = session.adminBrokerPageNumber;
        const brokers = await _db.User.findMany({
            where: {
                userType: _client.UserType.BROKER
            },
            orderBy: [
                {
                    createdAt: "desc"
                }
            ]
        });
        if (brokers.length) {
            const postedHouseLength = brokers.length;
            const broker = brokers[currentPageNumber - 1];
            const inlineKeyboard = new _grammy.InlineKeyboard();
            if (currentPageNumber > 1) {
                inlineKeyboard.add({
                    text: `«1`,
                    callback_data: `/broker/page/1`
                });
            }
            if (currentPageNumber > 2) {
                inlineKeyboard.add({
                    text: `‹${currentPageNumber - 1}`,
                    callback_data: `/broker/page/` + (currentPageNumber - 1).toString()
                });
            }
            inlineKeyboard.add({
                text: `-${currentPageNumber}-`,
                callback_data: `/broker/page/` + currentPageNumber.toString()
            });
            if (currentPageNumber < postedHouseLength - 1) {
                inlineKeyboard.add({
                    text: `${currentPageNumber + 1}›`,
                    callback_data: `/broker/page/${currentPageNumber + 1}`
                });
            }
            if (currentPageNumber < postedHouseLength) {
                inlineKeyboard.add({
                    text: `${postedHouseLength}»`,
                    callback_data: `/broker/page/` + postedHouseLength.toString()
                });
            }
            await ctx.reply((0, _paginationPost.userBuilder)(broker), {
                parse_mode: "HTML",
                reply_markup: inlineKeyboard
            });
        } else {
            await ctx.reply("No Broker to Display");
        }
    //console.log(houses);
    }
};
const getBrokers = async (ctx)=>{
    const session = await ctx.session;
    const brokers = await _db.User.findMany({
        where: {
            userType: _client.UserType.BROKER
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ]
    });
    if (brokers.length) {
        const userHousePostLength = brokers.length;
        const broker = brokers[0];
        session.adminBrokerPageNumber = 0;
        const inlineKeyboard = new _grammy.InlineKeyboard();
        inlineKeyboard.text(` -${1}›`, `/broker/page/${1}`);
        for(let i = 2; i <= (userHousePostLength > 5 ? 5 : userHousePostLength); i++){
            inlineKeyboard.text(` ${i}`, `/broker/page/${i}`);
        }
        await ctx.reply((0, _paginationPost.userBuilder)(broker), {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard
        });
    } else {
        await ctx.reply("No Broker to Display");
    }
};
