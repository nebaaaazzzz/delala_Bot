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
const _keyboards = require("../components/keyboards");
const _botConfig = require("../config/botConfig");
const _User = require("../entity/User");
async function greetingConversation(conversation, ctx) {
    await conversation.run(_botConfig.i18n);
    await ctx.reply(ctx.t("pls-share-yr-ctact"), {
        reply_markup: (0, _keyboards.getSharePhoneKeyboard)(ctx)
    });
    const contact = await conversation.waitFor(":contact");
    await ctx.reply(ctx.t("pls-snd-yr-fn"), {
        reply_markup: {
            remove_keyboard: true
        }
    });
    const fullName = await conversation.form.text();
    await _User.User.insert({
        telegramId: String(ctx.from?.id),
        telegramFirstName: ctx.from?.first_name,
        telegramLastName: ctx.from?.last_name,
        fullName,
        phoneNumber: contact.message?.contact?.phone_number,
        language: await ctx.i18n.getLocale() == "am" ? "AM" : "EN",
        userName: ctx.from?.username
    });
    await ctx.reply(ctx.t("success-registerd"), {
        reply_markup: (0, _keyboards.getUserMainMenuKeyboard)(ctx)
    });
}
