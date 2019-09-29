<template>
    <div class="video-container">
        <video style="width: 100%" :src="videoURL" controls="controls" ref="videoDOMRef"></video>
        <canvas width="" height=""></canvas>
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
        return {}
    },
    mounted() {
        console.log(this.$refs.videoDOMRef)
    }
}
</script>

<style scoped lang="scss">
.video-container {
    width: 100%;
}
</style>
