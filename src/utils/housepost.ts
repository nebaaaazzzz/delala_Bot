import { Status } from "@prisma/client";
export function housePostBuilder({
  subCity,
  woredaOrSpecificPlace,
  area,
  numberOfBedrooms,
  numberOfBathrooms,
  priceOfTheHouse,
}: {
  subCity: string;
  woredaOrSpecificPlace: string;
  area: number;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  priceOfTheHouse: number;
}): string {
  return `
 <b>Subcity : </b> ${subCity}
<b>woreds : </b>  ${woredaOrSpecificPlace}
<b>area : </b>     ${area}
<b>Number of bedroom : </b> ${numberOfBedrooms}
<b>Number of bathroom : </b> ${numberOfBathrooms}
<b>Price : </b> ${priceOfTheHouse}
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
  }: {
    subCity: string;
    woredaOrSpecificPlace: string;
    area: number;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    priceOfTheHouse: number;
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
       })}
      `;
}
