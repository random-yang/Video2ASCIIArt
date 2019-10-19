<h1 align="center">Video2ASCIIArt</h1>
<p align="center">🎥 🎨一个将普通视频实时转换为字符画视频的Vue组件</p>

<div align=center><img src="https://raw.githubusercontent.com/OfficialYoungX/Video2ASCIIArt/master/src/assets/showcase.png"/></div>

<small>视频素材来源[KBHD](https://www.youtube.com/watch?v=OoY7zp8GkLI&t=2s)</small>

![npm version](https://img.shields.io/npm/v/video2asciiart?style=flat-square)
![week download](https://img.shields.io/npm/dw/video2asciiart?style=flat-square)

[English]('https://github.com/OfficialYoungX/Video2ASCIIArt/blob/master/README-en.md')\|[中文]('https://github.com/OfficialYoungX/Video2ASCIIArt/blob/master/README.md')

## 📒 如何使用

### 通过 npm 引入

[试玩儿](https://officialyoungx.github.io/Video2ASCIIArt/dist/)

```shell
$ npm install video2asciiart
# or
$ yarn add video2asciiart
```

```vue
<template>
    <div class="container">
        <Video2ASCIIArt>
            <video :src="videoURL" controls="controls" crossorigin=""></video>
        </Video2ASCIIArt>
    </div>
</template>
<script>
import Video2ASCIIArt from 'video2asciiart'

export default {
    components: {
        Video2ASCIIArt
    }
}
</script>
```

### CDN `<script>` 标签引入

[![标签用法](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/static-rnxe4?fontsize=14)
<small>（此在线 demo 在 safari 上可能会有问题）</small>

```html
<meta charset="utf-8" />
<title>Video2ASCIIArt demo</title>
<!-- import vue -->
<script src="https://unpkg.com/vue"></script>
<!-- import the component -->
<script src="https://cdn.jsdelivr.net/npm/video2asciiart@0.1.2/lib/Video2ASCIIArt.umd.js"></script>

<div id="app">
    <demo charppi="2" color="gray">
        <!-- normal video tag -->
        <video
            src="../../your/video/url"
            controls="controls"
            crossorigin=""
        ></video>
    </demo>
</div>

<script>
    new Vue({
        components: {
            demo: Video2ASCIIArt
        }
    }).$mount('#app')
</script>
```

### 组件属性

| Props Name | Type             | Default   | Description                     |
| ---------- | ---------------- | --------- | ------------------------------- |
| charppi    | `String\|Number` | `1`       | 改变字符的密度[0.25\|0.5\|1\|2] |
| color      | `String`         | `#000000` | 控制字符的颜色 (css like)       |

## ⛏️ 贡献代码

欢迎 pr && issue！

### 安装依赖

```
yarn install
```

### 快速开发(HMR)

```
yarn run serve
```

### 构建打包组件

```
yarn run build:lib
```

### 构建打包 demo

```
yarn run build:demo
```

## TODO

-   [ ] 内存优化（目前打开开发者工具查看内存，有比较明显的阶段性内存递增和 GC，而且占用的内存较大）
-   [ ] 丰富控件功能
-   [ ] 增加字符画的可调节参数的维度
-   [x] resize

## License

MIT
