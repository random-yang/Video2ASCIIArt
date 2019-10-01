<template>
    <div class="asciiart-container">
        <video :src="videoURL" class="asciiart__video" controls="controls" ref="videoDOMRef"></video>
        <canvas :width="canvasW" :height="canvasH" class="asciiart__canvas" ref="canvasDOMRef"></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
import Processor from './Processor.js'
import EventHandler from '../../utils/EventHandler.js'

export default {
    name: 'Video2ASCIIArt',
    props: {
        videoURL: {
            type: String,
            default: ''
        },
        pxPerChar: {
            type: Number,
            default: 10
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
        this.setCanvasRect()
        this.canvas = this.$refs.canvasDOMRef
        this.video = this.$refs.videoDOMRef

        this.handlers.push(
            new EventHandler(this.video, 'canplay', () => {
                this.processor = new Processor(this.video, this.canvas)
            })
        )

        this.handlers.push(
            new EventHandler(this.video, 'play', () => {
                this.draw()
            })
        )

        this.handlers.push(
            new EventHandler(this.video, 'pause', () => {
                cancelAnimationFrame(this.animationHook)
            })
        )

        this.handlers.push(
            new EventHandler(this.video, 'ended', () => {
                cancelAnimationFrame(this.animationHook)
            })
        )
    },
    destroyed() {
        this.handlers.forEach(handler => {
            handler.destroy()
        })
    },
    methods: {
        setCanvasRect() {
            this.$refs.videoDOMRef.addEventListener('canplay', () => {
                const {
                    width,
                    height
                } = this.$refs.videoDOMRef.getBoundingClientRect()
                this.canvasW = width
                this.canvasH = height
            })
        },

        draw() {
            this.processor.update()
            this.animationHook = requestAnimationFrame(this.draw)
        }
    }
}
</script>

<style scoped lang="scss">
.asciiart-container {
    width: 100%;
    position: relative;
}

.asciiart__video {
    width: 100%;
    opacity: 0;
}

.asciiart__canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}
</style>
