import { Keyboard } from "grammy";
import {
  ABOUT_US,
  AM_LANGUAGE,
  BROKER,
  BUY_HOUSE,
  CANCEL,
  EN_LANGUAGE,
  HOME_SEEKER,
  MY_HOUSES,
  PROPERTY_TYPES,
  RENT_HOUSE,
  REQUEST_HOUSE,
  SELL_HOUSE,
  SETTING,
  SUBCITIES,
  TERMS_OF_USE,
} from "../config/constants";

export const selectUserTypeKeyboard = new Keyboard([
  [
    {
      text: BROKER,
    },
  ],
  [
    {
      text: HOME_SEEKER,
    },
  ],
])
  .oneTime(true)
  .resized(true);

export const sharePhoneKeyboard = new Keyboard([
  [
    {
      text: "Share Contact",
      request_contact: true,
    },
  ],
])
  .oneTime(true)
  .resized(true);

export const brokerMainMenuKeyboard = new Keyboard([
  [
    {
      text: SELL_HOUSE,
    },

    {
      text: RENT_HOUSE,
    },
  ],
  [
    {
      text: SETTING,
    },
    {
      text: MY_HOUSES,
    },
  ],
  [
    {
      text: ABOUT_US,
    },
    {
      text: TERMS_OF_USE,
    },
  ],
]).resized(true);
export const homeSeekerMainMenuKeyboard = new Keyboard([
  [
    {
      text: REQUEST_HOUSE,
    },
  ],
  [
    {
      text: SETTING,
    },
    {
      text: ABOUT_US,
    },
  ],
  [
    {
      text: TERMS_OF_USE,
    },
  ],
]).resized(true);
export const selectSubCityKeyboard = new Keyboard(
  SUBCITIES.map((subCity) => [{ text: subCity }])
);
export const selectSubCityKeyboardWithCancle = new Keyboard(
  [...SUBCITIES, CANCEL].map((subCity) => [{ text: subCity }])
);
export const selectPropertyKeyboardWithCancle = new Keyboard(
  [...PROPERTY_TYPES, CANCEL].map((subCity) => [{ text: subCity }])
);
export const selectRequestTypeKeyboardWithCancel = new Keyboard(
  [RENT_HOUSE, BUY_HOUSE, CANCEL].map((type) => [{ text: type }])
).resized(true);
export const cancelKeyboard = new Keyboard([
  [
    {
      text: CANCEL,
    },
  ],
]).resized(true);

export const selectLanguageKeyboard = new Keyboard([
  [
    {
      text: EN_LANGUAGE,
    },
  ],
  [
    {
      text: AM_LANGUAGE,
    },
  ],
]).resized();
