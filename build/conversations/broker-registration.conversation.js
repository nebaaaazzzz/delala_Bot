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
const _keyboards = require("../components/keyboards");
const _constants = require("../config/constants");
async function brokerRegistration(conversation, ctx) {
    await ctx.reply("please share your contact", {
        reply_markup: _keyboards.sharePhoneKeyboard
    });
    const contact = await conversation.waitFor(":contact", {
        otherwise: ()=>{
            ctx.reply("please share your contact");
        }
    });
    await ctx.reply("Please send you full name", {
        reply_markup: {
            remove_keyboard: true
        }
    });
    const fullName = await conversation.form.text(async (ctx)=>{});
    await ctx.reply("choose sub city", {
        reply_markup: {
            keyboard: _constants.SUBCITIES.map((subCity)=>[
                    {
                        text: subCity
                    }
                ])
        }
    });
    const subCity = await conversation.form.select(_constants.SUBCITIES, async (ctx)=>ctx.reply("choose sub city", {
            reply_markup: {
                keyboard: _constants.SUBCITIES.map((subCity)=>[
                        {
                            text: subCity
                        }
                    ])
            }
        }));
    return {
        contact,
        fullName,
        subCity
    };
}
