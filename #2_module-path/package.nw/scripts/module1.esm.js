import esm from "./module2.esm.js";

const cjs = require("./scripts/module3.cjs.js");

esm.sayHi("我是页面里 import 的 ESM 模块");
cjs.sayHi("我是页面里 require 的 Node 模块");
