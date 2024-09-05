const { getMessage } = require("./messages");
const { hasValidLength } = require("./lib/data.utils");
const { isNumeric } = require("./lib/num.utils");
const { getUserEvents } = require("./service");

const userActivityController = async (args) => {
  const [ userName ] = args;

  if (!hasValidLength(args, 1)) {
    console.log('You should pass one argument and it must be the GitHub user name.');
    return;
  }
  
  if (isNumeric(userName)) {
    console.log('GitHub user name should be a string.');
    return;
  }
  
  try {
    const events = await getUserEvents({ userName });

    if (events.length < 1) {
      console.log(`There is no GitHub activity for ${userName} user.`);
      return;
    }
    
    const actions = events.map(getMessage).join('\n');

    console.log(`GitHub user ${userName} has:\n${actions}`);
  } catch (error) {
    console.log(`
      There was an error trying to get GitHub activity: 
      ${error.message}
    `);
  }
};

module.exports = {
  userActivityController
};