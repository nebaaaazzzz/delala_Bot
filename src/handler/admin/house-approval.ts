import bot from "../../config/botConfig";
import {
  ADMIN_PHONE_NUMBER,
  ADMIN_TELEGRAM_ID,
  ADMIN_TELEGRAM_USERNAME,
  CHANNEL_ID,
} from "../../config/constants";
import { House, HouseImage } from "../../config/db";
import { MyContext } from "../../types";
import {
  housePostBuilder,
  housePostWithStatusBuilder,
} from "../../utils/housepost";
const BOT_ID = "delalaet_bot";
// approve house

export const approveHouse = async (ctx: MyContext) => {
  await handleApproval(ctx, "APPROVED");
};

//reject house
export const rejectHouse = async (ctx: MyContext) => {
  await handleApproval(ctx, "REJECTED");
};

async function handleApproval(ctx: MyContext, status: "APPROVED" | "REJECTED") {
  await ctx.answerCallbackQuery();
  const messageId = ctx.message?.message_id;
  //["" , "house" , "page" , "param"]
  if (ctx?.callbackQuery?.data) {
    const splittedPath = ctx.callbackQuery?.data.split("/");
    const houseId = Number(splittedPath[3]);
    const captionId = Number(splittedPath[4]);
    let house = await House.findUnique({
      where: {
        id: houseId,
      },
    });
    if (house?.status == status) {
      return await ctx.reply("House Already " + status);
    } else {
      let house = await House.update({
        where: {
          id: houseId,
        },
        include: {
          user: true,
        },
        data: {
          status: status,
        },
      });
      const houseImages = await HouseImage.findMany({
        where: {
          houseId: house.id,
        },
      });
      //update the message to show new status for the admin
      try {
        await bot.api.editMessageCaption(ADMIN_TELEGRAM_ID, captionId, {
          parse_mode: "HTML",
          caption: housePostWithStatusBuilder(ctx, house.status, {
            area: house.area,
            numberOfBathrooms: house.numberOfBathrooms,
            numberOfBedrooms: house.numberOfBedrooms,
            priceOfTheHouse: house.price,
            subCity: house.subCity,
            woredaOrSpecificPlace: house.woredaOrSpecificPlace,
            housePostType: house.housePostType,
            propertyType: house.propertyType,
          }),
        });
      } catch (e: any) {
        console.log(e.message);
      }
      //post to the channel approved house
      if (status === "APPROVED") {
        await bot.api.sendMediaGroup(CHANNEL_ID, [
          {
            type: "photo",
            media: houseImages[0].image as string,
            parse_mode: "HTML",
            caption:
              housePostBuilder(ctx, {
                area: house.area,
                numberOfBathrooms: house.numberOfBathrooms,
                numberOfBedrooms: house.numberOfBedrooms,
                priceOfTheHouse: house.price,
                subCity: house.subCity,
                woredaOrSpecificPlace: house.woredaOrSpecificPlace,
                housePostType: house.housePostType,
                propertyType: house.propertyType,
              }) +
              `
          FOR MORE INFORMATION PLEASE CONTACT Us
          <b>Phone </b>: ${ADMIN_PHONE_NUMBER}
          <b>Telegram </b>: @${ADMIN_TELEGRAM_USERNAME}
            `,
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

      await ctx.i18n.useLocale(house.user.language);
      //send to the user the house is posted
      await bot.api.sendMediaGroup(house.user.telegramId, [
        {
          type: "photo",
          media: houseImages[0].image as string,
          parse_mode: "HTML",
          caption: housePostWithStatusBuilder(ctx, house.status, {
            area: house.area,
            numberOfBathrooms: house.numberOfBathrooms,
            numberOfBedrooms: house.numberOfBedrooms,
            priceOfTheHouse: house.price,
            subCity: house.subCity,
            woredaOrSpecificPlace: house.woredaOrSpecificPlace,
            housePostType: house.housePostType,
            propertyType: house.propertyType,
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
    // approve the house
  }
}
