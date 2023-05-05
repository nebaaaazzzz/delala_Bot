import { MyContext, MyConversation } from "../../types";
import { housePostConversation } from "./housePost.conversation";

export async function houseRentPostConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await housePostConversation(conversation, ctx, "RENT");
}
