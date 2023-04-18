import { confirmHousePostInlineKeyboard } from "../../components/inline-keyboard";
import {
  brokerMainMenuKeyboard,
  cancelKeyboard,
  selectSubCityKeyboardWithCancle,
} from "../../components/keyboards";
import { SUBCITIES, SUBMIT } from "../../config/constants";
import { MyContext, MyConversation } from "../../types";

export async function rentHouseConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  let imgArray = [];
  const IMG_SIZE = 3;
  for (; imgArray.length < 3; ) {
    await ctx.reply(
      `Please share ${IMG_SIZE - imgArray.length} photos of the house`,
      {
        reply_markup: cancelKeyboard,
      }
    );
    const img = await conversation.waitFor(":photo");
    imgArray.push(img.message?.photo[0].file_id);
  }
  await ctx.reply("Select subcity of the house", {
    reply_markup: selectSubCityKeyboardWithCancle,
  });
  const subCity = await conversation.form.select(
    SUBCITIES,
    async (ctx) => await ctx.reply("Please select subcity of the house")
  );
  await ctx.reply("woreda / specific", {
    reply_markup: cancelKeyboard,
  });
  const woreda = await conversation.form.text();

  await ctx.reply("Area squre meter in number");
  const area = await conversation.form.number(
    async (ctx) => await ctx.reply("Please enter area in number")
  );
  await ctx.reply("Number of bedrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBedrooms = await conversation.form.number(
    async (ctx) => await ctx.reply("Please enter number of bedrooms in number")
  );
  await ctx.reply("number of bathrooms in number", {
    reply_markup: cancelKeyboard,
  });
  const numberOfBathrooms = await conversation.form.number(
    async (ctx) => await ctx.reply("Please enter number of bathrooms in number")
  );
  await ctx.reply("price of the house", {
    reply_markup: cancelKeyboard,
  });
  const priceOfTheHouse = await conversation.form.number(
    async (ctx) => await ctx.reply("Please enter number of bathrooms in number")
  );
  const messagId = await ctx.replyWithMediaGroup([
    {
      type: "photo",
      media: imgArray[0] as string,
      parse_mode: "MarkdownV2",
      caption: `
       *Subcity : * ${subCity}
      *woreds : *  ${woreda}
      *area : *     ${area}
      *Number of bedroom : * ${numberOfBedrooms}
      *Number of bathroom : * ${numberOfBathrooms}
      *Price : * ${priceOfTheHouse}
      `,
    },
    {
      type: "photo",
      media: imgArray[1] as string,
    },
    {
      type: "photo",
      media: imgArray[2] as string,
    },
  ]);
  await ctx.reply("confirmation to submit the house", {
    reply_markup: confirmHousePostInlineKeyboard,
  });
  const cbData = await conversation.waitFor("callback_query:data");
  if (cbData.callbackQuery.data == SUBMIT) {
    await ctx.reply("Successfully submitted the house wait for a review", {
      reply_markup: brokerMainMenuKeyboard,
    });
  } else {
    await ctx.reply("Submission cancled ", {
      reply_markup: brokerMainMenuKeyboard,
    });
  }
}
