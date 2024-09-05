const capitalizeText = ([ first = '', ...rest ]) => [ first.toUpperCase(), ...rest ].join('');

const getMessage = (event) => {
  let message = '';
  const  { 
    type, 
    payload: { 
      ref_type,
      commits,
      action
    }, 
    repo: { name } 
  } = event;
  
  switch (event.type) {
    case "CreateEvent":
      message = `Created ${ref_type} in ${name}`; 
      break;
    case "PushEvent":
      const pushQty = commits.length;
      const commitText = pushQty > 1 ? 'commits' : 'commit';

      message = `Pushed ${pushQty} ${commitText} in ${name}`;
      break;
    case "DeleteEvent":
      message = `Deleted ${ref_type} in ${name}`;
      break;
    case "IssuesEvent":
      message = `${capitalizeText(action)} an issue in ${name}`;
      break;
    case "WatchEvent":
      message = `Starred ${name}`;
      break;
    case "ForkEvent":
      message = `Forked ${name}`;
      break;
    case "PullRequestEvent":
      message = `${capitalizeText(action)} pull request in ${name}`;
      break;
    default:
      message = `Did the action ${type} in ${name}`;
      break;
  }

  return `- ${message}`;
};

module.exports = {
  getMessage
}