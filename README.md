# GitHub Actions + Artia

Quando uma issue for criada no GitHub, o GitHub Actions irá criar uma tarefa nova no [Artia](https://github.com/donPain/artia-github-issue-gera-atividade/tree/master) referente a tarefa criada.

- Crie automaticamente uma tarefa nova no Artia quando uma issue é criada no GitHub.
- Declare o esoforço da tarefa quando ela for criada ao adicionar "[número de horas trabalhadas]" no fim do nome da tarefa.

## Actions
- OBS: Quando as outras partes da integração estiverem prontas, adicionar elas aqui e linkar apropriadamente.

<!-- 
- [`Login`](https://github.com/marketplace/actions/jira-login) - Log in to the Jira API
- [`CLI`](https://github.com/marketplace/actions/setup-jira) - Wrapped [go-jira](https://github.com/Netflix-Skunkworks/go-jira) CLI for common Jira actions
- [`Find issue key`](https://github.com/marketplace/actions/jira-find-issue-key) - Search for an issue key in commit message, branch name, etc. This issue key is then saved and used by the next actions in the same workflow
- [`Create`](https://github.com/marketplace/actions/jira-create-issue) - Create a new Jira issue
- [`Transition`](https://github.com/marketplace/actions/jira-issue-transition) - Transition a Jira issue
- [`Comment`](https://github.com/marketplace/actions/jira-add-comment) - Add a comment to a Jira issue
- [`TODO`](https://github.com/marketplace/actions/jira-issue-from-todo) - Create a Jira issue for each TODO comment in committed code
-->

## Como Usar
- Declarar repositório da versão apropriada.
- Alterar "organizationId" para o ID da Organização correta.
- Alterar "accountID" para o Grupo de Usuários correto.
- Alterar "folderId" para a Pasta de Projetos correta.

Um exemplo de workflow aor criar uma `issue` no GitHub:

```
on: 
   issues:
    types: [opened]

jobs:
  artia_comment_job:
    runs-on: ubuntu-latest
    name: Uma tarefa é criada no Artia ao criar uma issue no GitHub.
    steps:
      - name: Criando atividade
        id: Comment
        uses: donPain/artia-github-issue-gera-atividade@Vx.x
        with: 
          organizationId: 111401
          accountId: 3757280
          folderId: 3764183
          creatorEmail: 'test@solinftec.com'
          creatorPassword: ${{ secrets.ARTIA_PASSWORD }}
```
