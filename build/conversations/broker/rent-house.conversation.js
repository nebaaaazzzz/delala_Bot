"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "rentHouseConversation", {
    enumerable: true,
    get: function() {
        return rentHouseConversation;
    }
});
const _inlinekeyboard = require("../../components/inline-keyboard");
const _keyboards = require("../../components/keyboards");
const _constants = require("../../config/constants");
async function rentHouseConversation(conversation, ctx) {
    let imgArray = [];
    const IMG_SIZE = 3;
    for(; imgArray.length < 3;){
        await ctx.reply(`Please share ${IMG_SIZE - imgArray.length} photos of the house`, {
            reply_markup: _keyboards.cancelKeyboard
        });
        const img = await conversation.waitFor(":photo");
        imgArray.push(img.message?.photo[0].file_id);
    }
    await ctx.reply("Select subcity of the house", {
        reply_markup: _keyboards.selectSubCityKeyboardWithCancle
    });
    const subCity = await conversation.form.select(_constants.SUBCITIES, async (ctx)=>await ctx.reply("Please select subcity of the house"));
    await ctx.reply("woreda / specific", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const woreda = await conversation.form.text();
    await ctx.reply("Area squre meter in number");
    const area = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter area in number"));
    await ctx.reply("Number of bedrooms in number", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const numberOfBedrooms = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter number of bedrooms in number"));
    await ctx.reply("number of bathrooms in number", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const numberOfBathrooms = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter number of bathrooms in number"));
    await ctx.reply("price of the house", {
        reply_markup: _keyboards.cancelKeyboard
    });
    const priceOfTheHouse = await conversation.form.number(async (ctx)=>await ctx.reply("Please enter number of bathrooms in number"));
    const messagId = await ctx.replyWithMediaGroup([
        {
            type: "photo",
            media: imgArray[0],
            parse_mode: "MarkdownV2",
            caption: `
       *Subcity : * ${subCity}
      *woreds : *  ${woreda}
      *area : *     ${area}
      *Number of bedroom : * ${numberOfBedrooms}
      *Number of bathroom : * ${numberOfBathrooms}
      *Price : * ${priceOfTheHouse}
      `
        },
        {
            type: "photo",
            media: imgArray[1]
        },
        {
            type: "photo",
            media: imgArray[2]
        }
    ]);
    await ctx.reply("confirmation to submit the house", {
        reply_markup: _inlinekeyboard.confirmHousePostInlineKeyboard
    });
    const cbData = await conversation.waitFor("callback_query:data");
    if (cbData.callbackQuery.data == _constants.SUBMIT) {
        await ctx.reply("Successfully submitted the house wait for a review", {
            reply_markup: _keyboards.brokerMainMenuKeyboard
        });
    } else {
        await ctx.reply("Submission cancled ", {
            reply_markup: _keyboards.brokerMainMenuKeyboard
        });
    }
}
