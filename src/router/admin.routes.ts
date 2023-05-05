import {
  ADMIN_TELEGRAM_ID,
  BROKERS,
  HOME_SEEKERS,
  HOUSES,
} from "../config/constants";
import { approveHouse, rejectHouse } from "../handler/admin/house-approval";
import { MyContext } from "../types";
import { Composer } from "grammy";
import { getUsers, paginateUsers } from "../utils/admin/userPagination";
import { adminKeyboard } from "../components/keyboards";
import { getHouses, paginateHouses } from "../utils/admin/housePagination";

export default function (adminRouter: Composer<MyContext>) {
  adminRouter.callbackQuery(/^(\/house\/approve\/.+)/gi, approveHouse);
  adminRouter.callbackQuery(/^(\/house\/reject\/.+)/gi, rejectHouse);
  adminRouter.command("start", async (ctx) => {
    ctx.api.sendMessage(ADMIN_TELEGRAM_ID, "Admin", {
      reply_markup: adminKeyboard,
    });
  });

  adminRouter.hears(HOME_SEEKERS, getUsers);
  adminRouter.callbackQuery(/^(\/user\/page\/.+)/gi, paginateUsers);

  adminRouter.hears(HOUSES, getHouses);
  adminRouter.callbackQuery(/^(\/houses\/page\/.+)/gi, paginateHouses);
}
