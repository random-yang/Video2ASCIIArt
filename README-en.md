<h1 align="center">Video2ASCIIArt</h1>
<p align="center">🎥 🎨A Vue component that converts ordinary video into character-picture video in real time</p>

<div align=center><img src="https://raw.githubusercontent.com/OfficialYoungX/Video2ASCIIArt/master/src/assets/showcase.png"/></div>

<small>Video material source [KBHD](https://www.youtube.com/watch?v=OoY7zp8GkLI&t=2s)</small>

![npm version](https://img.shields.io/npm/v/video2asciiart?style=flat-square)
![week download](https://img.shields.io/npm/dw/video2asciiart?style=flat-square)

[English]('https://github.com/OfficialYoungX/Video2ASCIIArt/blob/master/README-en.md')\|[中文]('https://github.com/OfficialYoungX/Video2ASCIIArt/blob/master/README.md')

## 📒 Usage

### Install with npm

[Try it](https://officialyoungx.github.io/Video2ASCIIArt/dist/) at once!

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
Import Video2ASCIIArt from 'video2asciiart'

Export default {
    Components: {
        Video2ASCIIArt
    }
}
</script>
```

### CDN `<script>`

[![tag usage](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/static-rnxe4?fontsize=14)

<small> (This live demo may have problems on safari)</small>

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
            Src="../../your/video/url"
            Controlscontrols"controls"
            Crossorigin=""
        ></video>
    </demo>
</div>

<script>
    New vue({
        Components: {
            Demo: Video2ASCIIArt
        }
    }).$mount('#app')
</script>
```

### Component Attributes

| Props Name | Type             | Default   | Description                                        |
| ---------- | ---------------- | --------- | -------------------------------------------------- |
| charppi    | `String\|Number` | `1`       | Change the density of characters [0.25\|0.5\|1\|2] |
| color      | `String`         | `#000000` | Controlling the color of characters (css like)     |

## Contributing

Welcome to pr && issue!

### Installation dependencies

```
Yarn install
```

### Development (HMR)

```
Yarn run serve
```

### Build the component

```
Yarn run build:lib
```

### Build the demo

```
Yarn run build:demo
```

## TODO

-   [ ] Memory optimization (currently open developer tools to view memory, there are obvious phased memory increments and GC, and it takes up a lot of memory)
-   [ ] Rich control features
-   [ ] Increase the dimension of the adjustable parameters of the character drawing
-   [x] resize

## License

MIT
