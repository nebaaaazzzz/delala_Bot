import { Status } from "@prisma/client";
export function houseRequestBuilder({
  subCity,
  woredaOrSpecificPlace,
  area,
  numberOfBedrooms,
  numberOfBathrooms,
  priceOfTheHouse,
  phoneNumber,
  houseRequestType,
}: {
  subCity: string;
  woredaOrSpecificPlace: string;
  area: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  priceOfTheHouse: number;
  phoneNumber: string;
  houseRequestType: string;
}): string {
  return `
  -----------------request----------------
 <b>Subcity : </b> ${subCity}
<b>woreds : </b>  ${woredaOrSpecificPlace}
<b>area : </b>     ${area}
<b>Number of bedroom : </b> ${numberOfBedrooms}
<b>Number of bathroom : </b> ${numberOfBathrooms}
<b>Price : </b> ${priceOfTheHouse}
<b>house request type : </b> ${houseRequestType}
<b> phone number : </b> ${phoneNumber}
`;
}
