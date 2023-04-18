import { Keyboard } from "grammy";
import {
  ABOUT_US,
  APARTMENT,
  BROKER,
  BUILDING,
  CANCEL,
  CONDUMINUM,
  HOME_SEEKER,
  HOUSE,
  OFFICE,
  RENT_HOUSE,
  SELL_HOUSE,
  SETTING,
  SUBCITIES,
  TERMS_OF_USE,
  WARE_HOUSE,
} from "../config/constants";
export const selectUserTypeKeyboard = new Keyboard([
  [
    {
      text: BROKER,
    },
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
export const selectHouseType = new Keyboard([
  [
    {
      text: CONDUMINUM,
    },
    {
      text: APARTMENT,
    },
  ],
  [
    {
      text: HOUSE,
    },
    {
      text: BUILDING,
    },
  ],
  [
    {
      text: OFFICE,
    },
    {
      text: WARE_HOUSE,
    },
  ],
]).resized(true);
export const cancelKeyboard = new Keyboard([
  [
    {
      text: CANCEL,
    },
  ],
]).resized(true);
