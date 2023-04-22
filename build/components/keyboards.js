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
    selectUserTypeKeyboard: function() {
        return selectUserTypeKeyboard;
    },
    sharePhoneKeyboard: function() {
        return sharePhoneKeyboard;
    },
    brokerMainMenuKeyboard: function() {
        return brokerMainMenuKeyboard;
    },
    homeSeekerMainMenuKeyboard: function() {
        return homeSeekerMainMenuKeyboard;
    },
    selectSubCityKeyboard: function() {
        return selectSubCityKeyboard;
    },
    selectSubCityKeyboardWithCancle: function() {
        return selectSubCityKeyboardWithCancle;
    },
    selectPropertyKeyboardWithCancle: function() {
        return selectPropertyKeyboardWithCancle;
    },
    selectRequestTypeKeyboardWithCancel: function() {
        return selectRequestTypeKeyboardWithCancel;
    },
    cancelKeyboard: function() {
        return cancelKeyboard;
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
const selectUserTypeKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.BROKER
        }
    ],
    [
        {
            text: _constants.HOME_SEEKER
        }
    ]
]).oneTime(true).resized(true);
const sharePhoneKeyboard = new _grammy.Keyboard([
    [
        {
            text: "Share Contact",
            request_contact: true
        }
    ]
]).oneTime(true).resized(true);
const brokerMainMenuKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.SELL_HOUSE
        },
        {
            text: _constants.RENT_HOUSE
        }
    ],
    [
        {
            text: _constants.SETTING
        },
        {
            text: _constants.MY_HOUSES
        }
    ],
    [
        {
            text: _constants.ABOUT_US
        },
        {
            text: _constants.TERMS_OF_USE
        }
    ]
]).resized(true);
const homeSeekerMainMenuKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.REQUEST_HOUSE
        }
    ],
    [
        {
            text: _constants.SETTING
        },
        {
            text: _constants.ABOUT_US
        }
    ],
    [
        {
            text: _constants.TERMS_OF_USE
        }
    ]
]).resized(true);
const selectSubCityKeyboard = new _grammy.Keyboard(_constants.SUBCITIES.map((subCity)=>[
        {
            text: subCity
        }
    ])).resized(true);
const selectSubCityKeyboardWithCancle = new _grammy.Keyboard([
    ..._constants.SUBCITIES,
    _constants.CANCEL
].map((subCity)=>[
        {
            text: subCity
        }
    ])).resized(true);
const selectPropertyKeyboardWithCancle = new _grammy.Keyboard([
    ..._constants.PROPERTY_TYPES,
    _constants.CANCEL
].map((subCity)=>[
        {
            text: subCity
        }
    ])).resized(true);
const selectRequestTypeKeyboardWithCancel = new _grammy.Keyboard([
    _constants.RENT_HOUSE,
    _constants.BUY_HOUSE,
    _constants.CANCEL
].map((type)=>[
        {
            text: type
        }
    ])).resized(true);
const cancelKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.CANCEL
        }
    ]
]).resized(true);
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
            text: _constants.BROKERS
        },
        {
            text: _constants.HOME_SEEKERS
        }
    ]
]).resized(true);
