# PR-LabelGenerator
An action to automatically add labels to a pull request, based on its title. 
The action is triggered when a pull request is made, and labels are added to that pull request.

The labels to be added are based on a key-value mapping which is specified in
the workflow file. If the title contains the keyword or key-phrase (case insensitive), the 
corresponding value will be added as a label to the PR.

## Usage
### Workflow file
Create a workflow file in your project (for example `.github/workflows/pr_labeler.yml`)
to use the action in your project.

```
name: label_PR

on:
  pull_request_target:

jobs:
  Label-PR:
    runs-on: ubuntu-latest
    steps:
    - uses: Wizkas0/LabelGenAction@1.0.1
      with:
        repo-token: ${{ secrets.GITHUB_TOKEN }}
        keyword-dict: | 
            { 
            "crucial bug":"important",
            "game-breaking":"important",
            "for beginners":"noob-friendly",
            "for beginners":"good first issue",
            }
```

In this example the label `important` would be added to the pull request if
the pull request title contains the phrase "crucial bug" or "game-breaking".

### Inputs

| Name  | Description  | Required  |
|---|---|---|
| repo-token  | Token necessary to allow for label changes. The pre-defined GITHUB_TOKEN is often used.  | Yes  |
| keyword-dict  | A key-value map in JSON format. | Yes  |
