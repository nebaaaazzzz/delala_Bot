import {
  brokerMainMenuKeyboard,
  sharePhoneKeyboard,
} from "../components/keyboards";
import { SUBCITIES } from "../config/constants";
import { MyContext, MyConversation } from "../types";

export default async function brokerRegistration(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply("please share your context", {
    reply_markup: sharePhoneKeyboard,
  });
  const contact = await conversation.waitFor(":contact", {
    otherwise: () => {
      ctx.reply("please share your contact");
    },
  });
  await ctx.reply("Please send you full name", {
    reply_markup: {
      remove_keyboard: true,
    },
  });
  const name = await conversation.waitFor(":text", {
    otherwise: () => {
      ctx.reply("please send your name");
    },
  });

  await ctx.reply("choose sub city", {
    reply_markup: {
      keyboard: SUBCITIES.map((subCity) => [{ text: subCity }]),
    },
  });
  const subCity = await conversation.form.select(SUBCITIES, async (ctx) =>
    ctx.reply("choose sub city", {
      reply_markup: {
        keyboard: SUBCITIES.map((subCity) => [{ text: subCity }]),
      },
    })
  );
  await ctx.reply("successfuly registerd", {
    reply_markup: brokerMainMenuKeyboard,
  });
}
