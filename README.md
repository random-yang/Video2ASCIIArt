# video2asciiart

<img src="./src/assets/logo.png" width="100px" align="center"/>

## 如何使用

### 通过 npm 引入

[实际效果 demo](https://officialyoungx.github.io/Video2ASCIIArt/dist/)

```bash
npm install video2asciiart
# or
yarn add video2asciiart
```

xxx.vue

```vue
<template>
    <div class="container">
        <Video2ASCIIArt>
            <video :src="videoURL" controls="controls" crossorigin=""></video>
        </Video2ASCIIArt>
    </div>
</template>
<script>
import Video2ASCIIArt from 'Video2ASCIIArt'

export default {
    components: {
        Video2ASCIIArt
    }
}
</script>
```

### CDN `<script>` 标签引入

查看 codepen[live demo]()

```html
<meta charset="utf-8" />
<title>Video2ASCIIArt demo</title>
<!-- import vue -->
<script src="https://unpkg.com/vue"></script>
<!-- import the component -->
<script src="./Video2ASCIIArt.umd.js"></script>

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
        },
        data: {
            charPpi: 2,
            color: 'gray'
        }
    }).$mount('#app')
</script>
```

## 如何使用

## 贡献代码

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
