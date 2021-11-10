"use strict";
var asyncGetToken = require("../Authorization/getToken");
var axios = require("axios");
//Parametros la do core do action {organizationId, accountId}
//Parametros informados no commit através de t:{activityId} | tudo que estiver dentro do comentário irá para tarefa.
const title = "teste 123 [1]";
const description = "descrição";
const organizationId = 111402;
const folderId = 3764173;
const categoryText = "asdasd";
const accountId = 3757321;
const creatorEmail = "nerdplis@gmail.com";
const creatorPassword = "mobralzera";
const estimatedEffort = 1;
createActivity(organizationId, accountId, folderId, title, description, categoryText, estimatedEffort, creatorEmail, creatorPassword);
// module.exports =
async function createActivity(organizationId, accountId, folderId, title, description, categoryText, estimatedEffort, creatorEmail, creatorPassword) {
    var newToken = await asyncGetToken(creatorEmail, creatorPassword);
    var data = JSON.stringify({
        query: `mutation{
      createActivity(
        title: "${title}",
        accountId: ${accountId},  # OBRIGATÓRIO - ID do grupo de trabalho
        folderId: ${folderId}, # OBRIGATÓRIO - ID da pasta ou do projeto
        description: "${description}", 
        estimatedEffort: ${estimatedEffort},
        categoryText: ${categoryText}
        ) {
        id,
        folderTypeName,
        uid,
        communityId
        }
}`,
        variables: {},
    });
    const config = {
        method: "POST",
        url: "https://app.artia.com/graphql",
        headers: {
            OrganizationId: organizationId,
            "Content-Type": "application/json",
            Authorization: "Bearer " + newToken,
        },
        data: data,
    };
    axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
        .catch(function (error) {
        console.log(error);
    });
}
