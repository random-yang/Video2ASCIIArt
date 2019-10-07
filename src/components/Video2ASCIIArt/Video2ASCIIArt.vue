<template>
    <div :class="customClass" class="asciiart-container">
        <div class="asciiart__video">
            <slot></slot>
        </div>
        <canvas :width="canvasW" :height="canvasH" class="asciiart__canvas" ref="canvasDOMRef"></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
import Processor from './Processor.js'
import EventHandler from '../../utils/EventHandler.js'

export default {
    name: 'Video2ASCIIArt',
    props: {
        charPPI: {
            type: [Number, String],
            default: 1
        },
        src: {
            type: String,
            default: ''
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            canvasW: 0,
            canvasH: 0,
            canvas: null,
            video: null,
            animationHook: null,
            processor: null,
            handlers: [],
            isPlay: false
        }
    },
    mounted() {
        this.canvas = this.$refs.canvasDOMRef
        this.video = this.$slots.default[0].elm // 从插槽获取 DOM Video
        this.setCanvasRect()

        // 非指令事件绑定
        this.handlers.push(
            new EventHandler(this.video, 'canplay', () => {
                this.processor =
                    this.processor ||
                    new Processor(this.video, this.canvas, {
                        charPPI: +this.charPPI
                    })
            })
        )
        this.handlers.push(
            new EventHandler(this.video, 'play', () => {
                this.isPlay = true
                this.loop()
            })
        )
        this.handlers.push(
            new EventHandler(this.video, 'pause', () => {
                this.isPlay = false
                cancelAnimationFrame(this.animationHook)
            })
        )
        this.handlers.push(
            new EventHandler(this.video, 'ended', () => {
                this.isPlay = false
                cancelAnimationFrame(this.animationHook)
            })
        )
    },
    destroyed() {
        this.handlers.forEach(handler => {
            handler.destroy()
        })
    },
    watch: {
        charPPI(to) {
            this.updateCharPPI(to)
        }
    },
    methods: {
        setCanvasRect() {
            this.video.addEventListener('canplay', () => {
                const { width, height } = this.video.getBoundingClientRect()
                this.canvasW = width
                this.canvasH = height
            })
        },
        updateCharPPI(newPPI) {
            this.processor.changeCharPPI(newPPI)
        },
        loop() {
            this.processor.update()
            this.animationHook = requestAnimationFrame(this.loop)
        }
    }
}
</script>

<style scoped lang="scss">
.asciiart-container {
    position: relative;
}

.asciiart__video {
    video {
        width: 100%;
    }
    opacity: 0;
    font-size: 0; // 去除空白间隔
}

.asciiart__canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    background: black;
}
</style>
