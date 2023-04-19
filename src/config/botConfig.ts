import { Bot } from "grammy";
import { MyContext } from "../types";

const bot = new Bot<MyContext>(process.env.TELEGRAM_TOKEN);
export default bot;
