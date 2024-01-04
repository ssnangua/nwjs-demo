import { onStart, onStop } from "./runner.js";

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const $image = $("#image");
const $video = $("#video");
const $input = $("#input");
const $output = $("#output");
const $scale = $("#scale");
const $model = $("#model");
const $format = $("#format");
const $start = $("#start");
const $stop = $("#stop");

function setDisplay(el, display) {
  el.style.display = display ? "block" : "none";
}
function setDisabled(el, disabled) {
  el[disabled ? "setAttribute" : "removeAttribute"]("disabled", "disabled");
}
function setRunning(running) {
  setDisabled($image, running);
  setDisabled($video, running);
  $input.disabled = running;
  $output.disabled = running;
  setDisabled($scale, running);
  setDisabled($model, running);
  setDisabled($format, running);
  setDisabled($start, running);
  setDisplay($stop, running);
  $start.innerText = running ? "处理中..." : "开始";
}
setRunning(false);

let type = "image";
function setType(newType) {
  type = newType;
  const isImage = type === "image";
  $input.accept = isImage ? ".png,.jpg,.jpeg,.webp" : ".mp4";
  $scale.value = isImage ? "4" : "2";
  $model.value = isImage ? "realesrgan-x4plus-anime" : "realesr-animevideov3";
  $format.value = isImage ? "jpg" : "mp4";
  $$('[type="image"]').forEach((option) => setDisplay(option, isImage));
  $$('[type="video"]').forEach((option) => setDisplay(option, !isImage));
}
setType("image");
$$('[name="type"]').forEach((radio) => {
  radio.addEventListener("click", () => setType(radio.value));
});

$start.addEventListener("click", async () => {
  setRunning(true);
  await onStart({
    type,
    inputs: $input.value,
    outputDir: $output.value,
    scale: $scale.value,
    model: $model.value,
    format: $format.value,
  });
  setRunning(false);
});

$stop.addEventListener("click", async () => {
  await onStop();
  setRunning(false);
});

window.addEventListener("dragenter", preventDefault);
window.addEventListener("dragover", preventDefault);
window.addEventListener("dragleave", preventDefault);
window.addEventListener("drop", preventDefault);
function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
