const fs = require("node:fs");
const path = require("node:path");

const $log = document.querySelector("#log");
let taskLog = "";

function print(text) {
  taskLog += text;
  $log.value = taskLog.length > 10000 ? "..." + taskLog.slice(-9000) : taskLog;
  $log.scrollTop = $log.scrollHeight;
}

function println(text) {
  print(text + "\n");
}

function timestamp() {
  println(`${"=".repeat(20)} ${new Date().toLocaleString()} ${"=".repeat(20)}`);
}

function clear() {
  taskLog = "";
  $log.value = "";
}

const logPath = path.resolve("../log.txt");
let fullLog = fs.existsSync(logPath) ? fs.readFileSync(logPath).toString() : "";
function save() {
  fullLog += taskLog;
  fs.writeFileSync(logPath, fullLog.slice(-1000000));
}

export default { print, println, timestamp, clear, save };
