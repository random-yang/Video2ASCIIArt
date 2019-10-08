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
    <!-- 注意html中用 “连字符” 替代 “驼峰”-->
    <demo :char-ppi="charPpi" :color="color">
        <video src="your/video/url" controls="controls" crossorigin=""></video>
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

```js
// main.js
```

```vue
<template>
    <Video2ASCIIArt />
</template>
<script>
import Video2ASCIIArt from 'Video2ASCIIArt'
</script>
<style></style>
```

## 关于 demo 页面

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn run serve
```

### Compiles and minifies for production

```
yarn run build
```

### Run your tests

```
yarn run test
```

### Lints and fixes files

```
yarn run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
