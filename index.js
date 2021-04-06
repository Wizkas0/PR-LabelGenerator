const core = require('@actions/core');
const github = require('@actions/github');
const key_word_dict_string = core.getInput("keyword-dict", { required: true })
const label_dict = JSON.parse(key_word_dict_string);

async function run() {
  try {
  const token = core.getInput("repo-token", { required: true });
  const client = new github.getOctokit(token);
  const prNr = github.context.payload.number;
  const prTitle = github.context.payload.pull_request.title;
  await addLabels(client, prNr, prTitle);
  } catch (error) {
  core.setFailed(error.message);
  console.log(error);
  }
}

async function addLabels(client, prNumber, prTitle) {
  const labels = genLabels(prTitle);
  if(labels.length === 0) {
    console.log("No matchins labels found, exiting");
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