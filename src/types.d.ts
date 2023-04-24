import { LazySessionFlavor, type Context, type SessionFlavor } from "grammy";
import {
  type ConversationFlavor,
  type Conversation,
} from "@grammyjs/conversations";
import { I18nFlavor } from "@grammyjs/i18n";

export interface SessionData {
  pageNumber: number;
  adminUserPageNumber: number;
  adminBrokerPageNumber: number;
  __language_code?: string;
}

export type MyContext = Context &
  SessionFlavor<SessionData> &
  I18nFlavor &
  ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
