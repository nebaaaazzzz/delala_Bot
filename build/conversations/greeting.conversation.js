"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function greetingConversation(conversation, ctx) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        yield ctx.reply(`Welcome! ${(_a = ctx === null || ctx === void 0 ? void 0 : ctx.from) === null || _a === void 0 ? void 0 : _a.first_name}`);
        let message = yield ctx.reply("Select language", {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "English",
                            callback_data: "en",
                        },
                        {
                            text: "Amharic",
                            callback_data: "am",
                        },
                    ],
                ],
            },
        });
        const { callbackQuery } = yield conversation.waitFor("callback_query:data"); //TODO add regex to limit worde l
        if (callbackQuery.data === "en") {
            yield ctx.reply("You selected English");
        }
        else {
            yield ctx.reply("You selected Amharic");
        }
    });
}
exports.default = greetingConversation;
