import { type Context, type LazySessionFlavor } from "grammy";
import {
  type ConversationFlavor,
  type Conversation,
} from "@grammyjs/conversations";

interface SessionData {
  pageNumber: number;
}

type MyContext = Context & ConversationFlavor & LazySessionFlavor<SessionData>;
type MyConversation = Conversation<MyContext>;
