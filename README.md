# GitHub Actions para o Artia

The GitHub Actions for [Jira](https://www.atlassian.com/software/jira) to create and edit Jira issues.

- Automatically transition an issue to done when a pull request whose name contains the issue key is merged
- Automatically create a new Jira issue when a GitHub issue is created
- Automatically add a comment to a Jira issue when a commit message contains the issue key
- Automatically create a Jira issue for each `// TODO:` in code

## Actions

- [`Login`](https://github.com/marketplace/actions/jira-login) - Log in to the Jira API
- [`CLI`](https://github.com/marketplace/actions/setup-jira) - Wrapped [go-jira](https://github.com/Netflix-Skunkworks/go-jira) CLI for common Jira actions
- [`Find issue key`](https://github.com/marketplace/actions/jira-find-issue-key) - Search for an issue key in commit message, branch name, etc. This issue key is then saved and used by the next actions in the same workflow
- [`Create`](https://github.com/marketplace/actions/jira-create-issue) - Create a new Jira issue
- [`Transition`](https://github.com/marketplace/actions/jira-issue-transition) - Transition a Jira issue
- [`Comment`](https://github.com/marketplace/actions/jira-add-comment) - Add a comment to a Jira issue
- [`TODO`](https://github.com/marketplace/actions/jira-issue-from-todo) - Create a Jira issue for each TODO comment in committed code

## Como Usar
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
        uses: donPain/action_temp@vx.x
        with: 
          organizationId: 111401
          accountId: 3757280
          folderId: 3764183
          creatorEmail: 'test@solinftec.com'
          creatorPassword: ${{ secrets.ARTIA_PASSWORD }}
```