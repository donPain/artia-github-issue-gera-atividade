"use strict";
const { error } = require("@actions/core");
var axios = require("axios");
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
      url: "https://app.artia.com/graphql",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        const resObj = JSON.parse(JSON.stringify(response.data));
        const token = resObj.data.authenticationByEmail.token;
        return resolve(token);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};
