/**
 * 文件选择器
 */
const $input = document.createElement("input");
$input.type = "file";

function setAttribute(attr, value) {
  if (value === false) $input.removeAttribute(attr);
  else $input.setAttribute(attr, value);
}

const path = require("node:path");
const START_IN = {};
["desktop", "documents", "downloads", "music", "pictures", "videos"].forEach((startIn) => {
  START_IN[startIn] = path.join(process.env.USERPROFILE, startIn);
});

export function showFilePicker({
  type = "open",
  suggestedName = "",
  multiple = false,
  accept = "",
  openDirectory = false,
  openDirectoryDesc = "",
  startIn = "",
}) {
  return new Promise((resolve, reject) => {
    setAttribute("nwsaveas", type === "save" ? suggestedName : false);
    setAttribute("multiple", multiple);
    setAttribute("accept", accept);
    setAttribute("nwdirectory", openDirectory);
    setAttribute("nwdirectorydesc", openDirectoryDesc);
    setAttribute("nwworkingdir", START_IN[startIn] || startIn);
    $input.onchange = () => {
      resolve([...$input.files]);
      $input.value = "";
    };
    $input.oncancel = () => reject();
    $input.click();
  });
}

export function showOpenFilePicker({ multiple, accept, startIn } = {}) {
  return showFilePicker({ type: "open", multiple, accept, startIn });
}

export function showSaveFilePicker({ suggestedName, accept, startIn } = {}) {
  return showFilePicker({ type: "save", suggestedName, accept, startIn });
}

export function showDirectoryPicker({ openDirectoryDesc, startIn } = {}) {
  return showFilePicker({ type: "open", openDirectory: true, openDirectoryDesc, startIn });
}

export default { showFilePicker, showOpenFilePicker, showSaveFilePicker, showDirectoryPicker };
