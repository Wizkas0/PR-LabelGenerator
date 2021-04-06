# PR-LabelGenerator
An action to automatically generate labels for PRs based on the PR title.

The labels to be added is based on a key-value mapping which is specified in
the workflow file. If the title contains the keyword (case insensitive) the 
value is the corresponding label to be added.

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
    - uses: Wizkas0/LabelGenAction@main
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
Within the `keyword-dict` input, you can specify the allowed labels for your repository
and their corresponding keywords. In this example the label `important` would be added to the pull request if
the pull request title contains the phrase "crucial bug" or "game-breaking". The key-phrase "for beginners" would 
result in the labels `noob-friendly` and `good first issue` being added to the pull request.

### Inputs

| Name  | Description  | Required  |
|---|---|---|
| repo-token  | Token necessary to allow for label changes. The pre-defined GITHUB_TOKEN is often used.  | Yes  |
| keyword-dict  | A key-value map in JSON format. | Yes  |