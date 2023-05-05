import { InlineKeyboard } from "grammy";
import { MyContext, SessionData } from "../../types";
import { housePostWithStatusBuilder } from "../housepost";
import { House } from "../../entity/House";

const paginateHouse = async (ctx: MyContext) => {
  const session = ctx.session as SessionData;
  //["" , "house" , "page" , "param"]
  if (ctx.callbackQuery?.data) {
    const splittedPath = ctx.callbackQuery.data.split("/");
    session.pageNumber = Number(splittedPath[3]);
    const currentPageNumber = session.pageNumber;
    const userId = ctx.from?.id;
    if (userId) {
      const houses = await House.getRepository()
        .createQueryBuilder("house")
        .leftJoinAndSelect("house.user", "user")
        .where(String(userId))
        .orderBy({
          createdAt: "DESC",
        })
        .execute();
      if (houses.length) {
        const postedHouseLength = houses.length;
        const house = houses[currentPageNumber - 1];
        const inlineKeyboard = new InlineKeyboard();
        if (currentPageNumber > 1) {
          inlineKeyboard.add({ text: `«1`, callback_data: `/house/page/1` });
        }
        if (currentPageNumber > 2) {
          inlineKeyboard.add({
            text: `‹${currentPageNumber - 1}`,
            callback_data: `/house/page/` + (currentPageNumber - 1).toString(),
          });
        }
        inlineKeyboard.add({
          text: `-${currentPageNumber}-`,
          callback_data: `/house/page/` + currentPageNumber.toString(),
        });
        if (currentPageNumber < postedHouseLength - 1) {
          inlineKeyboard.add({
            text: `${currentPageNumber + 1}›`,
            callback_data: `/house/page/${currentPageNumber + 1}`,
          });
        }
        if (currentPageNumber < postedHouseLength) {
          inlineKeyboard.add({
            text: `${postedHouseLength}»`,
            callback_data: `/house/page/` + postedHouseLength.toString(),
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
        await ctx.reply(ctx.t("no-house-posted"));
      }

      //console.log(houses);
    }
  }
};
const getMyHouses = async (ctx: MyContext) => {
  const session = (await ctx.session) as SessionData;

  const userId = ctx.from?.id;
  if (userId) {
    const houses = await House.getRepository()
      .createQueryBuilder("house")
      .leftJoinAndSelect("house.user", "user")
      .where(String(userId))
      .orderBy({
        createdAt: "DESC",
      })
      .execute();
    if (houses.length) {
      const userHousePostLength = houses.length;

      const house = houses[0];
      session.pageNumber = 0;
      const inlineKeyboard = new InlineKeyboard();
      inlineKeyboard.text(` -${1}›`, `/house/page/${1}`);
      for (
        let i = 2;
        i <= (userHousePostLength > 5 ? 5 : userHousePostLength);
        i++
      ) {
        inlineKeyboard.text(` ${i}`, `/house/page/${i}`);
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
      await ctx.reply("No Posted House to Display");
    }
  }
};

export { paginateHouse, getMyHouses };
