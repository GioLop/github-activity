const e = require("express");

const getUserEvents = async ({ userName }) => {
  const response = await fetch(
    `https://api.github.com/users/${userName}/events`,
    { headers: { "User-Agent": "node.js" } } 
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`GitHub user name ${userName} not found, please try again.`);
    } else {
      throw new Error(`Error getting ${userName} activity: ${response.status}`);
    }
  }
  
  return await response.json();
};

module.exports = {
  getUserEvents
};