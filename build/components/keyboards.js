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
    selectSubCityKeyboard: function() {
        return selectSubCityKeyboard;
    },
    selectSubCityKeyboardWithCancle: function() {
        return selectSubCityKeyboardWithCancle;
    },
    selectHouseType: function() {
        return selectHouseType;
    },
    cancelKeyboard: function() {
        return cancelKeyboard;
    }
});
const _grammy = require("grammy");
const _constants = require("../config/constants");
const selectUserTypeKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.BROKER
        },
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
    ]));
const selectSubCityKeyboardWithCancle = new _grammy.Keyboard([
    ..._constants.SUBCITIES,
    _constants.CANCEL
].map((subCity)=>[
        {
            text: subCity
        }
    ]));
const selectHouseType = new _grammy.Keyboard([
    [
        {
            text: _constants.CONDUMINUM
        },
        {
            text: _constants.APARTMENT
        }
    ],
    [
        {
            text: _constants.HOUSE
        },
        {
            text: _constants.BUILDING
        }
    ],
    [
        {
            text: _constants.OFFICE
        },
        {
            text: _constants.WARE_HOUSE
        }
    ]
]).resized(true);
const cancelKeyboard = new _grammy.Keyboard([
    [
        {
            text: _constants.CANCEL
        }
    ]
]).resized(true);
