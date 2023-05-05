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
function housePostBuilder(ctx, { subCity , woredaOrSpecificPlace , area , numberOfBedrooms , numberOfBathrooms , priceOfTheHouse , propertyType , housePostType  }) {
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
function housePostWithStatusBuilder(ctx, status, { subCity , woredaOrSpecificPlace , area , numberOfBedrooms , numberOfBathrooms , priceOfTheHouse , propertyType , housePostType  }) {
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
        housePostType
    })}
      `;
}
