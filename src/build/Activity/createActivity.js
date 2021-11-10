"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var asyncGetToken = require("../Authorization/getToken");
const axios_1 = __importDefault(require("axios"));
//Parametros la do core do action {organizationId, accountId}
//Parametros informados no commit através de t:{activityId} | tudo que estiver dentro do comentário irá para tarefa.
module.exports = async function createActivity(organizationId, accountId, folderId, title, description, categoryText, estimatedEffort, creatorEmail, creatorPassword) {
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
        url: "https://artia.app/graphl",
        headers: {
            OrganizationId: organizationId,
            "Content-Type": "application/json",
            Authorization: "Bearer" + newToken,
        },
        data: data,
    };
    (0, axios_1.default)(JSON.stringify(config))
        .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
        .catch(function (error) {
        console.log(error);
    });
};
