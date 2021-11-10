var asyncGetToken = require("../Authorization/getToken");
import axios from "axios";
//Parametros la do core do action {organizationId, accountId}
//Parametros informados no commit através de t:{activityId} | tudo que estiver dentro do comentário irá para tarefa.

module.exports = async function createActivity(
  organizationId: number,
  accountId: number,
  folderId: number,
  title: string,
  description: string,
  categoryText: string,
  estimatedEffort: number,
  creatorEmail: string,
  creatorPassword: string
) {
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
  axios(JSON.stringify(config))
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
};
