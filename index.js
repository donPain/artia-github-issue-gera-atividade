// @ts-nocheck
const core = require('@actions/core');
const github = require('@actions/github');
const createActivity = require('./src/artiaApi/Activity/createActivity')

// // Get the JSON webhook payload for the event that triggered the workflow//
const payload            = JSON.stringify(github.context.payload, undefined, 2) 
const objPayload         = JSON.parse(payload)
const organizationId     = core.getInput('organizationId') //OrganizationId é o id da empresa/organização cadastrada no artia. (informado no main.yml do workflow)
const accountId          = core.getInput('accountId') //AccountId é o id do grupo de trabalho. (informado no main.yml do workflow)
const creatorEmail       = core.getInput('creatorEmail') //Email criador do comentário (informado no main.yml do workflow).
const creatorPassword    = core.getInput('creatorPassword')//Password (Váriavel de ambiente{sescrets.ARTIA_PASSWORD} informada no main.yml do workflow).
const folderId           = core.getInput('folderId')//Id da pasta ou do projeto. 


try {
    const issue             = objPayload.issue; 
    const description       = issue.body;
    const categoryText      = (issue.labels.lenght > 0 ? issue.labels[0].name : "");
    const estimatedEffort   = issue.title.split('[').pop().split(']')[0];
    const title             = issue.title.replace('[','').replace(']','').replace(estimatedEffort,'')
    createActivity(organizationId, accountId, folderId, title, description, categoryText, estimatedEffort, creatorEmail, creatorPassword);
} catch (error) {
  core.setFailed(error.message);
}





