<meta order="1" description="package.json（配置文件）" document="https://nwjs-docs.readthedocs.io/zh/latest/References/Manifest%20Format/" />

:: 必要字段

[name](API)
::: 应用名

```json
"name": "myapp",
```

[main](API)
::: 应用入口

```json
// 本地页面：会自动打开一个窗口来加载该页面，默认启用 Node 特性
"main": "index.html",

// 脚本文件：会在背景页中执行，可以在该脚本中手动打开主窗口
"main": "main.js",

// 远程 URL：会自动打开一个窗口来加载该页面，默认禁用 Node 特性，需要在 `node-remote` 中手动启用
"main": "https://www.mywebsite.com",
```

::: 版本号

:::: 不是必要字段，但一般都会加上

```json
"version": "1.0.0",
```

::

:: 脚本字段

[bg-script](API)
::: 背景页脚本

:::: 会在背景页中执行，不会在独立进程窗口中执行

```json
"bg-script": "bg-script.js",
```

[node-main](API)
::: Node 脚本

:::: 会在背景页中执行，也会在独立进程窗口中执行

```json
"node-main": "node-main.js",
```

[inject_js_start](API)
[inject_js_end](API)
::: 注入脚本

:::: 自动在窗口中注入的脚本

```json
// 在 CSS 执行后注入
"inject_js_start": "inject_js_start.js",

// 在 onload 之前注入
"inject_js_end": "inject_js_end.js",
```

::

:: Node 特性控制

[nodejs](API)
::: 是否启用 Node 特性

:::: 本地页面默认启用 Node 特性，想要禁用，可以把 `nodejs` 设为 `false`

:::: 远程 URL 默认禁用 Node 特性，想要启用，需要 `nodejs` 为 `true`，且 URL 符合 `node-remote` 规则

```json
"nodejs": false,
```

[node-remote](API)
::: 启用 Node 特性的远程站点

:::: 值的格式遵循 Chrome 扩展的 <a href="javascript:;" onclick="nw.Shell.openExternal('https://developer.chrome.com/extensions/match_patterns')">匹配模式</a>

```json
// 对特定站点启用 Node 特性
"node-remote": "https://www.website.com",

// 对多个站点启用 Node 特性
"node-remote": [
  "https://www.website1.com",
  "https://www.website2.com",
],

// 对所有远程站点启用 Node 特性
"node-remote": "<all_urls>",
```

::

:: window 子字段

::: window 子字段填在这里

```json
{
  "window": {
    // ...这里
  }
}
```

[`window.`id](API)
::: 窗口 ID

:::: 用于识别窗口，以记录窗口的大小和位置，当拥有相同 id 的窗口被重新打开时会恢复记录的状态

```json
"id": "mainWindow",
```

[`window.`title](API)
::: 窗口标题

:::: 窗口标题显示的优先级是 `document.title` &gt; `win.title` &gt; `nw.App.manifest.name`

```json
"title": "主窗口",
```

[`window.`icon](API)
::: 窗口图标

:::: 只支持 `PNG` 格式的图片

```json
"icon": "icon.png",
```

[`window.`width](API)
[`window.`height](API)
::: 窗口大小

```json
"width": 814,
"height": 638,
```

[`window.`resizable](API)
::: 窗口是否可以调整大小

```json
"resizable": true,
```

[`window.`min_width](API)
[`window.`min_height](API)
[`window.`max_width](API)
[`window.`max_height](API)
::: 窗口大小限制

```json
"min_width": 400,
"min_height": 300,
"max_width": 1000,
"max_height": 800,
```

[`window.`position](API)
::: 窗口位置

:::: 可设置为 `null`（默认）、`center`（屏幕中心）、`mouse`（鼠标位置）

```json
"position": "center",
```

[`window.`always_on_top](API)
::: 窗口是否始终置顶

```json
"always_on_top": false,
```

[`window.`frame](API)
::: 窗口是否显示外框

:::: 设置为 `false` 时会显示为无边框窗口

```json
"frame": true,
```

[`window.`transparent](API)
::: 窗口是否透明

```json
"transparent": false,
```

[`window.`fullscreen](API)
::: 窗口是否全屏

```json
"fullscreen": false,
```

[`window.`kiosk](API)
::: 窗口是否进入 Kiosk 模式

```json
"kiosk": false,
```

[`window.`show](API)
::: 窗口是否显示

```json
"show": true,
```

[`window.`show_in_taskbar](API)
::: 是否在任务栏中显示

```json
"show_in_taskbar": true,
```

[`window.`as_desktop `(Linux)`](API)
::: 在 X11 环境下，作为桌面背景窗口显示

```json
"as_desktop": false,
```

[`window.`visible_on_all_workspaces `(Mac & Linux)`](API)
::: 窗口是否同时在所有的工作区中可见

:::: 只在支持多工作区的平台上有效，目前有 Mac OS X 和 Linux

```json
"as_desvisible_on_all_workspacesktop": false,
```

::

:: webkit 子字段

::: webkit 子字段填在这里

```json
{
  "webkit": {
    // ...这里
  }
}
```

[`webkit.`double_tap_to_zoom_enabled](API)
::: 是否启用 mac 上的两指缩放功能

```json
"double_tap_to_zoom_enabled": false,
```

[`webkit.`plugin](API)
::: 是否加载外部浏览器插件，如 Flash

```json
"plugin": true,
```

::

:: Chromium 命令行参数

[chromium-args](API)
::: 加载扩展程序

```json
"chromium-args": "--load-extension='扩展程序路径'",
```

[chromium-args](API)
::: 让透明窗口支持鼠标点击穿透

```json
"chromium-args": "--disable-gpu",
```

[chromium-args](API)
::: 所有窗口启用混合环境模式

```json
"chromium-args": "--mixed-context",
```

[chromium-args](API)
::: 禁用开发者工具

```json
"chromium-args": "--disable-devtools",
```

[chromium-args](API)
::: Web Workers 启用 Node 特性

```json
"chromium-args": "--enable-node-worker",
```

[chromium-args](API)

::: `requestAnimationFrame()` 始终运行

```json
"chromium-args": "--disable-raf-throttling",
```

::

:: 其它

[domain](API)
::: 设置应用程序的主机名

```json
// 应用的 origin 会变成 `chrome-extension://myapp`
"domain": "myapp",
```

[user-agent](API)
::: 重写从应用发出的 HTTP 请求的 User-Agent

```json
"user-agent": "myapp/1.0.0",
```

[js-flags](API)
::: 传递 flag 给 V8 引擎

:::: 可以在 <a href="javascript:;" onclick="nw.Shell.openExternal('https://chromium.googlesource.com/v8/v8/+/refs/heads/main/src/flags/flag-definitions.h')">这里</a> 查看 V8 支持的 flag 列表

```json
// 打开 Harmony Proxies 和 Collections 特性
"js-flags": "--harmony_proxies --harmony_collections",
```

[additional_trust_anchors](API)
::: PEM 编码的证书列表

:::: 这些证书将作为附加根证书用于验证，以允许使用自签名证书或自定义 CA 颁发的证书连接到服务

```json
"additional_trust_anchors": [
  "-----BEGIN CERTIFICATE-----\n...certificate data...\n-----END CERTIFICATE-----\n"
],
```

[dom_storage_quota](API)
::: DOM 存储配额的兆字节（MB）数

:::: 建议设置为期望值的两倍

```json
"dom_storage_quota": 10,
```

::
