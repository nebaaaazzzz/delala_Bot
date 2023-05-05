"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _constants = require("../config/constants");
const _houseapproval = require("../handler/admin/house-approval");
const _userPagination = require("../utils/admin/userPagination");
const _keyboards = require("../components/keyboards");
const _housePagination = require("../utils/admin/housePagination");
function _default(adminRouter) {
    adminRouter.callbackQuery(/^(\/house\/approve\/.+)/gi, _houseapproval.approveHouse);
    adminRouter.callbackQuery(/^(\/house\/reject\/.+)/gi, _houseapproval.rejectHouse);
    adminRouter.command("start", async (ctx)=>{
        ctx.api.sendMessage(_constants.ADMIN_TELEGRAM_ID, "Admin", {
            reply_markup: _keyboards.adminKeyboard
        });
    });
    adminRouter.hears(_constants.USER, _userPagination.getUsers);
    adminRouter.callbackQuery(/^(\/user\/page\/.+)/gi, _userPagination.paginateUsers);
    adminRouter.hears(_constants.HOUSES, _housePagination.getHouses);
    adminRouter.callbackQuery(/^(\/houses\/page\/.+)/gi, _housePagination.paginateHouses);
}
