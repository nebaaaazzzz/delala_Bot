"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    housePostBuilder: function() {
        return housePostBuilder;
    },
    housePostWithStatusBuilder: function() {
        return housePostWithStatusBuilder;
    }
});
function housePostBuilder({ subCity , woredaOrSpecificPlace , area , numberOfBedrooms , numberOfBathrooms , priceOfTheHouse  }) {
    return `
 <b>Subcity : </b> ${subCity}
<b>woreds : </b>  ${woredaOrSpecificPlace}
<b>area : </b>     ${area}
<b>Number of bedroom : </b> ${numberOfBedrooms}
<b>Number of bathroom : </b> ${numberOfBathrooms}
<b>Price : </b> ${priceOfTheHouse}
`;
}
function housePostWithStatusBuilder(status, { subCity , woredaOrSpecificPlace , area , numberOfBedrooms , numberOfBathrooms , priceOfTheHouse  }) {
    return `
        //////////////// ${status} /////////
       ${housePostBuilder({
        subCity,
        woredaOrSpecificPlace,
        area,
        numberOfBedrooms,
        numberOfBathrooms,
        priceOfTheHouse
    })}
      `;
}
