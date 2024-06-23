<meta order="5" description="Window（窗口）" document="https://nwjs-docs.readthedocs.io/zh/latest/References/Window/" />

:: 静态方法

[Window.get(window_object?)](API:M)
:::M 获取窗口对象

```javascript
const win = nw.Window.get();
alert(win.title);
```

[Window.getAll(callback)](API:M)
:::M 获取所有窗口对象

```javascript
nw.Window.getAll((list) => {
  alert(list.map((win) => win.title).join("\n"));
});
```

[Window.open(url, options?, callback?)](API:M)
:::M 打开新窗口

:::: 有很多参数，参考 <a href="javascript:;" onclick="nw.Window.open('./demo/%233-4_1_Window.open.html', { position: 'center'})">Window.open.html</a>

```javascript
nw.Window.open(
  "./demo/blank.html",
  {
    position: "center",
    width: 400,
    height: 300,
    // ...其它参数
  },
  (newwin) => {
    // 相对于当前窗口居中
    newwin.x = win.x + Math.round((win.width - newwin.width) / 2);
    newwin.y = win.y + Math.round((win.height - newwin.height) / 2);

    // 页面加载完成，可以和页面上下文交互
    newwin.on("loaded", () => {
      newwin.window.document.body.append("你好啊，新窗口！");
    });
  }
);
```

::

:: 其它

[window](API:P)
:::P 获取 window 对象

```javascript
alert(win.window === window);
```

[title](API:P)
:::P 获取显示的窗口标题

```javascript
alert(win.title);
```

[title](API:P)
:::P 设置窗口标题

:::: 窗口标题显示的优先级是 `document.title` &gt; `win.title` &gt; `nw.App.manifest.name`，所以一般是直接修改 `document.title`，或者把它清空，`win.title` 才会显示出来

```javascript
document.title = "test";

/*
// 或
document.title = "";
win.title = "test";
*/
```

["loaded"](API:E)
:::E 页面加载完成

```javascript autoRun
win.on("loaded", () => {
  console.log("loaded");
});
```

[removeAllListeners(eventName)](API:M)
:::M 移除侦听器

```javascript readOnly
// 移除 close 事件的侦听器
removeAllListeners("close");
```

[reload()](API:M)
:::M 重新加载

```javascript
win.reload();
```

[reloadDev()](API:M)
:::M 重新加载（在新的渲染进程中）

```javascript
win.reloadDev();
```

[reloadIgnoringCache()](API:M)
:::M 重新加载（忽略缓存）

```javascript
win.reloadIgnoringCache();
```

::

:: 菜单栏

[menu](API:P)
:::P 设置菜单栏

```javascript
win.menu = menubar;
```

[menu](API:P)
:::P 移除菜单栏

```javascript
win.menu = null;
```

::

:: 窗口位置

[x](API:P)
[y](API:P)
:::P 获取窗口坐标

```javascript
alert([win.x, win.y]);
```

[x](API:P)
[y](API:P)
:::P 设置窗口坐标

```javascript
win.x = 100;
win.y = 100;
```

[moveTo(x, y)](API:M)
:::M 设置窗口坐标

```javascript
win.moveTo(100, 100);
```

[moveBy(x, y)](API:M)
:::M 窗口坐标偏移

```javascript
win.moveBy(10, 10);
```

[setPosition(null | "center" | "mouse")](API:M)
:::M 窗口屏幕居中

```javascript
win.setPosition("center");
```

[setPosition(null | "center" | "mouse")](API:M)
:::M 窗口移动到鼠标位置

```javascript
win.setPosition("mouse");
```

[`窗口移动到右下角`](API:X)
:::X 窗口移动到右下角

```javascript
const x = screen.availWidth - win.width;
const y = screen.availHeight - win.height;
win.moveTo(x, y);
```

["move"](API:E)
:::E 窗口移动

```javascript autoRun
win.on("move", (x, y) => {
  console.log("move", { x, y });
});
```

::

:: 窗口大小

[width](API:P)
[height](API:P)
:::P 获取窗口大小

```javascript
alert([win.width, win.height]);
```

[width](API:P)
[height](API:P)
:::P 设置窗口大小

```javascript
win.width = 600;
win.height = 400;
```

[resizeTo(width, height)](API:M)
:::M 设置窗口大小

```javascript
win.resizeTo(600, 400);
```

[resizeBy(width, height)](API:M)
:::M 窗口大小偏移

```javascript
win.resizeBy(10, 10);
```

[setInnerWidth(width)](API:M)
:::M 设置内部宽度

```javascript
win.setInnerWidth(500);
```

[setInnerHeight(height)](API:M)
:::M 设置内部高度

```javascript
win.setInnerHeight(300);
```

[setResizable(resizable)](API:M)
:::M 可调整大小

```javascript
win.setResizable(true);
```

[setResizable(resizable)](API:M)
:::M 不可调整大小

```javascript
win.setResizable(false);
```

[setMinimumSize(width, height)](API:M)
:::M 设置最小尺寸

```javascript
win.setMinimumSize(300, 200);
```

[setMinimumSize(width, height)](API:M)
:::M 移除最小尺寸限制

```javascript
win.setMinimumSize(0, 0);
```

[setMaximumSize(width, height)](API:M)
:::M 设置最大尺寸

```javascript
win.setMaximumSize(1080, 720);
```

[setMaximumSize(width, height)](API:M)
:::M 移除最大尺寸限制

```javascript
win.setMaximumSize(0, 0);
```

["resize"](API:E)
:::E 窗口大小调整

```javascript autoRun
win.on("resize", (width, height) => {
  console.log("resize", { width, height });
});
```

::

:: 缩放等级

[zoomLevel](API:P)
:::P 获取缩放等级

```javascript
alert(win.zoomLevel);
```

[zoomLevel](API:P)
:::P 缩放等级：放大

```javascript
win.zoomLevel += 1;
```

[zoomLevel](API:P)
:::P 缩放等级：缩小

```javascript
win.zoomLevel -= 1;
```

[zoomLevel](API:P)
:::P 缩放等级：重置

```javascript
win.zoomLevel = 0;
```

::

:: 显示窗口 / 隐藏窗口

[show(is_show?)](API:M)
[hide()](API:M)
:::M 显示窗口 / 隐藏窗口

```javascript
// 隐藏窗口
win.hide();
// 1 秒后重新显示窗口
setTimeout(() => {
  win.show();
}, 1000);
```

[setVisibleOnAllWorkspaces(visible) `(Mac & Linux)`](API:M)
:::M 设置窗口是否在所有工作区中可见

```javascript
win.setVisibleOnAllWorkspaces(true);
```

[canSetVisibleOnAllWorkspaces() `(Mac & Linux)`](API:M)
:::M 获取当前系统是否支持多工作区显示窗口

```javascript
alert(win.canSetVisibleOnAllWorkspaces());
```

::

:: 获得焦点 / 失去焦点

[focus()](API:M)
[blur()](API:M)
:::M 获得焦点 / 失去焦点

```javascript
// 让窗口失去焦点
win.blur();
// 1 秒后重新获得焦点
setTimeout(() => {
  win.focus();
}, 1000);
```

["focus"](API:E)
:::E 窗口获得焦点

```javascript autoRun
win.on("focus", () => {
  console.log("focus");
});
```

["blur"](API:E)
:::E 窗口失去焦点

```javascript autoRun
win.on("blur", () => {
  console.log("blur");
});
```

::

:: 最大化 / 最小化

[maximize()](API:M)
:::M 最大化

```javascript
win.maximize();
```

["maximize"](API:E)
:::E 最大化

```javascript autoRun
win.on("maximize", () => {
  console.log("maximize");
});
```

[minimize()](API:M)
:::M 最小化

```javascript
win.minimize();
```

["minimize"](API:E)
:::E 最小化

```javascript autoRun
win.on("minimize", () => {
  console.log("minimize");
});
```

::

:: 全屏 / Kiosk 模式

[isFullscreen](API:P)
:::P 获取是否处于全屏状态

```javascript
alert(win.isFullscreen);
```

[enterFullscreen()](API:M)
:::M 进入全屏状态

```javascript
win.enterFullscreen();
```

[leaveFullscreen()](API:M)
:::M 退出全屏状态

```javascript
win.leaveFullscreen();
```

[toggleFullscreen()](API:M)
:::M 切换全屏状态

```javascript
win.toggleFullscreen();
```

[isKioskMode](API:P)
:::P 获取是否处于 Kiosk 模式

```javascript
alert(win.isKioskMode);
```

[enterKioskMode()](API:M)
:::M 进入 Kiosk 模式

```javascript
win.enterKioskMode();
```

[leaveKioskMode()](API:M)
:::M 退出 Kiosk 模式

```javascript
win.leaveKioskMode();
```

[toggleKioskMode()](API:M)
:::M 切换 Kiosk 模式

```javascript
win.toggleKioskMode();
```

["enter-fullscreen"](API:E)
:::E 进入全屏或 Kiosk 模式

```javascript autoRun
win.on("enter-fullscreen", () => {
  console.log("enter-fullscreen");
});
```

::

:: 恢复窗口状态

[restore()](API:M)
:::M 恢复窗口状态

:::: 退出最小化、最大化、全屏、Kiosk 模式

```javascript
win.restore();
```

["restore"](API:E)
:::E 窗口恢复状态

:::: 退出最小化、最大化、全屏、Kiosk 模式都会触发

```javascript autoRun
win.on("restore", () => {
  console.log("restore");
});
```

::

:: 窗口关闭

[close(force?)](API:M)
:::M 关闭窗口

```javascript
win.close();
```

["close"](API:E)
:::E 窗口关闭

:::: 侦听了 `close` 事件会阻止窗口关闭，需要通过 `win.close(true)` 强制关闭

```javascript autoRun
win.on("close", () => {
  const result = confirm("确定要关闭窗口吗？");
  if (result) {
    win.close(true);
  }
});

/*
// 在窗口关闭前保存数据
win.on("close", () => {
  // 先隐藏窗口，让用户感觉窗口是立即关闭的
  win.hide();
  // ...保存数据逻辑
  // 真正关闭窗口
  win.close(true);
});
*/
```

:::: `close` 事件目前有 <a href="javascript:;" onclick="nw.Shell.openExternal('https://github.com/nwjs/nw.js/issues/7808')">Bug</a>，侦听了 `close` 事件的窗口打开子窗口，子窗口通过 `window.close()` 或关闭按钮关闭时会出现异常，通过 `win.close(true)` 关闭则正常

:::: 解决办法是在子窗口中也侦听 `close` 事件，或者在入口文件或背景页脚本中添加以下代码，作为临时的处理方案：

```javascript readOnly
// FixBug#7808
chrome.tabs.onRemoved.addListener(() => {
  nw.Window.getAll((list) => {
    list.forEach((win) => {
      if (win.cWindow.tabs.length === 0) {
        win.close(true);
      }
    });
  });
});
```

["closed"](API:E)
:::E 窗口关闭完成

:::: 窗口内部侦听不到，要在窗口外部侦听

```javascript autoRun
win.on("closed", () => {
  console.log("closed");
});
```

::

:: 窗口始终置顶

[isAlwaysOnTop](API:P)
:::P 获取窗口是否始终置顶

:::: 该属性目前有 <a href="javascript:;" onclick="nw.Shell.openExternal('https://github.com/nwjs/nw.js/issues/7410')">Bug</a>，总是返回 `false`

```javascript
alert(win.isAlwaysOnTop);
```

[setAlwaysOnTop(top)](API:M)
:::M 设置窗口始终置顶

```javascript
win.setAlwaysOnTop(true);
```

[setAlwaysOnTop(top)](API:M)
:::M 取消窗口始终置顶

```javascript
win.setAlwaysOnTop(false);
```

::

:: 任务栏相关

[setShowInTaskbar(show)](API:M)
:::M 在任务栏中显示

```javascript
win.setShowInTaskbar(true);
```

[setShowInTaskbar(show)](API:M)
:::M 不在任务栏中显示

```javascript
win.setShowInTaskbar(false);
```

[setProgressBar(progress)](API:M)
:::M 任务栏进度条

```javascript
let progress = 0;
const timer = setInterval(() => {
  if (progress < 1) {
    progress += 0.03;
    // 显示任务栏进度条
    win.setProgressBar(progress);
  } else {
    setTimeout(() => {
      clearInterval(timer);
      // 移除任务栏进度条
      win.setProgressBar(-1);
    }, 2000);
  }
}, 100);
```

[setBadgeLabel(label)](API:M)
:::M 任务栏标记

:::: 俗称小红点，如未读消息数

```javascript
// 显示任务栏标记
win.setBadgeLabel("99");
setTimeout(() => {
  // 移除任务栏标记
  win.setBadgeLabel("");
}, 2000);
```

[requestAttention(attension)](API:M)
:::M 任务栏闪烁

:::: 目前有 <a href="javascript:;" onclick="nw.Shell.openExternal('https://github.com/nwjs/nw.js/issues/7659')">Bug</a>，用不了

```javascript readOnly
win.requestAttention(true);
setTimeout(() => {
  win.requestAttention(false);
}, 5000);
```

::

:: 开发者工具

[showDevTools(iframe?, callback?)](API:M)
:::M 打开开发者工具

```javascript
win.showDevTools();
```

[closeDevTools()](API:M)
:::M 关闭开发者工具

```javascript
win.closeDevTools();
```

[`打开背景页开发者工具`](API:X)
:::X 打开背景页开发者工具

:::: NW.js 没有提供打开背景页开发者工具的 API，不过可以通过扩展程序的 API 来实现

```javascript
chrome.developerPrivate.openDevTools({
  renderViewId: -1,
  renderProcessId: -1,
  extensionId: chrome.runtime.id,
});
```

::

:: 执行代码

[eval(frame, script)](API:M)
:::M 执行代码

```javascript
win.eval(
  null, // 要执行代码的 iframe，如果为 null，则在当前窗口中执行
  `alert("Helloooooo")` // 要执行的代码
);
```

[evalNWBin(frame, path)](API:M)
:::M 加载并执行编译好的二进制文件

:::: 关于源码加密，参考 <a href="javascript:;" onclick="nw.Shell.openExternal('https://nwjs-docs.readthedocs.io/zh/latest/For%20Users/Advanced/Protect%20JavaScript%20Source%20Code/')">保护 JavaScript 源代码</a>

```javascript readOnly
win.evalNWBin(
  null, // 要执行的 iframe，如果为 null，则在当前窗口中执行
  "./protected/nwjc-compiled.bin" // 通过 nwjc 编译生成的二进制文件的路径或 Buffer 或 ArrayBuffer
);
```

[evalNWBinModule(frame, path, module_path)](API:M)
:::M 将编译好的二进制文件作为模块进行加载并执行

:::: 关于源码加密，参考 <a href="javascript:;" onclick="nw.Shell.openExternal('https://nwjs-docs.readthedocs.io/zh/latest/For%20Users/Advanced/Protect%20JavaScript%20Source%20Code/')">保护 JavaScript 源代码</a>

```html
<script>
  win.evalNWBinModule(
    null, // 要执行的 iframe，如果为 null，则在当前窗口中执行
    "./protected/nwjc-compiled-module.bin", // 通过 nwjc 编译生成的二进制文件的路径或 Buffer 或 ArrayBuffer
    "./protected_module.js" // 相对于当前文档的模块 URL
  );
</script>

<!-- 说明：导入声明会被提升（即 import 语句会在其它代码之前执行），
我们新建一个脚本，以确保在 import 之前，evalNWBinModule 已被执行 -->
<script type="module">
  import protectedModule from "./protected_module.js";
</script>
```

::

:: 截图

[capturePage(callback, config?)](API:M)
:::M 捕获窗口的可视区域

```javascript
// 捕获为 datauri 数据，可以直接赋值给 <img> 的 src
win.capturePage(
  (datauri) => {
    const img = new Image();
    img.src = datauri;
    img.style.cssText =
      "width: 80vw; height: 80vh; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; box-shadow: #888 0px 0px 10px;";
    document.body.appendChild(img);
    img.onclick = img.remove;
  },
  {
    format: "jpeg", // jpeg（默认）| png
    datatype: "datauri", // datauri（默认）| raw | buffer
  }
);
```

```javascript
// 捕获为 buffer 数据，可以很方便的保存为图片文件
win.capturePage(
  (buffer) => {
    // 生成图片文件，保存到用户的下载目录
    const path = require("node:path");
    const fs = require("node:fs");
    const filePath = path.join(process.env.USERPROFILE, "downloads", "win-capturePage.png");
    fs.writeFileSync(filePath, buffer);
    // 在文件夹中显示
    nw.Shell.showItemInFolder(filePath);
  },
  { format: "png", datatype: "buffer" }
);
```

[captureScreenshot(options, callback?)](API:M)
:::M 捕获窗口（可捕获整个页面，包含可视区域之外的部分）

:::: 如果省略了 `callback`，将返回一个 `Promise`

```javascript
win.captureScreenshot(
  {
    fullSize: true, // 是否捕获整个页面（包含可视区域之外的部分），目前 Chromium 捕获图像的最大高度为 16384 像素
    format: "jpeg", // png（默认）| jpeg
    quality: 80, // 图片压缩质量，仅对 jpeg 格式有效
    // 只截取指定的区域
    // clip: {
    //   x: 0, // X 偏移
    //   y: 0, // Y 偏移
    //   width: window.innerWidth, // 截取宽度
    //   height: window.innerHeight, // 截取高度
    //   scale: nw.Screen.screens[0].scaleFactor, // 缩放比例
    // },
  },
  (err, data) => {
    if (err) return alert(err.message);

    // data 是 base64 编码的图片 raw 数据，拼接前缀后可以赋值给 <img> 的 src
    const img = new Image();
    img.src = "data:image/jpg;base64," + data;
    img.style.cssText =
      "width: 80vw; height: 80vh; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; box-shadow: #888 0px 0px 10px;";
    document.body.appendChild(img);
    img.onclick = img.remove;

    // 保存为图片文件
    const path = require("node:path");
    const fs = require("node:fs");
    const filePath = path.join(process.env.USERPROFILE, "downloads", "win-captureScreenshot.jpg");
    const buffer = Buffer.from(data, "base64");
    fs.writeFileSync(filePath, buffer);
    // 在文件夹中显示
    nw.Shell.showItemInFolder(filePath);
  }
);
```

::

:: 打印

[getPrinters(callback)](API:M)
:::P 获取系统中的打印机

```javascript
win.getPrinters((printers) => {
  alert(printers.map((printer) => printer.deviceName).join("\n"));
});
```

[print(options)](API:M)
:::P 打印窗口中网页的内容

```javascript
// 打印为 PDF 文件，保存到用户的下载目录
const path = require("node:path");
const pdf_path = path.join(process.env.USERPROFILE, "downloads", "win-print.pdf");
win.print({ pdf_path, silent: true, shouldPrintBackgrounds: true });
// 在文件夹中显示
nw.Shell.showItemInFolder(pdf_path);
```

所有配置项：

```javascript
win.print({
  autoprint: false, // 是否在无需用户交互的情况下执行打印操作，默认为 true
  silent: false, // 隐藏一闪而过的打印预览对话框，默认为 false
  printer: "Microsoft Print to PDF", // 打印机 `deviceName`, 可通过 `win.getPrinters()` 获得，打印为 PDF 时不需要设置
  pdf_path: "", //打印为 PDF 时的输出路径
  headerFooterEnabled: false, // 是否启用页眉和页脚
  landscape: false, // 是否横向打印
  // 页面尺寸
  mediaSize: {
    name: "CUSTOM",
    width_microns: 279400,
    height_microns: 215900,
    custom_display_name: "Letter",
    is_default: true,
  },
  shouldPrintBackgrounds: true, // 是否打印 CSS 背景
  marginsType: 3, // 0 - 默认；1 - 无留边；2 - 最小值；3 - 自定义，参考 marginsCustom
  // 自定义留边设置，单位为 point（点）
  marginsCustom: {
    marginBottom: 54,
    marginLeft: 70,
    marginRight: 28,
    marginTop: 32,
  },
  copies: 1, // 要打印的份数。
  scaleFactor: 100, // 比例系数，默认值为 100
  headerString: "", // 一个字符串，用于替换页眉里的 URL
  footerString: "", // 一个字符串，用于替换页脚里的 URL
});
```

::
