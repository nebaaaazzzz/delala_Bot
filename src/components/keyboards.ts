import { Keyboard } from "grammy";
import {
  AM_LANGUAGE,
  BROKERS,
  EN_LANGUAGE,
  HOME_SEEKERS,
  HOUSES,
} from "../config/constants";
import { MyContext } from "../types";

export function getSelectUserTypeKeyboard(ctx: MyContext) {
  return new Keyboard([
    [
      {
        text: ctx.t("BROKER"),
      },
    ],
    [
      {
        text: ctx.t("HOME_SEEKER"),
      },
    ],
  ])
    .oneTime(true)
    .resized(true);
}
export function getSharePhoneKeyboard(ctx: MyContext) {
  return new Keyboard([
    [
      {
        text: ctx.t("pls-share-yr-ctact"),
        request_contact: true,
      },
    ],
  ])
    .oneTime(true)
    .resized(true);
}
export function getUserMainMenuKeyboard(ctx: MyContext) {
  return new Keyboard([
    [
      {
        text: ctx.t("BROKER"),
      },
      {
        text: ctx.t("HOME_SEEKER"),
      },
    ],
    [
      {
        text: ctx.t("SETTING"),
      },
    ],
    [
      {
        text: ctx.t("ABOUT_US"),
      },
      {
        text: ctx.t("TERMS_OF_USE"),
      },
    ],
  ]).resized(true);
}
export function getBrokerMainMenuKeyboard(ctx: MyContext) {
  return new Keyboard([
    [
      {
        text: ctx.t("SELL_HOUSE"),
      },
      {
        text: ctx.t("RENT_HOUSE"),
      },
    ],
    [
      {
        text: ctx.t("MY_HOUSES"),
      },
      {
        text: ctx.t("back"),
      },
    ],
  ]).resized(true);
}
export function getHomeSeekerMainMenuKeyboard(ctx: MyContext) {
  return new Keyboard([
    [
      {
        text: ctx.t("REQUEST_HOUSE"),
      },
    ],
    [
      {
        text: ctx.t("back"),
      },
    ],
  ]).resized(true);
}
export function getSettingsKeyboard(ctx: MyContext) {
  return new Keyboard([
    [{ text: ctx.t("cng_lang") }],
    [
      {
        text: ctx.t("back"),
      },
    ],
  ]).resized(true);
}
export function getSelectSubCityKeyboard(ctx: MyContext) {
  return new Keyboard(
    [...JSON.parse(ctx.t("SUBCITIES"))].map((subCity) => [{ text: subCity }])
  ).resized(true);
}
export function getSelectSubCityKeyboardWithCancel(ctx: MyContext) {
  return new Keyboard(
    [...JSON.parse(ctx.t("SUBCITIES")), ctx.t("CANCEL")].map((subCity) => [
      { text: subCity },
    ])
  ).resized(true);
}
export function getSelectPropertyTypeKeyboardWithCancel(ctx: MyContext) {
  return new Keyboard(
    [...JSON.parse(ctx.t("PROPERTY_TYPES")), ctx.t("CANCEL")].map(
      (property) => [{ text: property }]
    )
  ).resized(true);
}
export function getSelectRequestTypeKeyboardWithCancel(ctx: MyContext) {
  return new Keyboard(
    [ctx.t("RENT_HOUSE"), ctx.t("BUY_HOUSE"), ctx.t("CANCEL")].map((type) => [
      { text: type },
    ])
  ).resized(true);
}
export function getCancelKeyboard(ctx: MyContext) {
  return new Keyboard([[{ text: ctx.t("CANCEL") }]]).resized(true);
}
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
]).resized(true);
export const adminKeyboard = new Keyboard([
  [
    {
      text: BROKERS,
    },
  ],
  [
    {
      text: HOME_SEEKERS,
    },
  ],
  [
    {
      text: HOUSES,
    },
  ],
]).resized(true);
