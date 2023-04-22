import { HousePostType } from "@prisma/client";
import { MyContext, MyConversation } from "../../types";
import { housePostConversation } from "./housePost.conversation";

// async function handleCancel(text:string){
//   if (text == CANCEL) {
//     await ctx.reply("Canceled");
//     await ctx.reply("Main menu", {
//       reply_markup: brokerMainMenuKeyboard,
//     });
//     return await ctx.conversation.exit();
//   }
// }
export async function houseRentPostConversation(
  conversation: MyConversation,
  ctx: MyContext
) {
  await housePostConversation(conversation, ctx, HousePostType.RENT);
}
