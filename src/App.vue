<template>
    <div id="app" :class="{'app--dark-mode': isDarkMode}">
        <!-- fork me -->
        <ForkMe targetUrl="https://github.com/OfficialYoungX/Video2ASCIIArt"/>
        <h1 class="app__title" :class="{'app__title--dark-mode': isDarkMode}">
            <img
                :class="{'app__logo--dark-mode': isDarkMode }"
                class="app__logo"
                src="./assets/logo.png"
                alt="logo"
            >
            <span>Video2ASCIIArt DEMO</span>
        </h1>
        <div class="app__main">
            <div class="grid-cell">
                <video
                    style="width:100%"
                    src="./assets/KBHD.mov"
                    controls="controls"
                    crossorigin=""
                ></video>
            </div>
            <div class="grid-cell">
                <Video2ASCIIArt :charppi="charppi" :color="color">
                    <video src="./assets/KBHD.mov" controls="controls" crossorigin=""></video>
                </Video2ASCIIArt>
            </div>
        </div>
    </div>
</template>

<script>
import * as dat from 'dat.gui'
import Video2ASCIIArt from '../src/components/Video2ASCIIArt'
import ForkMe from '../src/components/ForkMe'

export default {
    components: {
        Video2ASCIIArt,
        ForkMe
    },
    name: 'app',
    data() {
        return {
            charppi: 1,
            color: 'rgb(120,120,120)',
            isDarkMode: true,
            gui: null
        }
    },
    mounted() {
        this.initDatGui()
    },
    destroyed() {
        this.gui.destroy()
    },
    methods: {
        initDatGui() {
            this.gui = new dat.GUI()
            let data = this.$data

            this.gui.add(data, 'isDarkMode')
            this.gui.add(data, 'charppi', {
                '@x0.5': 0.25,
                '@x1': 0.5,
                '@x2': 1,
                '@x4': 2
            })
            this.gui.addColor(data, 'color')
        }
    }
}
</script>

<style lang='scss'>
@mixin transition-mix($name) {
    transition: $name 0.3s ease-in-out;
}

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
    width: 100%;
    min-height: 100vh;
    @include transition-mix(background);
}

.app--dark-mode {
    background: black;
}

.app__logo {
    width: 2.5rem;
    margin-right: 1rem;
    vertical-align: middle;

    @include transition-mix(filter);
    &--dark-mode {
        filter: invert(1);
    }
}

.app__title {
    padding: 4rem 0;
    text-align: center;
    @include transition-mix(color);
    span {
        vertical-align: middle;
    }
    &--dark-mode {
        color: white;
    }
}

.grid-cell {
    width: 80%;
    font-size: 0;
    @include transition-mix(box-shadow);
    &:hover {
        box-shadow: 4px 10px 30px -10px rgba(0, 0, 0, 0.3);
    }
}

.app__main {
    padding-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
}

@media (max-width: 970px) {
    .app__main {
        grid-template-columns: 1fr;
    }
}
</style>
