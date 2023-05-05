"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "HouseRequest", {
    enumerable: true,
    get: function() {
        return HouseRequest;
    }
});
const _typeorm = require("typeorm");
const _User = require("./User");
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
let HouseRequest = class HouseRequest extends _typeorm.BaseEntity {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "subCity", void 0);
        _define_property(this, "propertyType", void 0);
        _define_property(this, "numberOfBedrooms", void 0);
        _define_property(this, "houseRequestType", void 0);
        _define_property(this, "user", void 0);
        _define_property(this, "createdAt", void 0 // Creation date
        );
        _define_property(this, "updatedAt", void 0);
    }
};
__decorate([
    (0, _typeorm.PrimaryGeneratedColumn)()
], HouseRequest.prototype, "id", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], HouseRequest.prototype, "subCity", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], HouseRequest.prototype, "propertyType", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "int"
    })
], HouseRequest.prototype, "numberOfBedrooms", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    })
], HouseRequest.prototype, "houseRequestType", void 0);
__decorate([
    (0, _typeorm.ManyToOne)(()=>_User.User, (user)=>user.houseRequests)
], HouseRequest.prototype, "user", void 0);
__decorate([
    (0, _typeorm.CreateDateColumn)()
], HouseRequest.prototype, "createdAt", void 0);
__decorate([
    (0, _typeorm.UpdateDateColumn)()
], HouseRequest.prototype, "updatedAt", void 0);
HouseRequest = __decorate([
    (0, _typeorm.Entity)()
], HouseRequest);
