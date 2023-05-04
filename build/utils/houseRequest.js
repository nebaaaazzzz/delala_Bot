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
    houseRequestBuilder: function() {
        return houseRequestBuilder;
    },
    houseRequestPostBuilder: function() {
        return houseRequestPostBuilder;
    }
});
function houseRequestBuilder({ subCity , numberOfBedrooms , phoneNumber , houseRequestType  }) {
    return `
  -----------------request----------------
 <b>Subcity : </b> ${subCity}
<b>Number of bedroom : </b> ${numberOfBedrooms}
<b>house request type : </b> ${houseRequestType}
<b> phone number : </b> ${phoneNumber}
`;
}
function houseRequestPostBuilder(ctx, { subCity , numberOfBedrooms , propertyType , housePostType  }) {
    return `
 <b>${ctx.t("subcity")} : </b> ${subCity}
<b>${ctx.t("nmbr-bedrooms")} : </b> ${numberOfBedrooms}
<b>${ctx.t("pprty-type")} :</b> ${propertyType},
<b>${ctx.t("hw-pt-type")} : </b> ${housePostType}
`;
}
