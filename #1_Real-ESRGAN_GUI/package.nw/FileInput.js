class FileInput extends HTMLElement {
  static get observedAttributes() {
    return ["value", "disabled", "dir", "dirdesc", "multiple", "accept", "workingdir"];
  }

  get value() {
    return this.getAttribute("value") || "";
  }
  set value(value) {
    this.setAttribute("value", value);
  }

  get disabled() {
    return this.hasAttribute("disabled") && this.getAttribute("disabled") !== "false";
  }
  set disabled(disabled) {
    if (disabled && disabled !== "false") {
      this.setAttribute("disabled", "true");
    } else {
      this.removeAttribute("disabled");
    }
  }

  get dir() {
    return this.hasAttribute("dir") && this.getAttribute("dir") !== "false";
  }
  set dir(dir) {
    if (dir && dir !== "false") this.setAttribute("dir", "true");
    else this.removeAttribute("dir");
  }

  get dirdesc() {
    return this.getAttribute("dirdesc") || "";
  }
  set dirdesc(dirdesc) {
    this.setAttribute("dirdesc", dirdesc);
  }

  get multiple() {
    return this.hasAttribute("multiple") && this.getAttribute("multiple") !== false;
  }
  set multiple(multiple) {
    if (multiple && multiple !== "false") this.setAttribute("multiple", "true");
    else this.removeAttribute("multiple");
  }

  get accept() {
    return this.getAttribute("accept") || "";
  }
  set accept(accept) {
    this.setAttribute("accept", accept);
  }

  get workingdir() {
    return this.getAttribute("workingdir") || "";
  }
  set workingdir(workingdir) {
    this.setAttribute("workingdir", workingdir);
  }

  #input;
  #button;

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
      .file-input {
        display: flex;
        flex-flow: row nowrap;
      }
      .file-input>input {
        flex: auto;
        outline: none;
      }
      .file-input>input.dragenter {
        background: #a3c17f;
      }
      </style>
      <div class="file-input">
        <input type="text" />
        <button>浏览...</button>
      </div>
    `;

    this.#input = this.shadowRoot.querySelector("input");
    this.#button = this.shadowRoot.querySelector("button");

    this.#initInput();
    this.#initButton();
  }

  #initInput() {
    const fs = require("node:fs");
    const path = require("node:path");

    const input = this.#input;
    input.addEventListener("dragenter", () => input.classList.add("dragenter"));
    input.addEventListener("dragleave", () => input.classList.remove("dragenter"));
    input.addEventListener("drop", (e) => {
      e.preventDefault();
      e.stopPropagation();
      input.classList.remove("dragenter");
      const dir = this.dir;
      const accept = this.accept;
      const files = Array.from(e.dataTransfer.files)
        .map((file) => file.path)
        .filter((filePath) => {
          if (fs.statSync(filePath).isFile()) {
            if (dir) return false;
          } else {
            if (!dir) return false;
          }
          if (accept && accept.indexOf(path.extname(filePath).toLowerCase()) === -1) {
            return false;
          }
          return true;
        });
      this.value = this.multiple ? files.join(";") : files[0];
    });
    input.addEventListener("change", () => (this.value = input.value));
  }

  #initButton() {
    const _input = document.createElement("input");
    _input.setAttribute("type", "file");
    _input.addEventListener("change", () => (this.value = _input.value));

    const button = this.#button;
    button.addEventListener("click", () => {
      if (this.dir) _input.setAttribute("nwdirectory", "nwdirectory");
      else _input.removeAttribute("nwdirectory");
      if (this.multiple) _input.setAttribute("multiple", "multiple");
      else _input.removeAttribute("multiple");
      _input.setAttribute("accept", this.accept);
      _input.setAttribute("nwworkingdir", this.workingdir);
      _input.setAttribute("nwdirectorydesc", this.dirdesc);
      _input.click();
    });
  }

  updateValue() {
    this.#input.value = this.value;
  }

  updateDisabled() {
    if (this.disabled) {
      this.#input.setAttribute("disabled", "disabled");
      this.#button.setAttribute("disabled", "disabled");
    } else {
      this.#input.removeAttribute("disabled");
      this.#button.removeAttribute("disabled");
    }
  }

  attributeChangedCallback(name) {
    switch (name) {
      case "value":
        this.updateValue();
        break;
      case "disabled":
        this.updateDisabled();
        break;
      default:
    }
  }
}
customElements.define("file-input", FileInput);
