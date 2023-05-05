import { Router } from "@grammyjs/router";
import { User } from "./db";
import {
  ADMIN_TELEGRAM_USERNAME,
  REGISTERED,
  NOT_REGISTERED,
  ADMIN,
} from "./constants";
import { MyContext } from "../types";

const router = new Router<MyContext>(async (ctx) => {
  if (ctx.from?.username == ADMIN_TELEGRAM_USERNAME) {
    return ADMIN;
  }
  if (ctx.from?.id) {
    const result = await User.findFirst({
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
