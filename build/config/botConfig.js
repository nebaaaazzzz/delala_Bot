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
const _grammy = require("grammy");
const bot = new _grammy.Bot(process.env.TELEGRAM_TOKEN);
const _default = bot;
