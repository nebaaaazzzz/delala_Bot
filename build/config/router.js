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
const _client = require("@prisma/client");
const _prisma = require("./prisma");
const _constants = require("./constants");
const router = new _router.Router(async (ctx)=>{
    if (ctx.from?.username == _constants.ADMIN_TELEGRAM_USERNAME) {
        return _client.UserType.ADMIN;
    }
    if (ctx.from?.id) {
        const result = await _prisma.User.findFirst({
            where: {
                telegramId: String(ctx.from?.id)
            }
        });
        if (result) {
            if (result.userType === _client.UserType.BROKER) {
                return _client.UserType.BROKER;
            } else if (result.userType === _client.UserType.HOME_SEEKER) {
                return _client.UserType.HOME_SEEKER;
            }
        } else {
            return _constants.NOT_REGISTERD;
        }
    } else {
        return _constants.NOT_REGISTERD;
    }
});
const _default = router;
