<meta order="3" description="Node 的改动" document="https://nwjs-docs.readthedocs.io/zh/latest/References/Changes%20to%20Node/" />

:: process

[`process.`platform](API:P)
:::P 获取当前系统平台

```javascript
alert(process.platform); // win32 | darwin | linux
```

[`process.`versions](API:P)
:::P 获取各种依赖的版本信息

```javascript
alert(
  JSON.stringify(
    {
      flavor: process.versions["nw-flavor"], // NW.js 程序包类型：normal | sdk
      nw: process.versions.nw, // NW.js 版本
      chromium: process.versions.chromium, // Chromium 版本
      node: process.versions.node, // Node.js 版本
      v8: process.versions.v8, // V8 引擎版本
    },
    null,
    4
  )
);
```

[`process.env.`USERPROFILE](API:P)
:::P 获取用户主目录

```javascript
alert(process.env.USERPROFILE);
```

相当于 `os` 模块的 `homedir()`

```javascript
const os = require("node:os");
alert(os.homedir());
```

打开下载目录

```javascript
const path = require("node:path");
nw.Shell.openItem(path.join(process.env.USERPROFILE, "Downloads"));
```

常用目录：

- 桌面 - `Desktop`
- 下载 - `Downloads`
- 文档 - `Documents`
- 图片 - `Pictures`
- 视频 - `Videos`
- 音乐 - `Music`

::

:: require

[require()](API:M)
:::M 页面引入 Node 模块，相对路径基于页面

```plaintext
├ index.html
└ script
  ├ index.js
  ├ es-module.js
  └ node-module.js
```

```javascript readOnly
// index.js
import "./es-module.js"; // √
require("./node-module.js"); // ×
require("./script/node-module.js"); // √
```

::

:: console

::: Node 环境的 console 被重定向到背景页的开发者工具中

::
