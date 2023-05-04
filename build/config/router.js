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
const _router = require("@grammyjs/router");
const _prisma = require("./prisma");
const _constants = require("./constants");
const router = new _router.Router(async (ctx)=>{
    if (ctx.from?.username == _constants.ADMIN_TELEGRAM_USERNAME) {
        return _constants.ADMIN;
    }
    if (ctx.from?.id) {
        const result = await _prisma.User.findFirst({
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        if (result) {
            return _constants.REGISTERED;
        } else {
            return _constants.NOT_REGISTERED;
        }
    } else {
        return _constants.NOT_REGISTERED;
    }
});
const _default = router;
