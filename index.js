const core = require('@actions/core');
const github = require('@actions/github');
// const { GitHub } = require('@actions/github/lib/utils');

const label_dict = {
  "test123": "test123", // For testing purposes
  "presentation": "presentation",
  "essay": "essay",
  "demo": "demo",
  "executable tutorial": "tutorial",
  "open-source contribution": "contribution_to_open_source",
  "contribution to open-source": "contribution_to_open_source",
  "course automation": "course_automation",
  "feedback": "feedback",
}

async function run() {
  try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
  // Set label
  const token = core.getInput("repo-token", { required: true });
  console.log(token);
  // const client = new GitHub(token);
  const client = new github.GitHub(token);
  const prNr = github.context.payload.number;
  console.log(prNr);
  const prTitle = context.payload.pull_request.title;
  console.log(prTitle);
  console.log(github.context.repo.owner);
  console.log(github.context.repo.repo);
  //addLabels(client, prNr, prTitle);
  await addLabels(client, 6, prTitle);
  } catch (error) {
  core.setFailed(error.message);
  console.log(error);
  }
}

async function addLabels(client, prNumber, prTitle) {
  const labels = genLabels(prTitle);
  if(labels.length === 0) {
    return;
  }
  console.log(labels);
  await client.issues.addLabels({
    //owner: github.context.repo.owner
    owner: "mansand1",
    repo: "action-test",
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

function setLabels(labels, payload){
  //get 
}

run();