// import { Bot } from "grammy";
// import { MyContext } from "../types";

import { I18n, I18nFlavor } from "@grammyjs/i18n";
import { PrismaAdapter } from "@grammyjs/storage-prisma";
import { Bot, Context, SessionFlavor, session } from "grammy";
import { Session } from "./db";
import { ConversationFlavor } from "@grammyjs/conversations";
import { MyContext } from "../types";

// const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);

interface SessionData {
  __language_code?: string;
}

const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);

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
    storage: new PrismaAdapter(Session),
  })
);

// Register i18n middleware
bot.use(i18n);

export default bot;
