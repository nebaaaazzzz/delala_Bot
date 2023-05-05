import { InlineKeyboard } from "grammy";
import { MyContext, SessionData } from "../../types";
import { House, User } from "../../config/db";
import { housePostWithStatusBuilder } from "../housepost";

export const paginateHouses = async (ctx: MyContext) => {
  const session = ctx.session as SessionData;
  //["" , "house" , "page" , "param"]
  if (ctx.callbackQuery?.data) {
    const splittedPath = ctx.callbackQuery.data.split("/");
    session.adminUserPageNumber = Number(splittedPath[3]);
    const currentPageNumber = session.adminUserPageNumber;
    const houses = await House.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    if (houses.length) {
      const postedHouseLength = houses.length;
      const house = houses[currentPageNumber - 1];
      const inlineKeyboard = new InlineKeyboard();
      if (currentPageNumber > 1) {
        inlineKeyboard.add({ text: `«1`, callback_data: `/houses/page/1` });
      }
      if (currentPageNumber > 2) {
        inlineKeyboard.add({
          text: `‹${currentPageNumber - 1}`,
          callback_data: `/houses/page/` + (currentPageNumber - 1).toString(),
        });
      }
      inlineKeyboard.add({
        text: `-${currentPageNumber}-`,
        callback_data: `/houses/page/` + currentPageNumber.toString(),
      });
      if (currentPageNumber < postedHouseLength - 1) {
        inlineKeyboard.add({
          text: `${currentPageNumber + 1}›`,
          callback_data: `/houses/page/${currentPageNumber + 1}`,
        });
      }
      if (currentPageNumber < postedHouseLength) {
        inlineKeyboard.add({
          text: `${postedHouseLength}»`,
          callback_data: `/houses/page/` + postedHouseLength.toString(),
        });
      }

      await ctx.reply(
        housePostWithStatusBuilder(ctx, house.status, {
          area: house.area,
          housePostType: house.housePostType,
          numberOfBathrooms: house.numberOfBathrooms,
          numberOfBedrooms: house.numberOfBedrooms,
          priceOfTheHouse: house.price,
          propertyType: house.propertyType,
          subCity: house.subCity,
          woredaOrSpecificPlace: house.woredaOrSpecificPlace,
        }),
        {
          parse_mode: "HTML",
          reply_markup: inlineKeyboard,
        }
      );
    } else {
      await ctx.reply("No House to Display");
    }

    //console.log(houses);
  }
};
export const getHouses = async (ctx: MyContext) => {
  const session = (await ctx.session) as SessionData;

  const houses = await House.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
  if (houses.length) {
    const userHousePostLength = houses.length;

    const house = houses[0];
    session.adminUserPageNumber = 0;
    const inlineKeyboard = new InlineKeyboard();
    inlineKeyboard.text(` -${1}›`, `/houses/page/${1}`);
    for (
      let i = 2;
      i <= (userHousePostLength > 5 ? 5 : userHousePostLength);
      i++
    ) {
      inlineKeyboard.text(` ${i}`, `/houses/page/${i}`);
    }
    await ctx.reply(
      housePostWithStatusBuilder(ctx, house.status, {
        area: house.area,
        housePostType: house.housePostType,
        numberOfBathrooms: house.numberOfBathrooms,
        numberOfBedrooms: house.numberOfBedrooms,
        priceOfTheHouse: house.price,
        propertyType: house.propertyType,
        subCity: house.subCity,
        woredaOrSpecificPlace: house.woredaOrSpecificPlace,
      }),
      {
        parse_mode: "HTML",
        reply_markup: inlineKeyboard,
      }
    );
  } else {
    await ctx.reply("No House to Display");
  }
};
