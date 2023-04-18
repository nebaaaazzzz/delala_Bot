import { InlineKeyboard } from "grammy";
import { AM_LANGUAGE, CANCEL, EN_LANGUAGE, SUBMIT } from "../config/constants";

export const selectLanguageInlineKeyboard = new InlineKeyboard([
  [
    {
      text: "English",
      callback_data: EN_LANGUAGE,
    },
    {
      text: "Amharic",
      callback_data: AM_LANGUAGE,
    },
  ],
]);
export const confirmHousePostInlineKeyboard = new InlineKeyboard([
  [
    {
      text: "Cancel",
      callback_data: CANCEL,
    },
    {
      text: "Submit",
      callback_data: SUBMIT,
    },
  ],
]);
