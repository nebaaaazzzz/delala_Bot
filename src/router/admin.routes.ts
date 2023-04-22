import {
  ADMIN_TELEGRAM_ID,
  BROKERS,
  HOME_SEEKERS,
  HOUSES,
} from "../config/constants";
import { approveHouse, rejectHouse } from "../handler/admin/house-approval";
import { MyContext } from "../types";
import { Composer } from "grammy";
import {
  getHomeSeekers,
  paginateHomeSeeker,
} from "../utils/admin/home-seekerPagination";
import { getBrokers, paginateBroker } from "../utils/admin/brokerPagination";
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
  adminRouter.hears(BROKERS, getBrokers);
  adminRouter.callbackQuery(/^(\/broker\/page\/.+)/gi, paginateBroker);

  adminRouter.hears(HOME_SEEKERS, getHomeSeekers);
  adminRouter.callbackQuery(/^(\/home-seeker\/page\/.+)/gi, paginateHomeSeeker);

  adminRouter.hears(HOUSES, getHouses);
  adminRouter.callbackQuery(/^(\/houses\/page\/.+)/gi, paginateHouses);
}
