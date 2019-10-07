<template>
    <div class="asciiart-container">
        <video :src="videoURL" class="asciiart__video" controls="controls" ref="videoDOMRef"></video>
        <canvas
            :width="canvasW"
            :height="canvasH"
            :class="{'asciiart__canvas--playing': isPlay}"
            class="asciiart__canvas"
            ref="canvasDOMRef"
        ></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
import Processor from './Processor.js'
import EventHandler from '../../utils/EventHandler.js'

export default {
    name: 'Video2ASCIIArt',
    props: {
        videoElementOption: {
            type: Object,
            default() {
                return {
                    crossOrigin: ''
                }
            }
        },
        videoURL: {
            type: String,
            default: ''
        },
        charPPI: {
            type: [Number, String],
            default: 1
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
        this.setCanvasRect()
        this.canvas = this.$refs.canvasDOMRef
        this.video = this.$refs.videoDOMRef
        this.video.crossOrigin = this.videoElementOption.crossOrigin

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
            this.$refs.videoDOMRef.addEventListener('canplay', () => {
                const {
                    width,
                    height
                } = this.$refs.videoDOMRef.getBoundingClientRect()
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
}

.asciiart__video {
    width: 80%;
    transition: box-shadow 0.3s ease-out;
    &:hover {
        box-shadow: 4px 10px 30px rgba(0, 0, 0, 0.3);
    }
}

.asciiart__canvas {
    &--single-mode {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    background: black;
    &--playing {
        // background: while;
    }
}
</style>
