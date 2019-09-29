<template>
    <div id="app">
        <div class="video-wrapper">
            <Video2ASCIIArt :videoURL="videoURL"/>
        </div>
    </div>
</template>

<script>
import Video2ASCIIArt from './components/Video2ASCIIArt'
import videoURL from './assets/V.mov'

export default {
    name: 'app',
    components: {
        Video2ASCIIArt
    },
    data() {
        return {
            videoURL
        }
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.video-wrapper {
    width: 80vw;
}
</style>
