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
const _brokerregistrationconversation = /*#__PURE__*/ _interop_require_default(require("./broker-registration.conversation"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const EN_LANGUAGE = "en";
const AM_LANGUAGE = "am";
const BROKER = "Broker";
const HOME_SEEKER = "Home Seeker";
const LANGUAGES = [
    EN_LANGUAGE,
    AM_LANGUAGE
];
const USERS = [
    BROKER,
    HOME_SEEKER
];
async function greetingConversation(conversation, ctx) {
    await ctx.reply(`Welcome! ${ctx?.from?.first_name}`);
    let message = await ctx.reply("Select language", {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: "English",
                        callback_data: EN_LANGUAGE
                    },
                    {
                        text: "Amharic",
                        callback_data: AM_LANGUAGE
                    }
                ]
            ]
        }
    });
    const { callbackQuery  } = await conversation.waitFor("callback_query:data", {
        otherwise: ()=>{
            ctx.reply("please select language");
        }
    }); //TODO add regex to limit worde l
    if (callbackQuery.data === EN_LANGUAGE) {
        await ctx.reply("You selected English", {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [
                        {
                            text: BROKER
                        },
                        {
                            text: HOME_SEEKER
                        }
                    ]
                ]
            }
        });
    } else {
        await ctx.reply("You selected Amharic", {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [
                        {
                            text: BROKER
                        },
                        {
                            text: HOME_SEEKER
                        }
                    ]
                ]
            }
        });
    }
    const d = await conversation.form.select([
        BROKER,
        HOME_SEEKER
    ], async (ctx)=>ctx.reply("Select One of", {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: [
                    [
                        {
                            text: BROKER
                        },
                        {
                            text: HOME_SEEKER
                        }
                    ]
                ]
            }
        }));
    if (d == BROKER) {
        await (0, _brokerregistrationconversation.default)(conversation, ctx);
    } else {}
    console.log(d);
}
