import { Status } from "@prisma/client";
import { MyContext } from "../types";
export function houseRequestBuilder({
  subCity,
  numberOfBedrooms,
  phoneNumber,
  houseRequestType,
}: {
  subCity: string;
  numberOfBedrooms: number;
  phoneNumber: string;
  houseRequestType: string;
}): string {
  return `
  -----------------request----------------
 <b>Subcity : </b> ${subCity}
<b>Number of bedroom : </b> ${numberOfBedrooms}
<b>house request type : </b> ${houseRequestType}
<b> phone number : </b> ${phoneNumber}
`;
}
export function houseRequestPostBuilder(
  ctx: MyContext,
  {
    subCity,
    numberOfBedrooms,
    propertyType,
    housePostType,
  }: {
    subCity: string;
    numberOfBedrooms: number;
    propertyType: string;
    housePostType: string;
  }
): string {
  return `
 <b>${ctx.t("subcity")} : </b> ${subCity}
<b>${ctx.t("nmbr-bedrooms")} : </b> ${numberOfBedrooms}
<b>${ctx.t("pprty-type")} :</b> ${propertyType},
<b>${ctx.t("hw-pt-type")} : </b> ${housePostType}
`;
}
