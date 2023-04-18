import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";
export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;
