"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "confirmHousePostInlineKeyboard", {
    enumerable: true,
    get: function() {
        return confirmHousePostInlineKeyboard;
    }
});
const _grammy = require("grammy");
const _constants = require("../config/constants");
const confirmHousePostInlineKeyboard = new _grammy.InlineKeyboard([
    [
        {
            text: "Cancel",
            callback_data: _constants.CANCEL
        },
        {
            text: "Submit",
            callback_data: _constants.SUBMIT
        }
    ]
]).inline_keyboard;
