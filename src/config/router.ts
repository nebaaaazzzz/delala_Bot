import { Router } from "@grammyjs/router";
import { UserType } from "@prisma/client";
import { User } from "./prisma";
import { ADMIN_TELEGRAM_USERNAME, NOT_REGISTERD } from "./constants";
import { MyContext } from "../types";

const router = new Router<MyContext>(async (ctx) => {
  if (ctx.from?.username == ADMIN_TELEGRAM_USERNAME) {
    return UserType.ADMIN;
  }
  if (ctx.from?.id) {
    const result = await User.findFirst({
      where: {
        telegramId: String(ctx.from?.id),
      },
    });
    if (result) {
      if (result.userType === UserType.BROKER) {
        return UserType.BROKER;
      } else if (result.userType === UserType.HOME_SEEKER) {
        return UserType.HOME_SEEKER;
      }
    } else {
      return NOT_REGISTERD;
    }
  } else {
    return NOT_REGISTERD;
  }
});

export default router;
