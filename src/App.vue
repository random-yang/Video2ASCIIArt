<template>
    <div id="app">
        <div class="video-wrapper">
            <Video2ASCIIArt :videoURL="videoURL"/>
        </div>
    </div>
</template>

<script>
import Video2ASCIIArt from './components/Video2ASCIIArt'
import videoURL from './assets/ALEM.mov'
import * as dat from 'dat.gui'

// var gui = new dat.GUI()
// gui.add(text, 'message')
// gui.add(text, 'speed', -5, 5)
// gui.add(text, 'displayOutline')
// gui.add(text, 'explode')

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
    width: 100%;
}
</style>
