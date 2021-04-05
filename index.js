const core = require('@actions/core');
const github = require('@actions/github');

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

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  // Set label
  const token = core.getInput("repo-token", { required: true });
  const client = new github.GitHub(token);
  const prNr = github.context.payload.pull_request.number;
  const prTitle = github.context.payload.pull_request.title;
  addLabels(client, prNr, prTitle);
} catch (error) {
  core.setFailed(error.message);
}

async function addLabels(client, prNumber, prTitle) {
  const labels = genLabels();
  if(labels.length === 0) {
    return;
  }
  await client.issues.addLabels({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: prNumber,
    labels: labels
  })
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