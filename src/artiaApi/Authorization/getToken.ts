const { error } = require("@actions/core");
import axios from "axios";

module.exports = function getToken(
  creatorEmail: string,
  creatorPassword: string
) {
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

    axios(JSON.stringify(config)).then(function (response) {
      const resObj = JSON.parse(JSON.stringify(response.data));
      const token = resObj.data.authenticationByEmail.token;
      return resolve(token);
    });
  }).catch(function (error) {
    console.log(error);
  });
};
