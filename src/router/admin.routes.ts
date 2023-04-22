import { ADMIN_TELEGRAM_ID } from "../config/constants";
import { approveHouse, rejectHouse } from "../handler/admin/house-approval";
import { MyContext } from "../types";
import { Composer } from "grammy";

export default function (adminRouter: Composer<MyContext>) {
  adminRouter.callbackQuery(/^(\/house\/approve\/.+)/gi, approveHouse);
  adminRouter.callbackQuery(/^(\/house\/reject\/.+)/gi, rejectHouse);
  adminRouter.command("start", async (ctx) => {
    ctx.api.sendMessage(ADMIN_TELEGRAM_ID, "Admin");
  });
}
