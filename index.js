const core = require('@actions/core');
const github = require('@actions/github');
const key_word_dict_string = core.getInput("keyword-dict", { required: true })
const label_dict = JSON.parse(key_word_dict_string); // a dictionary containing the permitted labels and their corresponding keywords/ keyphrases

async function run() {
  // this is the main function run by the label-generating action
  try {
  const token = core.getInput("repo-token", { required: true }); // the token used for authentication
  const client = new github.getOctokit(token);
  const prNr = github.context.payload.number; // the issue-number of the PR
  const prTitle = github.context.payload.pull_request.title; // the title of the PR
  const labels = genLabels(prTitle); // generates the labels from the title of  the PR
  await addLabels(client, prNr, prTitle, labels); // adds the generated labels to the PR
  } catch (error) {
  core.setFailed(error.message);
  console.log(error);
  }
}

async function addLabels(client, prNumber, prTitle, labels) {
  // this function adds labels to a PR
  if(labels.length === 0) {
    console.log("No matching labels found, exiting"); // no keywords/keyphrases were found in the title of the PR
    return;
  }
  console.log("Found matching labels:", labels);
  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels: labels
  });
}

function genLabels(prTitle){
  // this function generates labels from keywords found in PR-title
  prTitle = prTitle.toLowerCase();
  var labels = []; // labels to be added to PR
  for(const keyword in label_dict) {
    if(prTitle.includes(keyword)) {
      labels.push(label_dict[keyword]);
    }
  }
  return labels;
}

run();