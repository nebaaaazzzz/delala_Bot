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
const _keyboards = require("../components/keyboards");
const _constants = require("../config/constants");
const _prisma = require("../config/prisma");
const _brokerregistrationconversation = /*#__PURE__*/ _interop_require_default(require("./broker/broker-registration.conversation"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function greetingConversation(conversation, ctx) {
    await ctx.reply(`Welcome! /  እንኳን ደና መጡ  ${ctx?.from?.first_name}`);
    await ctx.reply("Select language / ቋንቋ ይምረጡ ", {
        reply_markup: _keyboards.selectLanguageKeyboard
    });
    const language = await conversation.form.select([
        _constants.EN_LANGUAGE,
        _constants.AM_LANGUAGE
    ]); //TODO add regex to limit worde l
    await ctx.i18n.setLocale(language == _constants.AM_LANGUAGE ? "am" : "en");
    await ctx.reply(ctx.t("pick-acct-type"), {
        reply_markup: (0, _keyboards.getSelectUserTypeKeyboard)(ctx)
    });
    const userType = await conversation.form.select([
        ctx.t("BROKER"),
        ctx.t("HOME_SEEKER")
    ]);
    if (userType == ctx.t("BROKER")) {
        const { contact , fullName , subCity  } = await (0, _brokerregistrationconversation.default)(conversation, ctx);
        await _prisma.User.create({
            data: {
                telegramId: String(ctx.from?.id),
                userType: _client.UserType.BROKER,
                telegramFirstName: ctx.from?.first_name,
                telegramLastName: ctx.from?.last_name,
                fullName,
                subCity,
                phoneNumber: contact.message?.contact?.phone_number,
                language: language == _constants.AM_LANGUAGE ? _client.Language.AM : _client.Language.EN,
                userName: ctx.from?.username
            }
        });
        await ctx.reply(ctx.t("success-registerd"), {
            reply_markup: (0, _keyboards.getBrokerMainMenuKeyboard)(ctx)
        });
    } else {
        await ctx.reply(ctx.t("pls-share-yr-ctact"), {
            reply_markup: (0, _keyboards.getSharePhoneKeyboard)(ctx)
        });
        const contact = await conversation.waitFor(":contact");
        await _prisma.User.create({
            data: {
                telegramId: String(ctx.from?.id),
                telegramFirstName: ctx.from?.first_name,
                telegramLastName: ctx.from?.last_name,
                phoneNumber: contact.message?.contact?.phone_number,
                language: language,
                userType: _client.UserType.HOME_SEEKER,
                userName: ctx.from?.username
            }
        });
        await ctx.reply(ctx.t("success-registerd"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
        });
    }
}
