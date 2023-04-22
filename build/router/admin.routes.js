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
const _homeseekerPagination = require("../utils/admin/home-seekerPagination");
const _brokerPagination = require("../utils/admin/brokerPagination");
const _keyboards = require("../components/keyboards");
function _default(adminRouter) {
    adminRouter.callbackQuery(/^(\/house\/approve\/.+)/gi, _houseapproval.approveHouse);
    adminRouter.callbackQuery(/^(\/house\/reject\/.+)/gi, _houseapproval.rejectHouse);
    adminRouter.command("start", async (ctx)=>{
        ctx.api.sendMessage(_constants.ADMIN_TELEGRAM_ID, "Admin", {
            reply_markup: _keyboards.adminKeyboard
        });
    });
    adminRouter.hears(_constants.BROKERS, _brokerPagination.getBrokers);
    adminRouter.callbackQuery(/^(\/broker\/page\/.+)/gi, _brokerPagination.paginateBroker);
    adminRouter.hears(_constants.HOME_SEEKERS, _homeseekerPagination.getHomeSeekers);
    adminRouter.callbackQuery(/^(\/home-seeker\/page\/.+)/gi, _homeseekerPagination.paginateHomeSeeker);
}
