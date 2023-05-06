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
    getSelectUserTypeKeyboard: function() {
        return getSelectUserTypeKeyboard;
    },
    getSharePhoneKeyboard: function() {
        return getSharePhoneKeyboard;
    },
    getUserMainMenuKeyboard: function() {
        return getUserMainMenuKeyboard;
    },
    getBrokerMainMenuKeyboard: function() {
        return getBrokerMainMenuKeyboard;
    },
    getHomeSeekerMainMenuKeyboard: function() {
        return getHomeSeekerMainMenuKeyboard;
    },
    getSettingsKeyboard: function() {
        return getSettingsKeyboard;
    },
    getSelectSubCityKeyboard: function() {
        return getSelectSubCityKeyboard;
    },
    getSelectSubCityKeyboardWithCancel: function() {
        return getSelectSubCityKeyboardWithCancel;
    },
    getSelectPropertyTypeKeyboardWithCancel: function() {
        return getSelectPropertyTypeKeyboardWithCancel;
    },
    getSelectRequestTypeKeyboardWithCancel: function() {
        return getSelectRequestTypeKeyboardWithCancel;
    },
    getCancelKeyboard: function() {
        return getCancelKeyboard;
    },
    getCancelWithDoneKeyboard: function() {
        return getCancelWithDoneKeyboard;
    },
    selectLanguageKeyboard: function() {
        return selectLanguageKeyboard;
    },
    adminKeyboard: function() {
        return adminKeyboard;
    }
});
const _grammy = require("grammy");
const _constants = require("../config/constants");
function getSelectUserTypeKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("BROKER")
            }
        ],
        [
            {
                text: ctx.t("HOME_SEEKER")
            }
        ]
    ]).oneTime(true).resized(true);
}
function getSharePhoneKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("pls-share-yr-ctact"),
                request_contact: true
            }
        ]
    ]).oneTime(true).resized(true);
}
function getUserMainMenuKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("BROKER")
            },
            {
                text: ctx.t("HOME_SEEKER")
            }
        ],
        [
            {
                text: ctx.t("SETTING")
            }
        ],
        [
            {
                text: ctx.t("ABOUT_US")
            },
            {
                text: ctx.t("TERMS_OF_USE")
            }
        ]
    ]).resized(true);
}
function getBrokerMainMenuKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("SELL_HOUSE")
            },
            {
                text: ctx.t("RENT_HOUSE")
            }
        ],
        [
            {
                text: ctx.t("MY_HOUSES")
            },
            {
                text: ctx.t("back")
            }
        ]
    ]).resized(true);
}
function getHomeSeekerMainMenuKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("REQUEST_HOUSE")
            }
        ],
        [
            {
                text: ctx.t("CHANNEL")
            }
        ],
        [
            {
                text: ctx.t("back")
            }
        ]
    ]).resized(true);
}
function getSettingsKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("cng_lang")
            }
        ],
        [
            {
                text: ctx.t("back")
            }
        ]
    ]).resized(true);
}
function getSelectSubCityKeyboard(ctx) {
    return new _grammy.Keyboard([
        ...JSON.parse(ctx.t("SUBCITIES"))
    ].map((subCity)=>[
            {
                text: subCity
            }
        ])).resized(true);
}
function getSelectSubCityKeyboardWithCancel(ctx) {
    return new _grammy.Keyboard([
        ...JSON.parse(ctx.t("SUBCITIES")),
        ctx.t("CANCEL")
    ].map((subCity)=>[
            {
                text: subCity
            }
        ])).resized(true);
}
function getSelectPropertyTypeKeyboardWithCancel(ctx) {
    return new _grammy.Keyboard([
        ...JSON.parse(ctx.t("PROPERTY_TYPES")),
        ctx.t("CANCEL")
    ].map((property)=>[
            {
                text: property
            }
        ])).resized(true);
}
function getSelectRequestTypeKeyboardWithCancel(ctx) {
    return new _grammy.Keyboard([
        ctx.t("RENT_HOUSE"),
        ctx.t("BUY_HOUSE"),
        ctx.t("CANCEL")
    ].map((type)=>[
            {
                text: type
            }
        ])).resized(true);
}
function getCancelKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("CANCEL")
            }
        ]
    ]).resized(true);
}
function getCancelWithDoneKeyboard(ctx) {
    return new _grammy.Keyboard([
        [
            {
                text: ctx.t("CANCEL")
            }
        ],
        [
            {
                text: ctx.t("DONE")
            }
        ]
    ]).resized(true);
}
const selectLanguageKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.EN_LANGUAGE
        }
    ],
    [
        {
            text: _constants.AM_LANGUAGE
        }
    ]
]).resized(true);
const adminKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.USER
        }
    ],
    [
        {
            text: _constants.HOUSES
        }
    ]
]).resized(true);
