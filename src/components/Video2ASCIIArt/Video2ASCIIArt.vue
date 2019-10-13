<template>
    <div class="asciiart__main">
        <div class="asciiart__video">
            <slot></slot>
        </div>
        <div class="asciiart__canvas">
            <canvas ref="canvasDOMRef" :width="canvasW" :height="canvasH"></canvas>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Processor from './Processor.js'
import EventHandler from '../../utils/EventHandler.js'

export default {
    name: 'Video2ASCIIArt',
    props: {
        charppi: {
            type: [Number, String],
            default: 1
        },
        color: {
            type: String,
            default: '#000000'
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
            handlers: []
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
                        charppi: +this.charppi,
                        color: this.color
                    })
            })
        )
        this.handlers.push(
            new EventHandler(this.video, 'play', () => {
                this.play()
            })
        )
        this.handlers.push(
            new EventHandler(this.video, 'pause', () => {
                this.pause()
            })
        )
        this.handlers.push(
            new EventHandler(this.video, 'ended', () => {
                this.end()
            })
        )
    },
    destroyed() {
        this.handlers.forEach(handler => {
            handler.destroy()
        })
    },
    watch: {
        charppi(to) {
            this.updatecharppi(to)
        },
        color(to) {
            this.updateColor(to)
        }
    },
    methods: {
        loop() {
            this.animationHook = requestAnimationFrame(this.loop)
            this.processor.update()
        },

        setCanvasRect() {
            this.video.addEventListener('canplay', () => {
                const { width, height } = this.video.getBoundingClientRect()
                this.canvasW = width
                this.canvasH = height
            })
        },
        updatecharppi(newPPI) {
            this.processor.changecharppi(newPPI)
        },
        updateColor(newColor) {
            this.processor.changeColor(newColor)
        },

        play() {
            requestAnimationFrame(this.loop)
        },
        pause() {
            this.end()
        },
        end() {
            this.animationHook && cancelAnimationFrame(this.animationHook)
        }
    }
}
</script>

<style scoped lang="scss">
.asciiart__main {
    width: 100%;
    position: relative;
}

.asciiart__video {
    opacity: 0;
    font-size: 0;
}

.asciiart__canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>
