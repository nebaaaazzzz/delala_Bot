import bot from "../../config/botConfig";
import { ADMIN_TELEGRAM_ID, CHANNEL_ID } from "../../config/constants";
import { House, HouseImage } from "../../config/prisma";
import { MyContext } from "../../types";
import {
  housePostBuilder,
  housePostWithStatusBuilder,
} from "../../utils/housepost";
const BOT_ID = "delalaet_bot";
// approve house

export const approveHouse = async (ctx: MyContext) => {
  const messageId = ctx.callbackQuery?.message?.message_id;
  //["" , "house" , "page" , "param"]
  if (ctx?.callbackQuery?.data) {
    const splittedPath = ctx.callbackQuery?.data.split("/");
    const houseId = Number(splittedPath[3]);

    //approve the house
    const house = await House.update({
      where: {
        id: houseId,
      },
      include: {
        user: true,
      },
      data: {
        status: "APPROVED",
      },
    });
    const houseImages = await HouseImage.findMany({
      where: {
        houseId: house.id,
      },
    });
    //post to the channel approved house
    const message = await bot.api.sendMediaGroup(CHANNEL_ID, [
      {
        type: "photo",
        media: houseImages[0].image as string,
        parse_mode: "HTML",
        caption: housePostBuilder({
          area: house.area,
          numberOfBathrooms: house.numberOfBathrooms,
          numberOfBedrooms: house.numberOfBedrooms,
          priceOfTheHouse: house.price,
          subCity: house.subCity,
          woredaOrSpecificPlace: house.woredaOrSpecificPlace,
        }),
      },
      {
        type: "photo",
        media: houseImages[0].image as string,
      },
      {
        type: "photo",
        media: houseImages[0].image as string,
      },
    ]);
    //update the message to show new status for the admin
    // await bot.api.editMessageCaption(ADMIN_TELEGRAM_ID, messageId as number, {
    //   caption: `
    //   ///////////////${house.status}////////////
    //   *Subcity : * ${house.subCity}
    //    *woreds : *  ${house.woredaOrSpecificPlace}
    //    *area : *     ${house.area}
    //    *Number of bedroom : * ${house.numberOfBedrooms}
    //    *Number of bathroom : * ${house.numberOfBathrooms}
    //    *House Post type : * ${house.housePostType}
    //    *Price : * ${house.price}`,
    // });

    //send to the user the house is posted
    await bot.api.sendMediaGroup(house.user.telegramId, [
      {
        type: "photo",
        media: houseImages[0].image as string,
        parse_mode: "HTML",
        caption: housePostWithStatusBuilder(house.status, {
          area: house.area,
          numberOfBathrooms: house.numberOfBathrooms,
          numberOfBedrooms: house.numberOfBedrooms,
          priceOfTheHouse: house.price,
          subCity: house.subCity,
          woredaOrSpecificPlace: house.woredaOrSpecificPlace,
        }),
      },
      {
        type: "photo",
        media: houseImages[0].image as string,
      },
      {
        type: "photo",
        media: houseImages[0].image as string,
      },
    ]);
  }
};

//reject house
export const rejectHouse = async (ctx: MyContext) => {
  const messageId = ctx.callbackQuery?.message?.message_id;

  if (ctx.callbackQuery?.data) {
    //["" , "house" , "page" , "param"]
    const splittedPath = ctx.callbackQuery.data.split("/");
    const houseId = Number(splittedPath[3]);
    const house = await House.update({
      where: {
        id: houseId,
      },
      include: {
        user: true,
      },
      data: {
        status: "REJECTED",
      },
    });
    const houseImages = await HouseImage.findMany({
      where: {
        houseId: house.id,
      },
    });
    //update the message to show new status for the admin
    // await bot.api.editMessageCaption(BOT_ID, messageId as number, {
    //   caption: housePostWithStatusBuilder(house.status, {
    //     area: house.area,
    //     numberOfBathrooms: house.numberOfBathrooms,
    //     numberOfBedrooms: house.numberOfBedrooms,
    //     priceOfTheHouse: house.price,
    //     subCity: house.subCity,
    //     woredaOrSpecificPlace: house.woredaOrSpecificPlace,
    //   }),
    // });

    //send to the user the house is posted
    await bot.api.sendMediaGroup(house.user.telegramId, [
      {
        type: "photo",
        media: houseImages[0].image as string,
        parse_mode: "HTML",
        caption: housePostWithStatusBuilder(house.status, {
          area: house.area,
          numberOfBathrooms: house.numberOfBathrooms,
          numberOfBedrooms: house.numberOfBedrooms,
          priceOfTheHouse: house.price,
          subCity: house.subCity,
          woredaOrSpecificPlace: house.woredaOrSpecificPlace,
        }),
      },
      {
        type: "photo",
        media: houseImages[0].image as string,
      },
      {
        type: "photo",
        media: houseImages[0].image as string,
      },
    ]);
  }
};
