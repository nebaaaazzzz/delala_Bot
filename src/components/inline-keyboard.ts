import { InlineKeyboard } from "grammy";
import { CANCEL, SUBMIT } from "../config/constants";
import { MyContext } from "../types";

export function getConfirmHousePostInlineKeyboard(ctx: MyContext) {
  return new InlineKeyboard([
    [
      {
        text: ctx.t("EDIT"),
        callback_data: CANCEL,
      },
      {
        text: ctx.t("SUBMIT"),
        callback_data: SUBMIT,
      },
    ],
  ]).inline_keyboard;
}
