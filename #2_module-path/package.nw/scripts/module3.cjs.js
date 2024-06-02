const cjs = require("./module4.cjs.js");

cjs.sayHi("我是 Node 模块里 require 的子模块");

module.exports = {
  sayHi: (message) => console.log(message),
};
