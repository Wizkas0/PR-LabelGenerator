const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
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