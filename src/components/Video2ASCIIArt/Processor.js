// 根据 rgb 值得到灰度值
// 灰度值浮点算法
let getGray = (r, g, b) => {
    return 0.299 * r + 0.578 * g + 0.114 * b
}

// 灰度值映射到字符
let mapToChar = grayValue => {
    const maxGrayValue = 255
    const chars = [
        '@',
        'W',
        '#',
        '$',
        'O',
        'E',
        'X',
        'C',
        '[',
        '(',
        '/',
        '?',
        '=',
        '^',
        '~',
        '_',
        '.',
        '`'
    ]
    let index = Math.floor((chars.length * grayValue) / maxGrayValue)
    return chars[index]
}

export default class Processor {
    /**
     *
     * @param {VideoDOM} video
     * @param {Canvas} canvas
     */
    constructor(video, canvas, options) {
        this.video = video
        this.options = { charppi: 1, color: '#000000', ...options }
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.frameLoader = document.createElement('canvas') // 提取视频帧
        this.frameLoaderCtx = this.frameLoader.getContext('2d')

        this.frameLoader.width = this.canvas.width
        this.frameLoader.height = this.canvas.height
    }

    changecharppi(newCharppi) {
        const options = { charppi: newCharppi }
        this.changeOptions(options)
    }

    changeColor(newColor) {
        const options = { color: newColor }
        this.changeOptions(options)
    }

    changeOptions(newOption = {}) {
        this.options = { ...this.options, ...newOption }
    }

    drawChars(chars, fontSize = 10) {
        const { color } = this.options
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.font = `${fontSize}px Courier`
        this.ctx.fillStyle = color

        chars.split('\n').forEach((row, index) => {
            this.ctx.fillText(row, 0, index * fontSize)
        })
    }

    getFrameFromVideo() {
        this.frameLoaderCtx.drawImage(
            this.video,
            0,
            0,
            this.frameLoader.width,
            this.frameLoader.height
        )
    }

    frameToChar() {
        // 获取canvas上的图像信息
        let imageData = this.frameLoaderCtx.getImageData(
            0,
            0,
            this.frameLoader.width,
            this.frameLoader.height
        )
        let imageDataArr = imageData.data // 图像信息数组
        let imgDataWidth = imageData.width
        let imgDataHeight = imageData.height
        let chars = ''

        const { charppi } = this.options
        const dh = 10 / charppi
        const dw = 6 / charppi
        for (let h = 0; h < imgDataHeight; h += dh) {
            for (let w = 0; w < imgDataWidth; w += dw) {
                let index = (w + imgDataWidth * h) * 4 // r b g a = 4个宽度
                let r = imageDataArr[index + 0]
                let g = imageDataArr[index + 1]
                let b = imageDataArr[index + 2]
                const gray = getGray(r, g, b) // 得到灰度值
                chars += `${mapToChar(gray)}` // 灰度值映射到字符
            }
            chars += '\n'
        }
        return chars
    }

    /**
     * @description
     * 更新当前画布上下文上的帧
     */
    update() {
        // 获取视频帧信息
        this.getFrameFromVideo()
        // frame 信息转换为字符串
        const chars = this.frameToChar()
        const { charppi } = this.options
        // 绘制到 canvas 上下文
        this.drawChars(chars, 10 / charppi)
    }
}
