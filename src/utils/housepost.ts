import { Status } from "@prisma/client";
export function housePostBuilder({
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
}): string {
  return `
 <b>Subcity : </b> ${subCity}
<b>woreds : </b>  ${woredaOrSpecificPlace}
<b>area : </b>     ${area}
<b>Number of bedroom : </b> ${numberOfBedrooms}
<b>Number of bathroom : </b> ${numberOfBathrooms}
<b>Price : </b> ${priceOfTheHouse}
<b>Property type</b> ${propertyType},
<b>house post type</b> ${housePostType}
`;
}

export function housePostWithStatusBuilder(
  status: Status,
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
       ${housePostBuilder({
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
