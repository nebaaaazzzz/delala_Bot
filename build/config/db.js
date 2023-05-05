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
const _typeorm = require("typeorm");
const _House = require("../entity/House");
const _User = require("../entity/User");
const _HouseImage = require("../entity/HouseImage");
const _HouseRequest = require("../entity/HouseRequest");
const _session = require("../entity/session");
const AppDataSource = new _typeorm.DataSource({
    url: process.env.DATABASE_URL,
    type: "mysql",
    // host: "localhost",
    // port: 3306,
    // username: "root",
    // password: "",
    database: "delala",
    synchronize: true,
    logging: true,
    entities: [
        _House.House,
        _User.User,
        _HouseImage.HouseImage,
        _HouseRequest.HouseRequest,
        _session.Session
    ],
    subscribers: [],
    migrations: []
});
const _default = AppDataSource;
