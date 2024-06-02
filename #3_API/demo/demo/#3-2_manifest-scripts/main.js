const log = require("log");
log("main.js");

function open(url, options) {
  return new Promise((resolve) => {
    nw.Window.open(url, options, (win) => {
      win.on("loaded", () => resolve(win));
    });
  });
}

(async () => {
  log("【main.html】");
  const main = await open("main.html");
  log("【new_instance.html】");
  const new_instance = await open("new_instance.html", { new_instance: true });
  new_instance.close();
  log("====================");
  log.openFileLog();
})();
