"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Session", {
    enumerable: true,
    get: function() {
        return Session;
    }
});
const _typeorm = require("typeorm");
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
let Session = class Session {
    constructor(){
        _define_property(this, "id", void 0);
        _define_property(this, "key", void 0);
        _define_property(this, "value", void 0);
    }
};
__decorate([
    (0, _typeorm.PrimaryGeneratedColumn)()
], Session.prototype, "id", void 0);
__decorate([
    (0, _typeorm.Column)({
        unique: true,
        type: "varchar"
    })
], Session.prototype, "key", void 0);
__decorate([
    (0, _typeorm.Column)({
        type: "longtext"
    })
], Session.prototype, "value", void 0);
Session = __decorate([
    (0, _typeorm.Entity)()
], Session);
