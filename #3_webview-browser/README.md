# `<webview>` 使用示例

> **PS**：本示例主要演示 `<webview>` 的基础用法，更多内容可参考 [NW.js 浏览器 Demo](https://github.com/ssnangua/nwjs-browser-demo)

使用 `<webview>` 实现浏览器的基本功能：

- 网站图标和标题
- 导航（前进、后退、刷新、停止、地址跳转）
- 查找
- 在另一个 `<webview>` 中加载开发者工具
- 注入 css 样式和 js 脚本
- 构建 `<webview>` 消息通道



## 使用方法

1. 下载 [NW.js](https://nwjs.io/) 的 SDK 包，把 `package.nw` 放到根目录（和 `nw.exe` 同一级）
2. 启动 `nw.exe`
