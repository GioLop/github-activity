#!/usr/bin/env node

const { userActivityController } = require("../src/controller");

const main = () => {
  const args = process.argv.slice(2);
  userActivityController(args);
};

main();
