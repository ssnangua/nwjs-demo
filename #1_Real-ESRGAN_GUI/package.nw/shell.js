import log from "./log.js";

const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");

const cwd = path.resolve("./bin");
let cp;

function exec(command, args) {
  return new Promise((resolve) => {
    cp = spawn(command, args, { cwd });

    cp.stdout.on("data", log.print);
    cp.stderr.on("data", log.print);

    cp.on("close", (code) => {
      if (code !== 0) isStop = true;
      cp = null;
      log.println(`${command} 已退出：Code ${code}`);
      resolve(code);
    });
    cp.on("error", (err) => {
      isStop = true;
      cp = null;
      log.println(err);
      resolve(err);
    });
  });
}

function enhance({ input, output, scale, model, format }) {
  return exec("realesrgan-ncnn-vulkan.exe", ["-i", input, "-o", output, "-s", scale, "-n", model, "-f", format]);
}

const tmp_frames = path.resolve("../tmp_frames");
const out_frames = path.resolve("../out_frames");
function rmTmp() {
  fs.rmSync(tmp_frames, { force: true, recursive: true });
  fs.rmSync(out_frames, { force: true, recursive: true });
}
function extract({ input }) {
  const tmpframe = path.resolve(tmp_frames, "frame%08d.jpg");
  return exec("ffmpeg.exe", ["-i", input, "-qscale:v", "1", "-qmin", "1", "-qmax", "1", "-vsync", "0", tmpframe]);
}
function merge({ input, output }) {
  const outframe = path.resolve(out_frames, "frame%08d.jpg");
  return exec("ffmpeg.exe", ["-i", outframe, "-i", input, "-map", "0:v:0", "-map", "1:a:0", "-c:a", "copy", "-c:v", "libx264", "-r", "23.98", "-pix_fmt", "yuv420p", output]);
}

let isStop = true;
export async function run(options) {
  isStop = false;
  if (options.type === "image") {
    await enhance(options);
  } else {
    rmTmp();
    fs.mkdirSync(tmp_frames);
    fs.mkdirSync(out_frames);

    log.println("提取帧图片");
    await extract(options);

    if (!isStop) {
      log.println("增强帧图片");
      const { scale, model } = options;
      await enhance({ input: tmp_frames, output: out_frames, scale, model, format: "jpg" });
    }

    if (!isStop) {
      log.println("合成视频");
      if (fs.existsSync(options.output)) fs.rmSync(options.output);
      await merge(options);
    }

    log.println("清除临时文件");
    rmTmp();
  }
}

export function stop() {
  if (cp) {
    isStop = true;
    cp.kill();
    rmTmp();
  }
}
