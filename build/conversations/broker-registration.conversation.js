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
const subCities = [
    "Addis",
    "Akaky",
    "Arada",
    "Bole",
    "Gullele",
    "Kirkos",
    "Kolfe",
    "Lideta",
    "Nifas Silk-Lafto",
    "Yeka"
];
async function brokerRegistration(conversation, ctx) {
    await ctx.reply("please share your context", {
        reply_markup: {
            resize_keyboard: true,
            one_time_keyboard: true,
            keyboard: [
                [
                    {
                        text: "Share Context",
                        request_contact: true
                    }
                ]
            ]
        }
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
    const name = await conversation.waitFor(":text", {
        otherwise: ()=>{
            ctx.reply("please send your name");
        }
    });
    await ctx.reply("choose sub city", {
        reply_markup: {
            keyboard: subCities.map((subCity)=>[
                    {
                        text: subCity
                    }
                ])
        }
    });
    const subCity = await conversation.form.select(subCities, async (ctx)=>ctx.reply("choose sub city", {
            reply_markup: {
                keyboard: subCities.map((subCity)=>[
                        {
                            text: subCity
                        }
                    ])
            }
        }));
    await ctx.reply("successfuly registerd", {
        reply_markup: {
            remove_keyboard: true
        }
    });
}
