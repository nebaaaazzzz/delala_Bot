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
  await ctx.reply("please share your contact", {
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
  const fullName = await conversation.form.text(async (ctx) => {});

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
  return {
    contact,
    fullName,
    subCity,
  };
}
