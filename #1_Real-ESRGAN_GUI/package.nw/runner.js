import log from "./log.js";
import { run, stop } from "./shell.js";

const fs = require("node:fs");
const path = require("node:path");

let isStop = true;
export async function onStart({ type, inputs, outputDir, scale, model, format }) {
  isStop = false;

  log.clear();
  log.timestamp();

  log.println(JSON.stringify({ type, inputs, outputDir, scale, model, format }));

  inputs = inputs.split(";").filter((file) => file && fs.existsSync(file));
  outputDir = fs.existsSync(outputDir) ? outputDir : "";
  for (let i = 0, total = inputs.length; i < total; i++) {
    if (isStop) break;
    log.println(`${i + 1}/${total}`);
    const input = inputs[i];
    log.println(`正在处理 ${input}`);
    // await new Promise((r) => setTimeout(r, 1000));
    const { dir, name } = path.parse(input);
    const outputFile = outputDir && path.resolve(outputDir) !== path.resolve(dir) ? `${name}.${format}` : `${name}-output.${format}`;
    const output = path.join(outputDir || dir, outputFile);
    await run({ type, input, output, scale, model, format });
  }
  if (!isStop) log.println("完成！");
  log.save();
}

export async function onStop() {
  isStop = true;
  log.println("停止！");
  stop();
  log.save();
}
