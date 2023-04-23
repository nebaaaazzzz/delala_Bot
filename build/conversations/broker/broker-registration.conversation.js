"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return brokerRegistration;
    }
});
const _keyboards = require("../../components/keyboards");
async function brokerRegistration(conversation, ctx) {
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
    await ctx.reply(ctx.t("chse-sub-city"), {
        reply_markup: (0, _keyboards.getSelectSubCityKeyboard)(ctx)
    });
    const subCity = await conversation.form.select(JSON.parse(ctx.t("SUBCITIES")));
    return {
        contact,
        fullName,
        subCity
    };
}
