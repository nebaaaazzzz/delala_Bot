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
function _default(adminRouter) {
    adminRouter.callbackQuery(/^(\/house\/approve\/.+)/gi, _houseapproval.approveHouse);
    adminRouter.callbackQuery(/^(\/house\/reject\/.+)/gi, _houseapproval.rejectHouse);
    adminRouter.command("start", async (ctx)=>{
        ctx.api.sendMessage(_constants.ADMIN_TELEGRAM_ID, "Admin");
    });
}
