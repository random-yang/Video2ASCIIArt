<template>
    <div id="app">
        <div class="video-wrapper">
            <h1>Video2ASCIIArt DEMO</h1>
            <Video2ASCIIArt :videoURL="videoURL" :charPPI="charPPI"/>
        </div>
    </div>
</template>

<script>
import Video2ASCIIArt from './components/Video2ASCIIArt'
import * as dat from 'dat.gui'
import videoURL from './assets/KBHD.mov'

export default {
    name: 'app',
    components: {
        Video2ASCIIArt
    },
    data() {
        return {
            videoURL,
            charPPI: 1
        }
    },
    mounted() {
        this.initDatGui()
    },
    methods: {
        initDatGui() {
            let gui = new dat.GUI()
            let data = this.$data
            gui.add(data, 'charPPI', {
                '@x0.5': 0.25,
                '@x1': 0.5,
                '@x2': 1,
                '@x4': 2
            })
        }
    }
}
</script>

<style lang='scss'>
*,
*::before,
*::after {
    margin: 0;
    padding: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    text-align: center;
}
h1 {
    margin: 2rem 0;
}
</style>
