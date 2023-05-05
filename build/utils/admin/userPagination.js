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
    paginateUsers: function() {
        return paginateUsers;
    },
    getUsers: function() {
        return getUsers;
    }
});
const _grammy = require("grammy");
const _paginationPost = require("./paginationPost");
const _User = require("../../entity/User");
const paginateUsers = async (ctx)=>{
    const session = ctx.session;
    //["" , "house" , "page" , "param"]
    if (ctx.callbackQuery?.data) {
        const splittedPath = ctx.callbackQuery.data.split("/");
        session.adminUserPageNumber = Number(splittedPath[3]);
        const currentPageNumber = session.adminUserPageNumber;
        const homeseekers = await _User.User.find({
            order: {
                createdAt: "DESC"
            }
        });
        if (homeseekers.length) {
            const postedHouseLength = homeseekers.length;
            const homeseeker = homeseekers[currentPageNumber - 1];
            const inlineKeyboard = new _grammy.InlineKeyboard();
            if (currentPageNumber > 1) {
                inlineKeyboard.add({
                    text: `«1`,
                    callback_data: `/user/page/1`
                });
            }
            if (currentPageNumber > 2) {
                inlineKeyboard.add({
                    text: `‹${currentPageNumber - 1}`,
                    callback_data: `/user/page/` + (currentPageNumber - 1).toString()
                });
            }
            inlineKeyboard.add({
                text: `-${currentPageNumber}-`,
                callback_data: `/user/page/` + currentPageNumber.toString()
            });
            if (currentPageNumber < postedHouseLength - 1) {
                inlineKeyboard.add({
                    text: `${currentPageNumber + 1}›`,
                    callback_data: `/user/page/${currentPageNumber + 1}`
                });
            }
            if (currentPageNumber < postedHouseLength) {
                inlineKeyboard.add({
                    text: `${postedHouseLength}»`,
                    callback_data: `/user/page/` + postedHouseLength.toString()
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
const getUsers = async (ctx)=>{
    const session = await ctx.session;
    const users = await _User.User.find({
        order: {
            createdAt: "DESC"
        }
    });
    if (users.length) {
        const userHousePostLength = users.length;
        const homeseeker = users[0];
        session.adminUserPageNumber = 0;
        const inlineKeyboard = new _grammy.InlineKeyboard();
        inlineKeyboard.text(` -${1}›`, `/user/page/${1}`);
        for(let i = 2; i <= (userHousePostLength > 5 ? 5 : userHousePostLength); i++){
            inlineKeyboard.text(` ${i}`, `/user/page/${i}`);
        }
        await ctx.reply((0, _paginationPost.userBuilder)(homeseeker), {
            parse_mode: "HTML",
            reply_markup: inlineKeyboard
        });
    } else {
        await ctx.reply("No User to Display");
    }
};
