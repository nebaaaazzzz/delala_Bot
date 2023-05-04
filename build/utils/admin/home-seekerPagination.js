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
    paginateHomeSeeker: function() {
        return paginateHomeSeeker;
    },
    getHomeSeekers: function() {
        return getHomeSeekers;
    }
});
const _grammy = require("grammy");
const _prisma = require("../../config/prisma");
const _client = require("@prisma/client");
const _paginationPost = require("./paginationPost");
const paginateHomeSeeker = async (ctx)=>{
    const session = ctx.session;
    //["" , "house" , "page" , "param"]
    if (ctx.callbackQuery?.data) {
        const splittedPath = ctx.callbackQuery.data.split("/");
        session.adminUserPageNumber = Number(splittedPath[3]);
        const currentPageNumber = session.adminUserPageNumber;
        const homeseekers = await _prisma.User.findMany({
            where: {
                userType: _client.UserType.HOME_SEEKER
            },
            orderBy: [
                {
                    createdAt: "desc"
                }
            ]
        });
        if (homeseekers.length) {
            const postedHouseLength = homeseekers.length;
            const homeseeker = homeseekers[currentPageNumber - 1];
            const inlineKeyboard = new _grammy.InlineKeyboard();
            if (currentPageNumber > 1) {
                inlineKeyboard.add({
                    text: `«1`,
                    callback_data: `/home-seeker/page/1`
                });
            }
            if (currentPageNumber > 2) {
                inlineKeyboard.add({
                    text: `‹${currentPageNumber - 1}`,
                    callback_data: `/home-seeker/page/` + (currentPageNumber - 1).toString()
                });
            }
            inlineKeyboard.add({
                text: `-${currentPageNumber}-`,
                callback_data: `/home-seeker/page/` + currentPageNumber.toString()
            });
            if (currentPageNumber < postedHouseLength - 1) {
                inlineKeyboard.add({
                    text: `${currentPageNumber + 1}›`,
                    callback_data: `/home-seeker/page/${currentPageNumber + 1}`
                });
            }
            if (currentPageNumber < postedHouseLength) {
                inlineKeyboard.add({
                    text: `${postedHouseLength}»`,
                    callback_data: `/home-seeker/page/` + postedHouseLength.toString()
                });
            }
            await ctx.reply((0, _paginationPost.userBuilder)(homeseeker), {
                parse_mode: "HTML",
                reply_markup: inlineKeyboard
            });
        } else {
            await ctx.reply("No Home Seeer to Display");
        }
    //console.log(houses);
    }
};
const getHomeSeekers = async (ctx)=>{
    const session = await ctx.session;
    const homeseekers = await _prisma.User.findMany({
        where: {
            userType: _client.UserType.HOME_SEEKER
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ]
    });
    if (homeseekers.length) {
        const userHousePostLength = homeseekers.length;
        const homeseeker = homeseekers[0];
        session.adminUserPageNumber = 0;
        const inlineKeyboard = new _grammy.InlineKeyboard();
        inlineKeyboard.text(` -${1}›`, `/home-seeker/page/${1}`);
        for(let i = 2; i <= (userHousePostLength > 5 ? 5 : userHousePostLength); i++){
            inlineKeyboard.text(` ${i}`, `/home-seeker/page/${i}`);
        }
        await ctx.reply((0, _paginationPost.userBuilder)(homeseeker), {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard
        });
    } else {
        await ctx.reply("No Home Seeer to Display");
    }
};
