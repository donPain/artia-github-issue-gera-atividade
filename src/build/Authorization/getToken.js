"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { error } = require("@actions/core");
const axios_1 = __importDefault(require("axios"));
module.exports = function getToken(creatorEmail, creatorPassword) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            query: `mutation{
      authenticationByEmail(email:"${creatorEmail}", password: "${creatorPassword}") {
      token
}
}`,
        });
        const config = {
            method: "POST",
            url: "https://artia.app/graphl",
            headers: {
                "Content-Type": "application/json",
            },
            data: data,
        };
        (0, axios_1.default)(JSON.stringify(config)).then(function (response) {
            const resObj = JSON.parse(JSON.stringify(response.data));
            const token = resObj.data.authenticationByEmail.token;
            return resolve(token);
        });
    }).catch(function (error) {
        console.log(error);
    });
};
