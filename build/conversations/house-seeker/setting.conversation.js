"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "settingConversation", {
    enumerable: true,
    get: function() {
        return settingConversation;
    }
});
const _keyboards = require("../../components/keyboards");
const _constants = require("../../config/constants");
const _User = require("../../entity/User");
async function handleCancelFromCtx(ctx) {
    if (ctx.message?.text == ctx.t("CANCEL")) {
        await ctx.reply(ctx.t("mm"), {
            reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
        });
        return await ctx.conversation.exit();
    }
}
async function settingConversation(conversation, ctx) {
    await ctx.reply(ctx.t("SETTING"), {
        reply_markup: _keyboards.selectLanguageKeyboard
    });
    const lang = await conversation.form.select([
        _constants.EN_LANGUAGE,
        _constants.AM_LANGUAGE
    ]);
    await ctx.i18n.setLocale(lang == _constants.EN_LANGUAGE ? "en" : "am");
    await _User.User.update({
        telegramId: String(ctx.from?.id)
    }, {
        language: _constants.AM_LANGUAGE == lang ? "AM" : "EN"
    });
    await ctx.reply(ctx.t("success-lang-chng"), {
        reply_markup: (0, _keyboards.getHomeSeekerMainMenuKeyboard)(ctx)
    });
    return;
}
