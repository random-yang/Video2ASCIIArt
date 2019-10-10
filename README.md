# video2asciiart

<img src="./src/assets/logo.png" width="100px" align="center"/>

## 如何引用/安装

### 通过 npm 引入

```
npm install video2asciiart-vue --save
```

### CDN `<script>` 标签引入

```html
<meta charset="utf-8" />
<title>Video2ASCIIArt demo</title>
<!-- import vue -->
<script src="https://unpkg.com/vue"></script>
<!-- import the component -->
<script src="./Video2ASCIIArt.umd.js"></script>

<div id="app">
    <demo charppi="2" color="gray">
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

查看[codepen]()live demo

## 如何使用

[实际效果演示]()
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
<style>
...;
</style>
```

## 贡献代码

### 安装依赖

```
yarn install
```

### 快速开发

```
yarn run serve
```

### 同时构建 demo 和组件

```
yarn run build
```

### 单独构建组件

```
yarn run build:lib
```

### 单独构建 demo

```
yarn run build:demo
```

### 修改构建配置

查看 [Configuration Reference](https://cli.vuejs.org/config/).
