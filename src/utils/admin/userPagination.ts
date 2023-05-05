import { InlineKeyboard } from "grammy";
import { MyContext, SessionData } from "../../types";
import { userBuilder } from "./paginationPost";
import { User } from "../../entity/User";

export const paginateUsers = async (ctx: MyContext) => {
  const session = ctx.session as SessionData;
  //["" , "house" , "page" , "param"]
  if (ctx.callbackQuery?.data) {
    const splittedPath = ctx.callbackQuery.data.split("/");
    session.adminUserPageNumber = Number(splittedPath[3]);
    const currentPageNumber = session.adminUserPageNumber;
    const homeseekers = await User.find({
      order: {
        createdAt: "DESC",
      },
    });

    if (homeseekers.length) {
      const postedHouseLength = homeseekers.length;
      const homeseeker = homeseekers[currentPageNumber - 1];
      const inlineKeyboard = new InlineKeyboard();
      if (currentPageNumber > 1) {
        inlineKeyboard.add({
          text: `«1`,
          callback_data: `/user/page/1`,
        });
      }
      if (currentPageNumber > 2) {
        inlineKeyboard.add({
          text: `‹${currentPageNumber - 1}`,
          callback_data: `/user/page/` + (currentPageNumber - 1).toString(),
        });
      }
      inlineKeyboard.add({
        text: `-${currentPageNumber}-`,
        callback_data: `/user/page/` + currentPageNumber.toString(),
      });
      if (currentPageNumber < postedHouseLength - 1) {
        inlineKeyboard.add({
          text: `${currentPageNumber + 1}›`,
          callback_data: `/user/page/${currentPageNumber + 1}`,
        });
      }
      if (currentPageNumber < postedHouseLength) {
        inlineKeyboard.add({
          text: `${postedHouseLength}»`,
          callback_data: `/user/page/` + postedHouseLength.toString(),
        });
      }

      await ctx.reply(userBuilder(homeseeker), {
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
      });
    } else {
      await ctx.reply("No Home Seeer to Display");
    }

    //console.log(houses);
  }
};
export const getUsers = async (ctx: MyContext) => {
  const session = (await ctx.session) as SessionData;

  const users = await User.find({
    order: {
      createdAt: "DESC",
    },
  });
  if (users.length) {
    const userHousePostLength = users.length;

    const homeseeker = users[0];
    session.adminUserPageNumber = 0;
    const inlineKeyboard = new InlineKeyboard();
    inlineKeyboard.text(` -${1}›`, `/user/page/${1}`);
    for (
      let i = 2;
      i <= (userHousePostLength > 5 ? 5 : userHousePostLength);
      i++
    ) {
      inlineKeyboard.text(` ${i}`, `/user/page/${i}`);
    }
    await ctx.reply(userBuilder(homeseeker), {
      parse_mode: "HTML",
      reply_markup: inlineKeyboard,
    });
  } else {
    await ctx.reply("No User to Display");
  }
};
