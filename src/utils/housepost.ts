import { Status } from "@prisma/client";
export function housePostBuilder({
  subCity,
  woredaOrSpecificPlace,
  area,
  numberOfBedrooms,
  numberOfBathrooms,
  priceOfTheHouse,
  propertyType,
}: {
  subCity: string;
  woredaOrSpecificPlace: string;
  area: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  priceOfTheHouse: number;
  propertyType: string;
}): string {
  return `
 <b>Subcity : </b> ${subCity}
<b>woreds : </b>  ${woredaOrSpecificPlace}
<b>area : </b>     ${area}
<b>Number of bedroom : </b> ${numberOfBedrooms}
<b>Number of bathroom : </b> ${numberOfBathrooms}
<b>Price : </b> ${priceOfTheHouse}
<b>Property type</b> ${propertyType},
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
  }: {
    subCity: string;
    woredaOrSpecificPlace: string;
    area: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    priceOfTheHouse: number;
    propertyType: string;
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
       })}
      `;
}
