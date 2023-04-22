"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "houseRequestBuilder", {
    enumerable: true,
    get: function() {
        return houseRequestBuilder;
    }
});
function houseRequestBuilder({ subCity , woredaOrSpecificPlace , area , numberOfBedrooms , numberOfBathrooms , priceOfTheHouse , phoneNumber , houseRequestType  }) {
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
