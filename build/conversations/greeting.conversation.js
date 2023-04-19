"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return greetingConversation;
    }
});
const _client = require("@prisma/client");
const _inlinekeyboard = require("../components/inline-keyboard");
const _keyboards = require("../components/keyboards");
const _constants = require("../config/constants");
const _prisma = require("../config/prisma");
const _brokerregistrationconversation = /*#__PURE__*/ _interop_require_default(require("./broker-registration.conversation"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function greetingConversation(conversation, ctx) {
    await ctx.reply(`Welcome! ${ctx?.from?.first_name}`);
    let message = await ctx.reply("Select language", {
        reply_markup: _inlinekeyboard.selectLanguageInlineKeyboard
    });
    const { callbackQuery  } = await conversation.waitFor("callback_query:data", {
        otherwise: ()=>{
            ctx.reply("please select language");
        }
    }); //TODO add regex to limit worde l
    const language = callbackQuery.data;
    if (language === _constants.EN_LANGUAGE) {
        await ctx.reply("You selected English", {
            reply_markup: _keyboards.selectUserTypeKeyboard
        });
    } else {
        await ctx.reply("You selected Amharic", {
            reply_markup: _keyboards.selectUserTypeKeyboard
        });
    }
    const userType = await conversation.form.select([
        _client.UserType.BROKER,
        _constants.HOME_SEEKER
    ], async (ctx)=>ctx.reply("Select One of", {
            reply_markup: _keyboards.selectUserTypeKeyboard
        }));
    if (userType == _client.UserType.BROKER) {
        const { contact , fullName , subCity  } = await (0, _brokerregistrationconversation.default)(conversation, ctx);
        await _prisma.User.create({
            data: {
                telegramId: String(ctx.from?.id),
                userType: _client.UserType.BROKER,
                firstName: ctx.from?.first_name,
                lastName: ctx.from?.last_name,
                phoneNumber: contact.message?.contact?.phone_number,
                language: language,
                userName: ctx.from?.username
            }
        });
        await ctx.reply("successfuly registerd", {
            reply_markup: _keyboards.brokerMainMenuKeyboard
        });
    } else {}
}
