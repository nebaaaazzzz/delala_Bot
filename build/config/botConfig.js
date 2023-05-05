// import { Bot } from "grammy";
// import { MyContext } from "../types";
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
    i18n: function() {
        return i18n;
    },
    default: function() {
        return _default;
    }
});
const _i18n = require("@grammyjs/i18n");
const _grammy = require("grammy");
const _storagetypeorm = require("@grammyjs/storage-typeorm");
const _session = require("../entity/session");
const _db = /*#__PURE__*/ _interop_require_default(require("./db"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const bot = new _grammy.Bot("5924425080:AAHCQe6j6O6W0Fn6sAWz1DHkj879VDhdOmA");
const i18n = new _i18n.I18n({
    defaultLocale: "en",
    useSession: true,
    directory: "./src/locales"
});
// Remember to register `session` middleware before
// registering middleware of the i18n instance.
bot.use((0, _grammy.session)({
    initial: ()=>{
        return {};
    },
    storage: new _storagetypeorm.TypeormAdapter({
        repository: _db.default.getRepository(_session.Session)
    })
}));
// Register i18n middleware
bot.use(i18n);
const _default = bot;
