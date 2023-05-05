"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "houseSellPostConversation", {
    enumerable: true,
    get: function() {
        return houseSellPostConversation;
    }
});
const _housePostconversation = require("./housePost.conversation");
async function houseSellPostConversation(conversation, ctx) {
    await (0, _housePostconversation.housePostConversation)(conversation, ctx, "SALE");
}
