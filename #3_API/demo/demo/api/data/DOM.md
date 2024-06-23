<meta order="2" description="DOM 的改动" document="https://nwjs-docs.readthedocs.io/zh/latest/References/Changes%20to%20DOM/" />

:: &lt;input type="file"&gt;（文件选择器）

[`input.`onchange](API:E)
:::E 选中的文件发生变化

```html
<input type="file" id="input1" onchange="console.log('change', this.value, this.files)" />
```

或通过 `addEventListener` 侦听

```javascript
document.querySelector("#input1").addEventListener("change", (e) => {
  console.log("change", e.target.value, e.target.files);
});
```

<div class="element">
  <input type="file" onchange="console.log('change', this.value, this.files)" />
</div>

[`input.`oncancel](API:E)
:::E 选中的文件没有发生变化

```html
<input type="file" id="input2" oncancel="console.log('cancel', this.value, this.files)" />
```

或通过 `addEventListener` 侦听

```javascript
document.querySelector("#input2").addEventListener("cancel", (e) => {
  console.log("cancel", e.target.value, e.target.files);
});
```

<div class="element">
  <input type="file" oncancel="console.log('cancel', this.value, this.files)" />
</div>

::: <p style="padding-bottom:10px"><b>说明：</b>下面的示例默认都加了上面的 `change` 和 `cancel` 事件<p>

[`input.`multiple](API:P)
:::P 文件多选

```html
<input type="file" multiple />
```

<div class="element">
  <input type="file" multiple onchange="console.log('change', this.value, this.files)" oncancel="console.log('cancel', this.value, this.files)" />
</div>

[`input.`accept](API:P)
:::P 文件类型

```html
<input type="file" accept="image/*,.txt" />
```

<div class="element">
  <input type="file" accept="image/*,.txt" onchange="console.log('change', this.value, this.files)" oncancel="console.log('cancel', this.value, this.files)" />
</div>

[`input.`nwdirectory](API:P)
[`input.`nwdirectorydesc](API:P)
:::P 选择目录

```html
<input type="file" nwdirectory nwdirectorydesc="选择器标题" />
```

<div class="element">
  <input type="file" nwdirectory nwdirectorydesc="选择器标题" onchange="console.log('change', this.value, this.files)" oncancel="console.log('cancel', this.value, this.files)" />
</div>

[`input.`nwsaveas](API:P)
:::P 另存为

```html
<input type="file" nwsaveas="默认文件名.txt" />
```

<div class="element">
  <input type="file" nwsaveas="默认文件名.txt" onchange="console.log('change', this.value, this.files)" oncancel="console.log('cancel', this.value, this.files)" />
</div>

[`input.`nwworkingdir](API:P)
:::P 初始目录

```html
<input type="file" nwworkingdir="c:" />
```

<div class="element">
  <input type="file" nwworkingdir="c:" onchange="console.log('change', this.value, this.files)" oncancel="console.log('cancel', this.value, this.files)" />
</div>

::

:: &lt;iframe&gt;

[`iframe.`nwdisable](API:P)
:::P 禁用 NW.js 特性

:::: 没有 Node 环境和 `nw.*` API

```html
<iframe src="inner.html" nwdisable></iframe>
```

[`iframe.`nwfaketop](API:P)
:::P 隔离运行环境

:::: 无法访问上层页面

```html
<iframe src="inner.html" nwfaketop></iframe>
```

[`iframe.`nwUserAgent](API:P)
:::P 重写 User-Agent

```html
<iframe src="inner.html" nwUserAgent="myapp/1.0.0"></iframe>
```

::

:: &lt;webview&gt;（单独的进程）

[`webview.`allownw](API:P)
:::P 启用 NW.js 特性

```html
<webview src="http://127.0.0.1:5500/inner.html" allownw></webview>
```

[`webview.`partition="trusted"](API:P)
:::P 加载本地页面

```html
<webview src="inner.html" partition="trusted"></webview>
```

还需要在 `package.json` 中加上下面的配置

```json
"webview": {
  "partitions": [
    {
      "name": "trusted",
      "accessible_resources": ["<all_urls>"]
    }
  ]
},
```

[`webview.`showDevTools(show, container?)](API:M)
:::M 打开或关闭开发者工具

```javascript readOnly
// 打开开发者工具
webview.showDevTools(true);

// 关闭开发者工具
webview.showDevTools(false);
```

在另一个 `&lt;webview&gt;` 中加载开发者工具

```html
<webview id="webview" src="https://nwjs.io/"></webview>
<webview id="devTools" src="about:blank"></webview>
<script>
  const webview = document.querySelector("#webview");
  const devTools = document.querySelector("#devTools");
  devTools.addEventListener("contentload", () => {
    webview.showDevTools(true, devTools);
  });
</script>
```

[`webview.`inspectElementAt(x, y)](API:M)
:::M 检查指定坐标的页面元素

```javascript readOnly
webview.inspectElementAt(100, 200);
```

::

:: -webkit-app-region

[-webkit-app-region](API:X)
:::X 无边框窗口的拖动

:::: 为了方便处理无边框窗口的拖动，NW.js 新增了 `-webkit-app-region` 样式

```css
/* 把标题栏视为窗口外框，可用于拖动窗口 */
.title-bar {
  -webkit-app-region: drag;

  /* 需要交互的子元素，重置样式 */
  & .title-bar-controls {
    -webkit-app-region: no-drag;
  }
}
```

::

:: ffmpeg

[`替换 ffmpeg`](API:X)
:::X 替换 ffmpeg

:::: NW.js 程序包里的 `ffmpeg` 是阉割过的，功能不完整，如果有播放音视频的需求，需要到 <a href="javascript:;" onclick="nw.Shell.openExternal('https://github.com/nwjs-ffmpeg-prebuilt/nwjs-ffmpeg-prebuilt/releases')">这个仓库</a> 下载相应版本、相应平台架构的预编译文件，替换 NW.js 程序包根目录下的 `ffmpeg`

::
