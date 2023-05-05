import { Router } from "@grammyjs/router";
import {
  ADMIN_TELEGRAM_USERNAME,
  REGISTERED,
  NOT_REGISTERED,
  ADMIN,
} from "./constants";
import { MyContext } from "../types";
import { User } from "../entity/User";

const router = new Router<MyContext>(async (ctx) => {
  console.log(ctx.from?.username == ADMIN_TELEGRAM_USERNAME);
  if (ctx.from?.username == ADMIN_TELEGRAM_USERNAME) {
    console.log("admin");
    return ADMIN;
  }
  if (ctx.from?.id) {
    const result = await User.findOne({
      where: {
        telegramId: String(ctx.from?.id),
      },
    });
    if (result) {
      return REGISTERED;
    } else {
      return NOT_REGISTERED;
    }
  } else {
    return NOT_REGISTERED;
  }
});

export default router;
