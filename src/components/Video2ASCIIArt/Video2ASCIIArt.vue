<template>
    <div @mouseover="handleMouseover" @mouseout="handleMouseout" class="asciiart__main">
        <div class="asciiart__video">
            <slot></slot>
        </div>
        <div class="asciiart__canvas">
            <canvas @click="handleControler" ref="canvasDOMRef" :width="canvasW" :height="canvasH"></canvas>
        </div>
        <transition name="fade">
            <div v-show="isLayerShow" class="asciiart__layer">
                <span v-if="!isPlay" class="layer__play-button"></span>
                <span v-else class="layer__pause-button"></span>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
import Processor from './Processor.js'
import EventHandler from '../../utils/EventHandler.js'
import playIconPath from '../../assets/play_icon.svg'
import pauseIconPath from '../../assets/pause_icon.svg'

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
            handlers: [],
            isPlay: false,
            isHover: false
        }
    },
    computed: {
        isLayerShow() {
            if (this.isPlay) {
                return this.isHover
            } else {
                return true
            }
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
            this.isPlay = true
            this.animationHook = requestAnimationFrame(this.loop)
        },
        pause() {
            this.end()
        },
        end() {
            this.isPlay = false
            this.animationHook && cancelAnimationFrame(this.animationHook)
        },

        // controlers event

        handleControler() {
            this.isPlay ? this.handlePause() : this.handlePlay()
        },

        handlePlay() {
            if (this.video && this.video.play) this.video.play()
        },
        handlePause() {
            if (this.video && this.video.pause) this.video.pause()
        },

        // mouse event
        handleMouseover() {
            this.isHover = true
        },

        handleMouseout() {
            this.isHover = false
        }
    }
}
</script>

<style scoped lang="scss">
.asciiart__main {
    display: inline-block;
    width: 100%;
    position: relative;
}

.asciiart__video {
    visibility: hidden;
    font-size: 0;
    video {
        width: 100%;
    }
}

.asciiart__canvas {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    canvas {
        width: 100%;
    }
}

.asciiart__layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: rgba(0, 0, 0, 0.6);
    pointer-events: none;
}

.layer__play-button,
.layer__pause-button {
    // reset style
    // -------------
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    // -------------

    width: 4rem;
    height: 4rem;
    opacity: 0.8;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-size: 100% auto;
    background-position: center;
    background-repeat: no-repeat;
}

.layer__play-button {
    background-image: url(../../assets/play_icon.svg);
}

.layer__pause-button {
    background-image: url(../../assets/pause_icon.svg);
}

// for <transition>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
