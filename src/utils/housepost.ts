import { MyContext } from "../types";
export function housePostBuilder(
  ctx: MyContext,
  {
    subCity,
    woredaOrSpecificPlace,
    area,
    numberOfBedrooms,
    numberOfBathrooms,
    priceOfTheHouse,
    propertyType,
    housePostType,
  }: {
    subCity: string;
    woredaOrSpecificPlace: string;
    area: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    priceOfTheHouse: number;
    propertyType: string;
    housePostType: string;
  }
): string {
  return `
 <b>${ctx.t("subcity")} : </b> ${subCity}
<b>${ctx.t("wrda-spcic-loc")} : </b>  ${woredaOrSpecificPlace}
<b>${ctx.t("area-z-house")} : </b>     ${area}
<b>${ctx.t("nmbr-bedrooms")} : </b> ${numberOfBedrooms}
<b>${ctx.t("nmbr-bathrooms")}: </b> ${numberOfBathrooms}
<b>${ctx.t("price-z-house")} : </b> ${priceOfTheHouse}
<b>${ctx.t("pprty-type")} :</b> ${propertyType},
<b>${ctx.t("hw-pt-type")} : </b> ${housePostType}
`;
}

export function housePostWithStatusBuilder(
  ctx: MyContext,
  status: string,
  {
    subCity,
    woredaOrSpecificPlace,
    area,
    numberOfBedrooms,
    numberOfBathrooms,
    priceOfTheHouse,
    propertyType,
    housePostType,
  }: {
    subCity: string;
    woredaOrSpecificPlace: string;
    area: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    priceOfTheHouse: number;
    propertyType: string;
    housePostType: string;
  }
): string {
  return `
        //////////////// ${status} /////////
       ${housePostBuilder(ctx, {
         subCity,
         woredaOrSpecificPlace,
         area,
         numberOfBedrooms,
         numberOfBathrooms,
         priceOfTheHouse,
         propertyType,
         housePostType,
       })}
      `;
}
