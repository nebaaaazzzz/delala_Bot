"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getConfirmHousePostInlineKeyboard", {
    enumerable: true,
    get: function() {
        return getConfirmHousePostInlineKeyboard;
    }
});
const _grammy = require("grammy");
const _constants = require("../config/constants");
function getConfirmHousePostInlineKeyboard(ctx) {
    return new _grammy.InlineKeyboard([
        [
            {
                text: ctx.t("CANCEL"),
                callback_data: _constants.CANCEL
            },
            {
                text: ctx.t("SUBMIT"),
                callback_data: _constants.SUBMIT
            }
        ]
    ]).inline_keyboard;
}
