"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userBuilder", {
    enumerable: true,
    get: function() {
        return userBuilder;
    }
});
function userBuilder(user) {
    return `
  <b>full name = </b> ${user.fullName}
<b>telegram first name = </b>     ${user.telegramFirstName}
<b>telegram last name = </b>  ${user.telegramLastName}
<b>username = </b>     ${user.userName}
<b>phone number = </b> ${user.phoneNumber}
<b>language preference = </b> ${user.language}
<b>register At = </b> ${user.createdAt}
`;
}
