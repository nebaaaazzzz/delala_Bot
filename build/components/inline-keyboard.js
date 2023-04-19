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
    selectLanguageInlineKeyboard: function() {
        return selectLanguageInlineKeyboard;
    },
    confirmHousePostInlineKeyboard: function() {
        return confirmHousePostInlineKeyboard;
    }
});
const _grammy = require("grammy");
const _constants = require("../config/constants");
const selectLanguageInlineKeyboard = new _grammy.InlineKeyboard([
    [
        {
            text: "English",
            callback_data: _constants.EN_LANGUAGE
        },
        {
            text: "Amharic",
            callback_data: _constants.AM_LANGUAGE
        }
    ]
]);
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
]);
