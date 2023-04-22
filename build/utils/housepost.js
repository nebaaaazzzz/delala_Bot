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
function housePostBuilder({ subCity , woredaOrSpecificPlace , area , numberOfBedrooms , numberOfBathrooms , priceOfTheHouse , propertyType , housePostType  }) {
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
function housePostWithStatusBuilder(status, { subCity , woredaOrSpecificPlace , area , numberOfBedrooms , numberOfBathrooms , priceOfTheHouse , propertyType , housePostType  }) {
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
        housePostType
    })}
      `;
}
