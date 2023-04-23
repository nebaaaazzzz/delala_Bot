import { type Context, type LazySessionFlavor } from "grammy";
import {
  type ConversationFlavor,
  type Conversation,
} from "@grammyjs/conversations";
import { I18nFlavor } from "@grammyjs/i18n";

export interface SessionData {
  pageNumber: number;
  adminUserPageNumber: number;
  adminBrokerPageNumber: number;
  __language_code: string;
}

type MyContext = Context &
  ConversationFlavor &
  LazySessionFlavor<SessionData> &
  I18nFlavor;
type MyConversation = Conversation<MyContext>;
