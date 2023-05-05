import { InlineKeyboard } from "grammy";
import { MyContext, SessionData } from "../../types";
import { User } from "../../config/db";
import { UserType } from "@prisma/client";
import { userBuilder } from "./paginationPost";

export const paginateBroker = async (ctx: MyContext) => {
  const session = ctx.session as SessionData;
  //["" , "house" , "page" , "param"]
  if (ctx.callbackQuery?.data) {
    const splittedPath = ctx.callbackQuery.data.split("/");
    session.adminBrokerPageNumber = Number(splittedPath[3]);
    const currentPageNumber = session.adminBrokerPageNumber;
    const brokers = await User.findMany({
      where: {
        userType: UserType.BROKER,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    if (brokers.length) {
      const postedHouseLength = brokers.length;
      const broker = brokers[currentPageNumber - 1];
      const inlineKeyboard = new InlineKeyboard();
      if (currentPageNumber > 1) {
        inlineKeyboard.add({ text: `«1`, callback_data: `/broker/page/1` });
      }
      if (currentPageNumber > 2) {
        inlineKeyboard.add({
          text: `‹${currentPageNumber - 1}`,
          callback_data: `/broker/page/` + (currentPageNumber - 1).toString(),
        });
      }
      inlineKeyboard.add({
        text: `-${currentPageNumber}-`,
        callback_data: `/broker/page/` + currentPageNumber.toString(),
      });
      if (currentPageNumber < postedHouseLength - 1) {
        inlineKeyboard.add({
          text: `${currentPageNumber + 1}›`,
          callback_data: `/broker/page/${currentPageNumber + 1}`,
        });
      }
      if (currentPageNumber < postedHouseLength) {
        inlineKeyboard.add({
          text: `${postedHouseLength}»`,
          callback_data: `/broker/page/` + postedHouseLength.toString(),
        });
      }

      await ctx.reply(userBuilder(broker), {
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
      });
    } else {
      await ctx.reply("No Broker to Display");
    }

    //console.log(houses);
  }
};
export const getBrokers = async (ctx: MyContext) => {
  const session = (await ctx.session) as SessionData;

  const brokers = await User.findMany({
    where: {
      userType: UserType.BROKER,
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  if (brokers.length) {
    const userHousePostLength = brokers.length;

    const broker = brokers[0];
    session.adminBrokerPageNumber = 0;
    const inlineKeyboard = new InlineKeyboard();
    inlineKeyboard.text(` -${1}›`, `/broker/page/${1}`);
    for (
      let i = 2;
      i <= (userHousePostLength > 5 ? 5 : userHousePostLength);
      i++
    ) {
      inlineKeyboard.text(` ${i}`, `/broker/page/${i}`);
    }
    await ctx.reply(userBuilder(broker), {
      parse_mode: "HTML",
      reply_markup: inlineKeyboard,
    });
  } else {
    await ctx.reply("No Broker to Display");
  }
};
