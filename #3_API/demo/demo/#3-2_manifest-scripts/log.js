const fs = require("node:fs");
const path = require("node:path");
const logFile = path.resolve("log.txt");

module.exports = (msg) => {
  console.log(msg);
  fs.appendFileSync(logFile, msg + "\r\n");
};

module.exports.openFileLog = () => nw.Shell.openItem(logFile);
