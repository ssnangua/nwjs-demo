<meta order="4" description="&lt;webview&gt;（Chrome）" document="https://developer.chrome.com/docs/apps/reference/webviewTag" />

:: 属性

[contentWindow](API:P)
:::P 页面对象引用

:::: 可用于向页面发送消息

```javascript readOnly
webview.contentWindow.postMessage("你好啊，webview！", "*");
```

[contextMenus](API:P)
:::P 右键菜单

:::: 可以在 webview 的右键菜单中添加自定义菜单项，参考 <a href="javascript:;" onclick="nw.Shell.openExternal('https://developer.chrome.com/docs/extensions/reference/api/contextMenus')">chrome.contextMenus</a>

```javascript readOnly
webview.contextMenus.create({
  title: "自定义菜单项",
  onclick(info) {
    console.log("自定义菜单项被触发啦！", info);
  },
});
```

[request](API:P)
:::P webRequest 事件的接口

:::: 可以拦截、屏蔽或修改 webview 发出的请求，参考 <a href="javascript:;" onclick="nw.Shell.openExternal('https://developer.chrome.com/docs/extensions/reference/api/webRequest')">chrome.webRequest</a>

```javascript readOnly
webview.request.onBeforeRequest.addListener(
  (details) => {
    // 把所有 .png 图片的请求都重定向为 NW.js 的 Logo
    if (/\.png(\?|#|$)/i.test(details.url)) {
      return { redirectUrl: "https://nwjs.io/img/logo.png" };
    }
    // 其它请求不处理
    return { cancel: false };
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
```

::

:: 导航

[reload()](API:M)
:::M 重新加载（刷新）

```javascript readOnly
webview.reload();
```

[stop()](API:M)
:::M 停止加载

```javascript readOnly
webview.stop();
```

[back(callback?)](API:M)
:::M 向后导航（返回）

```javascript readOnly
webview.back((success) => {
  console.log(success);
});
```

[forward(callback?)](API:M)
:::M 向前导航（前进）

```javascript readOnly
webview.forward((success) => {
  console.log(success);
});
```

[go(relativeIndex, callback?)](API:M)
:::M 导航历史记录相对索引

```javascript readOnly
// 等同于 `webview.back()`
webview.go(-1);

// 等同于 `webview.forward()`
webview.go(1);

// 导航到历史记录中当前位置的前面第三个
webview.go(-3, (success) => {
  console.log(success);
});
```

[canGoBack()](API:M)
:::M 查询是否可以向后导航

```javascript readOnly
console.log(webview.canGoBack());
```

[canGoForward()](API:M)
:::M 查询是否可以向前导航

```javascript readOnly
console.log(webview.canGoForward());
```

::

:: 注入

[addContentScripts(contentScriptList)](API:M)
:::M 添加注入规则

:::: 当 webview 导航到符合一条或多条规则的网页时，会自动注入关联的脚本和样式，参考 <a href="javascript:;" onclick="nw.Shell.openExternal('https://developer.chrome.com/docs/extensions/develop/concepts/content-scripts')">内容脚本</a>，匹配规则参考 <a href="javascript:;" onclick="nw.Shell.openExternal('https://developer.chrome.com/extensions/match_patterns')">匹配模式</a>

```javascript readOnly
webview.addContentScripts([
  {
    name: "nw_inject", // 名称，可用于移除规则
    matches: ["<all_urls>"], // URL 匹配规则
    // 注入样式
    css: {
      // 样式代码
      code: `
        /* 自定义滚动条 */
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        ::-webkit-scrollbar-track {
          background-color: #fcfcfc;
        }
        ::-webkit-scrollbar-thumb {
          background-color: #8b8b8b;
          border-radius: 6px;
          border: 2px solid #fcfcfc;
        }
        ::-webkit-scrollbar-thumb:hover {
          background-color: #636363;
        }
      `,
      // 或者注入样式文件
      // files: ["mystyles.css"],
    },
    // 注入脚本
    js: {
      code: `console.log("我是注入的脚本！");`,
      // 或者注入脚本文件
      // files: ["myscript.js"],
    },
    /**
     * 注入时机
     * document_start - css加载之后、DOM和其他脚本加载之前
     * document_end - DOM加载之后、图片和iframe加载之前
     * document_idle - 根据情况，在 document_end 之后或 window.onload 之后注入
     */
    run_at: "document_start",
  },
]);
```

[removeContentScripts(scriptNameList)](API:M)
:::M 移除注入规则

```javascript readOnly
webview.addContentScripts(["nw_inject"]);
```

[insertCSS(details, callback?)](API:M)
:::M 注入样式

:::: `insertCSS()` 需要在 webview `contentload` 或 `loadstop` 之后才能使用

```javascript readOnly
webview.addEventListener("loadstop", (e) => {
  webview.insertCSS({
    code: `
      /* 将页面的背景颜色设为红色 */
      body {
        background-color: red !important;
      }
    `,
    // 或者注入一个样式文件
    // file: "mystyles.css",
  });
});
```

[executeScript(details, callback?)](API:M)
:::M 注入脚本

:::: `executeScript()` 需要在 webview `contentload` 或 `loadstop` 之后才能使用

```javascript readOnly
webview.addEventListener("loadstop", (e) => {
  webview.executeScript(
    {
      code: `
        // 将页面的背景颜色设为红色
        document.body.style.backgroundColor = "red";

        // 返回页面的图标、标题、URL
        ({
            favicon: document.querySelector('link[rel="shortcut icon"],link[rel="icon"]')?.href || location.origin + "/favicon.ico",
            title: document.title,
            url: location.href,
          }
        ])`,
      // 或者注入一个脚本文件
      // file: "myscript.js",
    },
    ([{ favicon, title, url }]) => {
      console.log({ favicon, title, url });
    }
  );
});
```

Chromium 的 `executeScript()` 方法是在一个独立的环境中执行的，NW.js 新增了一个 `mainWorld` 选项，让我们可以访问到 webview 的真实上下文

```javascript readOnly
// webview 加载的页面中
window.myFn = () => {
  /*...*/
};

// 我们的应用中
webview.executeScript({
  code: `
    console.log(window.myFn); // undefined
  `,
});
webview.executeScript({
  mainWorld: true, // 访问 webview 的真实上下文
  code: `
    console.log(window.myFn); // f () { /*...*/ }
  `,
});
```

::

:: 查找

[find(searchText, options?, callback?)](API:M)
:::M 在页面上查找

```javascript readOnly
webview.find(
  "a", // 要查找的字符串
  {
    backward: false, // 向前查找
    matchCase: false, // 区分大小写
  },
  (results) => {
    const {
      numberOfMatches, // 匹配项总数
      activeMatchOrdinal, // 当前匹配项索引
    } = results;
  }
);
```

[stopFinding(action?)](API:M)
:::M 结束查找

```javascript readOnly
/**
 * keep - 保留当前匹配项（默认值）
 * clear - 清除所有匹配项
 * activate - 保留当前匹配项，并模拟用户点击该匹配项
 */
webview.stopFinding("keep");
```

["findupdate"](API:E)
:::E 查找结果更新

```javascript readOnly
webview.addEventListener("findupdate", (e) => {
  const {
    searchText, // 查找的字符串
    numberOfMatches, // 匹配项总数
    activeMatchOrdinal, // 当前匹配项索引
    finalUpdate, // 是否是最终的更新
  } = e;
});
```

::

:: 音频

[getAudioState(callback)](API:M)
:::M 查询音频状态

:::: NW.js 程序包里的 `ffmpeg` 是阉割过的，功能不完整，所以不管页面中有没有音频或视频，`getAudioState()` 的返回值都是 `false`

:::: 如果有播放音视频的需求，需要到 <a href="javascript:;" onclick="nw.Shell.openExternal('https://github.com/nwjs-ffmpeg-prebuilt/nwjs-ffmpeg-prebuilt/releases')">这个仓库</a> 下载相应版本、相应平台架构的预编译文件，替换 NW.js 程序包根目录下的 `ffmpeg`

```javascript readOnly
webview.getAudioState((audible) => {
  console.log(audible);
});
```

[setAudioMuted(mute)](API:M)
:::M 设置音频是否静音

```javascript readOnly
webview.setAudioMuted(true);
```

[isAudioMuted(callback)](API:M)
:::M 查询音频是否静音

```javascript readOnly
webview.isAudioMuted((muted) => {
  console.log(muted);
});
```

::

:: 缩放

[getZoom(callback)](API:M)
:::M 获取页面当前的缩放比例

```javascript readOnly
webview.getZoom((zoomFactor) => {
  console.log(zoomFactor); // 默认值为 1
});
```

[setZoom(zoomFactor, callback?)](API:M)
:::M 更改页面的缩放比例

```javascript readOnly
webview.setZoom(1.5);
```

["zoomchange"](API:E)
:::E 页面的缩放比例发生变化

```javascript readOnly
webview.addEventListener("zoomchange", ({ oldZoomFactor, newZoomFactor }) => {
  console.log({ oldZoomFactor, newZoomFactor });
});
```

[getZoomMode(callback?)](API:M)
:::M 获取 webview 当前的缩放模式

```javascript readOnly
webview.getZoomMode((ZoomMode) => {
  console.log(ZoomMode); // 默认值为 per-origin
});
```

[setZoomMode(ZoomMode, callback?)](API:M)
:::M 设置 webview 的缩放模式

```javascript readOnly
/**
 * per-origin - 缩放仅影响当前站点（默认值）
 * per-view - 缩放仅影响该 webview
 * disabled - 禁用 webview 的所有缩放功能
 */
webview.setZoomMode("per-origin");
```

::

:: 其它

[getUserAgent()](API:M)
:::M 获取从 webview 发出的 HTTP 请求的 User-Agent

```javascript readOnly
console.log(webview.getUserAgent()); // Mozilla/5.0...
```

[setUserAgentOverride(userAgent)](API:M)
:::M 重写从 webview 发出的 HTTP 请求的 User-Agent

```javascript readOnly
webview.setUserAgentOverride("myapp/1.0.0");
```

[isUserAgentOverridden()](API:M)
:::M 查询 User-Agent 是否被重写

```javascript readOnly
console.log(webview.isUserAgentOverridden());
```

[print()](API:M)
:::M 打印 webview 内容

```javascript readOnly
webview.print();
```

[captureVisibleRegion(options?, callback)](API:M)
:::M 捕获 webview 可见区域（截图）

```javascript readOnly
webview.captureVisibleRegion(
  {
    format: "jpeg", // jpeg | png
    quality: 80, // 图片质量（只对 jpeg 格式有效）
  },
  (dataUrl) => {
    // dataUrl 是 base64 编码的图片数据，可以直接赋值给 <img> 的 src
    const img = new Image();
    img.src = dataUrl;
    img.style.cssText =
      "width: 300px; height 300px; border: solid; position: fixed; top: 10px; left: 10px; z-index: 9999;";
    document.body.appendChild(img);

    // 保存为图片文件
    const path = require("node:path");
    const fs = require("node:fs");
    const filePath = path.join(
      process.env.USERPROFILE,
      "downloads",
      "webview-captureVisibleRegion.jpg"
    );
    const buffer = Buffer.from(dataUrl, "base64");
    fs.writeFileSync(filePath, buffer);
  }
);
```

[loadDataWithBaseUrl(dataUrl, baseUrl, virtualUrl?)](API:M)
:::M 加载数据网址

```javascript readOnly
webview.loadDataWithBaseUrl(
  `data:text/html;charset=UTF-8,<html><head></head><body>我是假的哦</body></html>`, // 数据网址
  "http://www.base-url.com/", // 基础网址
  "https://www.virtual-url.com/" // 向用户显示的虚拟网址（地址栏）
);

webview.addEventListener("loadstop", (e) => {
  console.log(webview.src); // https://www.virtual-url.com/

  webview.executeScript({ code: "location.href" }, ([href]) => {
    console.log(href); // http://www.base-url.com/
  });
});
```

[clearData(options, types, callback?)](API:M)
:::M 清除 webview 的浏览数据

```javascript readOnly
webview.clearData(
  {
    // 清除在此时间之后的数据（毫秒数）
    // 默认值为 0，即清除所有时间的数据
    since: +new Date("2024-06-01"),
  },
  {
    cache: false, // 清除所有数据，无视其它类型选项
    appcache: true, // 清除应用数据
    cookies: true, // 清除分区 cookie 数据
    sessionCookies: true, // 清除会话 cookie 数据
    persistentCookies: true, // 清除持久 cookie 数据
    fileSystems: true, // 清除文件访问记录
    indexedDB: true, // 清除 indexedDB 数据
    localStorage: true, // 清除 localStorage 数据
    webSQL: true, // 清除 webSQL 数据
  },
  () => {
    console.log("清除完毕！");
  }
);
```

[setSpatialNavigationEnabled(enabled)](API:M)
:::M 设置 webview 的空间导航状态

:::: 启用空间导航后，用户可以通过键盘的上下左右键，在页面的可交互元素之间切换焦点，适合无障碍应用

```javascript readOnly
webview.setSpatialNavigationEnabled(true);
```

[isSpatialNavigationEnabled(callback)](API:M)
:::M 查询 webview 是否启用了空间导航

```javascript readOnly
webview.isSpatialNavigationEnabled((enabled) => {
  console.log(enabled);
});
```

[getProcessId()](API:M)
:::M 获取 webview 的内部进程 ID（非系统进程 ID）

```javascript readOnly
console.log(webview.getProcessId());
```

[terminate()](API:M)
:::M 强制终止 webview 渲染进程

:::: 所有 webview 共享一个渲染进程

```javascript readOnly
webview.terminate();
```

::

:: 事件

["loadcommit"](API:E)
:::E 发生加载事件

:::: 包括最外层和子框架的导航，不包括异步资源加载

```javascript readOnly
webview.addEventListener("loadcommit", ({ isTopLevel, url }) => {
  // isTopLevel - 是否是最外层
  // url - 加载的 URL
});
```

["loadredirect"](API:E)
:::E 发生重定向

```javascript readOnly
webview.addEventListener("loadredirect", ({ isTopLevel, oldUrl, newUrl }) => {
  // isTopLevel - 是否是最外层
  // oldUrl - 重定向前的 URL
  // newUrl - 重定向后的 URL
});
```

["loadstart"](API:E)
:::E 开始加载文档

```javascript readOnly
webview.addEventListener("loadstart", ({ isTopLevel, url }) => {
  // isTopLevel -  是否是最外层
  // url - 加载的 URL
});
```

["contentload"](API:E)
:::E 页面加载完成（不包括子框架和异步资源）

```javascript readOnly
webview.addEventListener("contentload", () => {});
```

["loadstop"](API:E)
:::E 页面加载完成（包括子框架，不包括异步资源）

```javascript readOnly
webview.addEventListener("loadstop", () => {});
```

["loadabort"](API:E)
:::E 取消加载或加载失败

```javascript readOnly
webview.addEventListener("loadabort", ({ isTopLevel, url, code, reason }) => {
  // isTopLevel-  是否是最外层
  // url - 加载的 URL
  // code - 错误码
  // reason - 错误原因
});
```

["newwindow"](API:E)
:::E 请求打开窗口

:::: 默认情况下，webview 内部所有打开窗口的行为都会被拦截，如 `&lt;a target="_blank"&gt;`、`window.open()`，可以通过侦听该事件进行相应处理

```javascript readOnly
webview.addEventListener(
  "newwindow",
  ({
    window, // 新窗口
    targetUrl,
    initialWidth,
    initialHeight,
    name,
    windowOpenDisposition, // 行为倾向
  }) => {
    // 可以把新窗口挂载到另一个 webview 上
    // window.attach(anotherWebview);
    if (windowOpenDisposition === "ignore") {
      return;
    } else if (windowOpenDisposition === "current_tab") {
      webview.src = targetUrl;
    } else if (windowOpenDisposition === "save_to_disk") {
      fetch(targetUrl)
        .then((res) => res.arrayBuffer())
        .then((arrayBuffer) => {
          const fs = require("node:fs");
          const path = require("node:path");
          const buffer = Buffer.from(arrayBuffer);
          const fileName = path.basename(new URL(targetUrl).pathname);
          const filePath = path.join(process.env.USERPROFILE, "downloads", fileName);
          fs.writeFileSync(filePath, buffer);
        });
    } else {
      // "new_background_tab" | "new_foreground_tab" | "new_window" | "new_popup"
      nw.Window.open(targetUrl, { width: initialWidth, height: initialHeight, title: name });
    }
  }
);
```

["close"](API:E)
:::E 请求关闭

:::: 默认情况下，webview 的关闭行为会被拦截，如 `window.close()`，可以通过侦听该事件进行相应处理

```javascript readOnly
webview.addEventListener("close", () => {
  // 移除 webview
  webview.remove();

  // 或者关闭窗口
  // nw.Window.get().close();
});
```

["dialog"](API:E)
:::E 请求弹出模态对话框

:::: 默认情况下，webview 内部弹出模态对话框的行为会被拦截，包括 `alert()`、`confirm()`、`prompt()`，可以通过侦听该事件进行相应处理

```javascript readOnly
webview.addEventListener(
  "dialog",
  ({
    dialog, // 对话框
    messageType, // 消息类型
    messageText, // 消息文本
    defaultPromptText, // 默认提示词
  }) => {
    switch (messageType) {
      case "alert":
        alert(messageText);
        dialog.ok();
        break;
      case "confirm":
        dialog[confirm(messageText) ? "ok" : "cancel"]();
        break;
      case "prompt":
        const result = prompt(messageText, defaultPromptText);
        dialog[typeof result === "string" ? "ok" : "cancel"](result);
        break;
    }
  }
);
```

["consolemessage"](API:E)
:::E 控制台输出

```javascript readOnly
webview.addEventListener("consolemessage", ({ level, message, line, sourceId }) => {
  console.log(message);
});
```

["permissionrequest"](API:E)
:::E 请求特殊权限

```javascript readOnly
webview.addEventListener("permissionrequest", ({ permission, request }) => {
  // "media" | "geolocation" | "pointerLock" | "download" | "loadplugin" | "filesystem" | "fullscreen" | "hid"
  console.log(permission); // 请求的权限
  request.allow(); // 允许
});
```

["unresponsive"](API:E)
["responsive"](API:E)
:::E webvierw 进程无响应和从无响应中恢复

```javascript readOnly
// 无响应时让 webview 半透明
webview.addEventListener("unresponsive", ({ processID }) => {
  webview.style.opacity = "0.5";
});
// 重新响应时恢复正常透明度
webview.addEventListener("responsive", ({ processID }) => {
  webview.style.opacity = "1";
});
```

["exit"](API:E)
:::E 进程退出

```javascript readOnly
webview.addEventListener("exit", ({ processID, reason }) => {
  // "normal" | "abnormal" | "crash" | "kill"
  console.log(reason); // killed
});

setTimeout(() => webview.terminate(), 2000);
```

::

:: 通信

[`构建消息通道`](API:X)
:::X 构建消息通道

```javascript readOnly
// webview 文档加载完成
webview.addEventListener("loadstop", (e) => {
  // 向 webview 注入脚本，以侦听来自应用的消息
  webview.executeScript({
    // mainWorld: true, // 如果需要访问 webview 的真实上下文
    code: `
      let source;
      // 侦听来自应用的消息
      window.addEventListener("message", (event) => {
        if (event.data === "你好啊，webview！") {
          console.log(event.data); // 你好啊，webview！
          // 缓存外层窗口引用
          source = event.source;
          // 侦听到来自应用的初始化消息，得到外层窗口的引用，可以通过它向应用发送消息
          source.postMessage("你好啊，应用！", "*");
        }
      });
    `,
  });
  // webview `loadstop`之后，可以通过`contentWindow`向其发送消息
  // 发送初始化消息（主要是为了把外层窗口的引用传给webview）
  webview.contentWindow.postMessage("你好啊，webview！", "*");
});

// 侦听消息
window.addEventListener("message", (event) => {
  // 如果是来自 webview 的消息
  if (event.source === webview.contentWindow) {
    console.log(event.data); // 你好啊，应用！
  }
});
```

::
