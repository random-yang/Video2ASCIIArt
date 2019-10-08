import Video2ASCIIArt from './components/Video2ASCIIArt'

const components = [Video2ASCIIArt]

const install = Vue => {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export { install, Video2ASCIIArt }
