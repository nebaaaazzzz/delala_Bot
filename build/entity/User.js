"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "User", {
    enumerable: true,
    get: function() {
        return User;
    }
});
const _typeorm = require("typeorm");
const _House = require("./House");
const _HouseRequest = require("./HouseRequest");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var __decorate = (void 0) && (void 0).__decorate || function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let User = class User extends _typeorm.BaseEntity {
    constructor(...args){
        super(...args);
        _define_property(this, "telegramId", void 0);
        _define_property(this, "telegramFirstName", void 0);
        _define_property(this, "telegramLastName", void 0);
        _define_property(this, "fullName", void 0);
        _define_property(this, "language", void 0);
        _define_property(this, "phoneNumber", void 0);
        _define_property(this, "userName", void 0);
        _define_property(this, "houses", void 0);
        _define_property(this, "houseRequests", void 0);
        _define_property(this, "createdAt", void 0 // Creation date
        );
        _define_property(this, "updatedAt", void 0);
    }
};
__decorate([
    (0, _typeorm.PrimaryColumn)("varchar")
], User.prototype, "telegramId", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        default: ""
    })
], User.prototype, "telegramFirstName", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        default: ""
    })
], User.prototype, "telegramLastName", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], User.prototype, "fullName", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    })
], User.prototype, "language", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        default: ""
    })
], User.prototype, "userName", void 0);
__decorate([
    (0, _typeorm.OneToMany)(()=>_House.House, (house)=>house.user)
], User.prototype, "houses", void 0);
__decorate([
    (0, _typeorm.OneToMany)(()=>_HouseRequest.HouseRequest, (houseRequest)=>houseRequest.user)
], User.prototype, "houseRequests", void 0);
__decorate([
    (0, _typeorm.CreateDateColumn)()
], User.prototype, "createdAt", void 0);
__decorate([
    (0, _typeorm.UpdateDateColumn)()
], User.prototype, "updatedAt", void 0);
User = __decorate([
    (0, _typeorm.Entity)()
], User);
