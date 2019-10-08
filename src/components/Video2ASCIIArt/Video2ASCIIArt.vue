<template>
    <div style="width: 100%; position: relative;">
        <div style="opacity: 0; font-size: 0;">
            <slot></slot>
        </div>
        <canvas
            style="position: absolute;top: 0;left: 0;pointer-events: none;"
            ref="canvasDOMRef"
            :width="canvasW"
            :height="canvasH"
        ></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
import Processor from './Processor.js'
import EventHandler from '../../utils/EventHandler.js'

export default {
    name: 'Video2ASCIIArt',
    props: {
        charPpi: {
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
                        charPpi: +this.charPpi,
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
        charPpi(to) {
            this.updatecharPpi(to)
        },
        color(to) {
            this.updateColor(to)
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
        updatecharPpi(newPPI) {
            this.processor.changecharPpi(newPPI)
        },
        updateColor(newColor) {
            this.processor.changeColor(newColor)
        },
        loop() {
            this.processor.update()
            this.animationHook = requestAnimationFrame(this.loop)
        },

        play() {
            this.loop()
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
</style>
