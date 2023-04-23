import {
  getSelectSubCityKeyboard,
  getSharePhoneKeyboard,
} from "../../components/keyboards";
import { MyContext, MyConversation } from "../../types";

export default async function brokerRegistration(
  conversation: MyConversation,
  ctx: MyContext
) {
  await ctx.reply(ctx.t("pls-share-yr-ctact"), {
    reply_markup: getSharePhoneKeyboard(ctx),
  });
  const contact = await conversation.waitFor(":contact");
  await ctx.reply(ctx.t("pls-snd-yr-fn"), {
    reply_markup: {
      remove_keyboard: true,
    },
  });
  const fullName = await conversation.form.text();

  await ctx.reply(ctx.t("chse-sub-city"), {
    reply_markup: getSelectSubCityKeyboard(ctx),
  });
  const subCity = await conversation.form.select(
    JSON.parse(ctx.t("SUBCITIES"))
  );
  return {
    contact,
    fullName,
    subCity,
  };
}
