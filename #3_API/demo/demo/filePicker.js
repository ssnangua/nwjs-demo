/**
 * 文件选择器
 */
const $input = document.createElement("input");
$input.type = "file";

function setAttribute(attr, value) {
  if (value === false) $input.removeAttribute(attr);
  else $input.setAttribute(attr, value);
}

export function showFilePicker({
  type = "open",
  filename = "",
  multiple = false,
  accept = "",
  openDirectory = false,
  title = "",
  defaultPath = "",
}) {
  return new Promise((resolve, reject) => {
    setAttribute("nwsaveas", type === "save" ? filename : false);
    setAttribute("multiple", multiple);
    setAttribute("accept", accept);
    setAttribute("nwdirectory", openDirectory);
    setAttribute("nwdirectorydesc", title);
    setAttribute("nwworkingdir", defaultPath);
    $input.onchange = () => {
      resolve([...$input.files]);
      $input.value = "";
    };
    $input.oncancel = () => reject();
    $input.click();
  });
}

export function showOpenDialog(options = {}) {
  return showFilePicker({ ...options, type: "open" });
}

export function showSaveDialog(options = {}) {
  return showFilePicker({ ...options, type: "save" });
}

export default { showFilePicker, showOpenDialog, showSaveDialog };
