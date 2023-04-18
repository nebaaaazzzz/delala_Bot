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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const conversations_1 = require("@grammyjs/conversations");
const dotenv_1 = __importDefault(require("dotenv"));
const greeting_conversation_1 = __importDefault(require("./conversations/greeting.conversation"));
dotenv_1.default.config();
// swc ./src -d build
const bot = new grammy_1.Bot(process.env.TELEGRAM_TOKEN);
bot.use((0, grammy_1.session)({ initial: () => ({}) }));
bot.use((0, conversations_1.conversations)());
bot.use((0, conversations_1.createConversation)(greeting_conversation_1.default));
bot.command("start", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    // enter the function "greeting" you declared
    yield ctx.conversation.enter("greetingConversation");
}));
bot.start({
    onStart(botInfo) {
        console.log("Started on :", botInfo.username);
    },
});
