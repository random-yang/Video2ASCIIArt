<template>
    <div class="video-container">
        <video style="width:100%;" :src="videoURL" controls="controls" ref="videoDOMRef" id="video"></video>
        <canvas :width="canvasW" :height="canvasH" id="canvas"></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
import Processor from './utils/Processor.js'
import EventHandler from './utils/EventHandler.js'

let canvas = null
let video = null
let animationHook = null
let processor = null
let handlers = []

export default {
    name: '',
    props: {
        videoURL: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            canvasW: 0,
            canvasH: 0
        }
    },
    mounted() {
        this.setCanvasRect()
        canvas = document.getElementById('canvas')
        video = document.getElementById('video')

        handlers.push(
            new EventHandler(video, 'canplay', () => {
                processor = new Processor(video, canvas)
            })
        )

        handlers.push(
            new EventHandler(video, 'play', () => {
                this.draw()
            })
        )

        handlers.push(
            new EventHandler(video, 'pause', () => {
                cancelAnimationFrame(animationHook)
            })
        )

        handlers.push(
            new EventHandler(video, 'ended', () => {
                cancelAnimationFrame(animationHook)
            })
        )
    },
    destroyed() {
        handlers.forEach(handler => {
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
            processor.update()
            animationHook = requestAnimationFrame(this.draw)
        }
    }
}
</script>

<style scoped lang="scss">
.video-container {
    width: 100%;
}
</style>
