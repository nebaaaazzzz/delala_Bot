"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "houseRentPostConversation", {
    enumerable: true,
    get: function() {
        return houseRentPostConversation;
    }
});
const _housePostconversation = require("./housePost.conversation");
async function houseRentPostConversation(conversation, ctx) {
    await (0, _housePostconversation.housePostConversation)(conversation, ctx, "RENT");
}
