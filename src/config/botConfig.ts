// import { Bot } from "grammy";
// import { MyContext } from "../types";

import { I18n, I18nFlavor } from "@grammyjs/i18n";
import { Bot, Context, SessionFlavor, session } from "grammy";
import { ConversationFlavor } from "@grammyjs/conversations";
import { MyContext } from "../types";
import { TypeormAdapter } from "@grammyjs/storage-typeorm";
import { getRepository } from "typeorm";
import { Session } from "../entity/session";
import dataSource from "./db";

// const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);

interface SessionData {
  __language_code?: string;
}

const bot = new Bot<MyContext>(
  ""
);

export const i18n = new I18n<MyContext>({
  defaultLocale: "en",
  useSession: true, // whether to store user language in session
  directory: "./src/locales", // Load all translation files from locales/.
});

// Remember to register `session` middleware before
// registering middleware of the i18n instance.
bot.use(
  session<SessionData, MyContext>({
    initial: () => {
      return {};
    },
    storage: new TypeormAdapter({
      repository: dataSource.getRepository(Session),
    }),
  })
);

// Register i18n middleware
bot.use(i18n);

export default bot;
