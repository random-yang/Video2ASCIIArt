<template>
    <div class="video-container">
        <video style="width:100%;" :src="videoURL" controls="controls" ref="videoDOMRef"></video>
        <canvas :width="canvasW" :height="canvasH"></canvas>
    </div>
</template>

<script type="text/ecmascript-6">
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
        }
    }
}
</script>

<style scoped lang="scss">
.video-container {
    width: 100%;
}
</style>
