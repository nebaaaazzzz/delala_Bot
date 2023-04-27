import { HousePostType } from "@prisma/client";
import { MyContext, MyConversation } from "../../types";
import { housePostConversation } from "./housePost.conversation";
export async function houseSellPostConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await housePostConversation(conversation, ctx, HousePostType.SALE);
}
