import createMenu from "./createMenu.js";
const fs = require("node:fs");
const path = require("node:path");
const clipboard = nw.Clipboard.get();
const win = nw.Window.get();

const menubar = createMenu(
  [
    { label: "文件", submenu: [{ label: "退出", click: () => nw.App.quit() }] },
    { label: "帮助", submenu: [{ label: "关于", click: () => alert("win示例") }] },
  ],
  { type: "menubar" }
);

const TYPES = {
  P: '<span class="property">属性</span>',
  M: '<span class="method">方法</span>',
  E: '<span class="event">事件</span>',
  X: '<span class="extend">延伸</span>',
  N: "",
};

// marked.js
marked.use({
  walkTokens(token) {
    if (token.type === "paragraph") {
      if (/^\s*::::/.test(token.text)) {
        // :::: 代码块说明
        const [_, text] = token.text.trim().match(/::::\s*(.*)/);
        token.type = "text";
        token.text = `<p><div class="snippet-note">${replaceCode(text)}</div></p>`;
        delete token.tokens;
      }
    }
    if (token.type === "text") {
      if (/^\s*:::/.test(token.text)) {
        // :::P 属性代码块标题
        // :::M 方法代码块标题
        // :::E 事件代码块标题
        // :::X 延伸代码块标题
        const [_, type, text] = token.text.trim().match(/:::(P|M|E|X)*\s*(.*)/);
        token.text = `<div class="snippet-title">
          ${TYPES[type] || ""}
          <label>${replaceCode(text)}</label>
        </div>`;
      } else if (/^\s*::/.test(token.text)) {
        // :: 分组
        const [_, text] = token.text.trim().match(/::\s*(.*)/);
        token.text = text
          ? `<details><summary>${text}</summary><div class="snippets">`
          : `</div></details>`;
      }
    }
    if (token.type === "code" && token.lang) {
      const [lang, ...flags] = token.lang.split(" ");
      token.lang = lang;
      if (lang === "javascript") {
        token.autoRun = flags.includes("autoRun"); // 自动运行的脚本，入侦听事件
        token.readOnly = flags.includes("readOnly"); // 只读的脚本，入有Bug的API
      } else {
        token.autoRun = false;
        token.readOnly = true;
      }
    }
  },
  extensions: [
    {
      name: "code",
      renderer(token) {
        const { lang, text, autoRun, readOnly } = token;
        if (autoRun) eval(text);
        const buttons =
          `<div class="code-buttons"><i data-cmd="copy" data-code='${escape(text)}'></i>` +
          (autoRun
            ? '<i class="auto-run">已执行</i>'
            : readOnly
            ? ""
            : `<i data-cmd="run" data-code='${escape(text)}'></i>`) +
          `</div>`;
        return `<pre><code class="language-${lang}">${escape(text, true)}</code>${buttons}</pre>`;
      },
    },
    {
      name: "link",
      renderer(token) {
        const { href, text } = token;
        if (/^API(:(P|M|E|X|N))*$/.test(href)) {
          return `<div data-api='${text}'></div>`;
        }
        return false;
      },
    },
  ],
});

function replaceCode(text) {
  return text
    .replace(/`(.*?)`/g, (match, p1) => `<code>${p1}</code>`)
    .replace(/~~(.*?)~~/g, (match, p1) => `<del>${p1}</del>`);
}

// copied from marked helpers
const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, "g");
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, "g");
const escapeReplacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const getEscapeReplacement = (ch) => escapeReplacements[ch];
function escape(html, encode) {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }
  return html;
}

// 将API文件作为字符串读取，解析代码块
const apiFilesDir = path.resolve("./demo/api/data");
const apiFiles = fs
  .readdirSync(apiFilesDir)
  .filter((file) => /\.md$/i.test(file))
  .map((mdFile) => {
    const apiFile = path.join(apiFilesDir, mdFile);
    const text = fs.readFileSync(apiFile).toString().replace(/\r\n/g, "\n");
    const [_, order, description, document] = text.match(
      /\<meta .*order="(.*?)".*description="(.*?)".*document="(.*?)"/
    );
    const apis = [...new Set(text.match(/\[(.*?)\]\(API(:(P|M|E|X|N))*\)/g))].map((api) => {
      const [_, text, __, type] = api.match(/\[(.*?)\]\(API(:(P|M|E|X|N))*\)/);
      return { type: type || "N", text };
    });
    return { order: +order, description, document, apis, text };
  });

apiFiles.sort((a, b) => a.order - b.order);
console.log(apiFiles);

// API列表
const $apisContainer = document.querySelector("#apisContainer");
$apisContainer.innerHTML = apiFiles
  .map(({ order, description, apis }) => {
    return `<details>
        <summary data-order="${order}">${description}</summary>
        <div class="apis">${apis
          .map(({ type, text }) => {
            return `<a href="#" class="api" data-type="${type}" data-api='${text}'>${
              TYPES[type]
            }${replaceCode(text)}</a>`;
          })
          .join("")}</div>
      </details>`;
  })
  .join("");

let currentApiFile;
$apisContainer.addEventListener("click", (e) => {
  const { api, order } = e.target.dataset;
  // 展开API文件
  if (order && +order !== currentApiFile?.order) {
    const apiFile = apiFiles.find((apiFile) => apiFile.order === +order);
    // 折叠所有API文件
    $apisContainer.querySelectorAll("details").forEach(($details) => {
      $details.open = false;
      $details.classList.remove("current");
    });
    const isOpen = !!currentApiFile;
    setTimeout(() => {
      const $details = e.target.closest("details");
      $details.classList.add("current");
      // 展开当前API文件（初始化时不展开）
      $details.open = isOpen;
      $details.scrollIntoView({ behavior: "smooth" });
    }, 0);
    currentApiFile = apiFile;
    // 移除旧事件
    removeAllListeners();
    // 渲染代码片段
    renderSnippets();
    // 更新工具栏
    updateToolbar();
  }
  // 点击API列表项，自动定位到相应的代码片段
  else if (api) {
    const $api = $snippetsContainer.querySelector(`[data-api='${api}']`);
    $api.closest("details").open = true;
    $api.scrollIntoView({ behavior: "smooth" });
    e.preventDefault();
  }
});

// 类型过滤
const $apiFilterType = document.querySelector("#apiFilterType");
$apiFilterType.addEventListener("change", (e) => {
  const type = e.target.value;
  document.body.classList.remove("only-P", "only-M", "only-E", "only-X");
  document.body.classList.toggle("only-" + type, type !== "all");
});

// 关键词过滤
const $apiFilterInput = document.querySelector("#apiFilterInput");
const $apiFilterInputClear = document.querySelector("#apiFilterInputClear");
const $apiNodes = $apisContainer.querySelectorAll("[data-api]");
$apiFilterInput.addEventListener("input", apiFilter);
$apiFilterInputClear.addEventListener("click", () => {
  $apiFilterInput.value = "";
  $apiFilterInput.focus();
  apiFilter();
});
function apiFilter() {
  const text = $apiFilterInput.value.trim();
  $apiFilterInput.classList.toggle("has-value", !!text);
  const rule = new RegExp(text, "i");
  $apiNodes.forEach((el) => {
    setVisible(el, !text || rule.test(el.dataset.api));
  });
}

// 代码片段列表
const $snippetsContainer = document.querySelector("#snippetsContainer");
function renderSnippets() {
  $snippetsContainer.innerHTML = marked.parse(currentApiFile.text);
  $snippetsContainer.scrollTo({ top: 0, behavior: "smooth" });
  hljs.highlightAll();
}
$snippetsContainer.addEventListener("click", (e) => {
  const { cmd, code } = e.target.dataset;
  if (cmd) {
    if (cmd === "copy") clipboard.set(code, "text");
    else if (cmd === "run") eval("{\n" + code + "\n}");
    e.preventDefault();
  }
});

// 工具栏
function updateToolbar() {
  const hasDetails = $snippetsContainer.querySelector("details");
  setVisible('[data-tool="openAll"]', hasDetails);
  setVisible('[data-tool="closeAll"]', hasDetails);
  setVisible('[data-tool="openDocument"]', currentApiFile.document);
}
document.querySelectorAll("[data-tool]").forEach((el) => {
  const { tool } = el.dataset;
  el.addEventListener("click", () => {
    if (tool === "openAll") {
      $snippetsContainer.querySelectorAll("details").forEach(($details) => ($details.open = true));
    } else if (tool === "closeAll") {
      $snippetsContainer.querySelectorAll("details").forEach(($details) => ($details.open = false));
    } else if (tool === "openDocument") {
      nw.Shell.openExternal(currentApiFile.document);
    } else if (tool === "showDevTools") {
      win.showDevTools();
    }
  });
});

// 初始化：展开第一个API文件
document.querySelector("[data-order]").click();

// 调整侧边栏宽度
const $sidebar = document.querySelector(".sidebar");
const $resizer = document.querySelector(".resizer");
$resizer.addEventListener("mousedown", resizeStart);
let resizer;
function resizeStart(e) {
  resizer = { x: e.x, w: $sidebar.offsetWidth };
  $resizer.classList.add("resizing");
  window.addEventListener("mousemove", resize);
  window.addEventListener("mouseup", resizeEnd);
}
function resize(e) {
  $sidebar.style.width = e.x - resizer.x + resizer.w + "px";
}
function resizeEnd() {
  $resizer.classList.remove("resizing");
  window.removeEventListener("mousemove", resize);
  window.removeEventListener("mouseup", resizeEnd);
}

function setVisible(el, visible) {
  if (typeof el === "string") el = document.querySelector(el);
  el.classList.toggle("hide", !visible);
}

function removeAllListeners() {
  [
    "loaded",
    "move",
    "resize",
    "focus",
    "blur",
    "maximize",
    "minimize",
    "enter-fullscreen",
    "restore",
    "close",
    "closed",
  ].forEach((eventName) => {
    win.removeAllListeners(eventName);
  });
}
