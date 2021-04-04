const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  // Set label
  const token = core.getInput("repo-token", { required: true });
  const client = new github.GitHub(token);
  const prNr = github.context.payload.pull_request.number;
  // For test
  const labels = ["question"];
  await addLabel(client, prNr);
} catch (error) {
  core.setFailed(error.message);
}

async function addLabel(client, prNr, labels) {
  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels: labels
  })
}

function genLabels(payload, permitted_labels){
  var labels = [];
  const title = payload.title;
  for (label in permitted_labels){
    if (title.includes(label)){
      labels.push(label);
    }
  }
  if (labels.length > 0){
    return labels;
  }
  else{
    return false;
  }
}

function setLabels(labels, payload){
  //get 
}