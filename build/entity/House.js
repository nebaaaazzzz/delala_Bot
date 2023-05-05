"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "House", {
    enumerable: true,
    get: function() {
        return House;
    }
});
const _typeorm = require("typeorm");
const _User = require("./User");
const _HouseImage = require("./HouseImage");
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
let House = class House extends _typeorm.BaseEntity {
    constructor(...args){
        super(...args);
        _define_property(this, "id", void 0);
        _define_property(this, "subCity", void 0);
        _define_property(this, "woredaOrSpecificPlace", void 0);
        _define_property(this, "propertyType", void 0);
        _define_property(this, "numberOfBedrooms", void 0);
        _define_property(this, "numberOfBathrooms", void 0);
        _define_property(this, "housePostType", void 0);
        _define_property(this, "price", void 0);
        _define_property(this, "area", void 0);
        _define_property(this, "status", void 0);
        _define_property(this, "user", void 0);
        _define_property(this, "houseImages", void 0);
        _define_property(this, "createdAt", void 0 // Creation date
        );
        _define_property(this, "updatedAt", void 0);
    }
};
__decorate([
    (0, _typeorm.PrimaryGeneratedColumn)()
], House.prototype, "id", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], House.prototype, "subCity", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], House.prototype, "woredaOrSpecificPlace", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], House.prototype, "propertyType", void 0);
__decorate([
    (0, _typeorm.Column)("int")
], House.prototype, "numberOfBedrooms", void 0);
__decorate([
    (0, _typeorm.Column)("int")
], House.prototype, "numberOfBathrooms", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "varchar"
    })
], House.prototype, "housePostType", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "float"
    })
], House.prototype, "price", void 0);
__decorate([
    (0, _typeorm.Column)("varchar")
], House.prototype, "area", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "varchar",
        default: "PENDING"
    })
], House.prototype, "status", void 0);
__decorate([
    (0, _typeorm.ManyToOne)(()=>_User.User, (user)=>user.houses)
], House.prototype, "user", void 0);
__decorate([
    (0, _typeorm.OneToMany)(()=>_HouseImage.HouseImage, (houseImage)=>houseImage.house)
], House.prototype, "houseImages", void 0);
__decorate([
    (0, _typeorm.CreateDateColumn)()
], House.prototype, "createdAt", void 0);
__decorate([
    (0, _typeorm.UpdateDateColumn)()
], House.prototype, "updatedAt", void 0);
House = __decorate([
    (0, _typeorm.Entity)()
], House);
