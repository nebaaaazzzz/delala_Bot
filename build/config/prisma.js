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
    User: function() {
        return User;
    },
    House: function() {
        return House;
    },
    HouseImage: function() {
        return HouseImage;
    },
    Session: function() {
        return Session;
    }
});
const _client = require("@prisma/client");
const prisma = new _client.PrismaClient();
const { user: User , house: House , houseImage: HouseImage , session: Session  } = prisma;
