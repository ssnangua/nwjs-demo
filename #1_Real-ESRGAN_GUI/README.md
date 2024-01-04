# Real-ESRGAN GUI

给 [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN)（动漫图片和视频增强工具）写个界面。

## 使用方法（1）

从 [百度网盘](https://pan.baidu.com/s/1w5kaPDPS98ZWSGsqxEvdrA?pwd=u454) 下载完整包，开箱即用。

## 使用方法（2）

1. 下载 [NW.js](https://nwjs.io/) 的 SDK 包，把 `package.nw` 放到根目录（和 `nw.exe` 同一级）
2. 下载 [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN?tab=readme-ov-file#portable-executable-files-ncnn) 的 Windows 可执行文件，放到 `package.nw/bin` 目录下（`packagenw/bin/realesrgan-ncnn-vulkan.exe`）
3. 下载 [FFmpeg](https://www.gyan.dev/ffmpeg/builds/) 的 Windows 可执行文件（`ffmpeg-git-full.7z`），放到 `package.nw/bin` 目录下（`packagenw/bin/ffmpeg.exe`）
4. 启动 `nw.exe`
