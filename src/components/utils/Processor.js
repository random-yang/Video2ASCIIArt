// 根据 rgb 值得到灰度值
let getGray = (r, g, b) => {
    return 0.299 * r + 0.578 * g + 0.114 * b // 灰度值的浮点算法
}

// 灰度值映射到字符
let mapToChar = grayIndex => {
    const d = 16
    let index = Math.floor(grayIndex / d)
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
    return chars[index]
}

// 填充到textarea
let frame2char = (ctx, width, height) => {
    // 获取canvas上的图像信息
    let imageData = ctx.getImageData(0, 0, width, height)
    let imageDataArr = imageData.data // 图像信息数组
    let imgDataWidth = imageData.width // 矩阵纬度
    let imgDataHeight = imageData.height
    let innerContext = ''
    for (let h = 0; h < imgDataHeight; h += 10) {
        for (let w = 0; w < imgDataWidth; w += 6) {
            let index = (w + imgDataWidth * h) * 4 // r b g a = 4个宽度
            let r = imageDataArr[index + 0]
            let g = imageDataArr[index + 1]
            let b = imageDataArr[index + 2]
            const gray = getGray(r, g, b) // 得到灰度值
            innerContext += `${mapToChar(gray)}` // 灰度值映射到字符
        }
        innerContext += '\n'
    }
    console.log(innerContext)
}

// 生成的字符串输出到textarea

export default class Processor {
    /**
     *
     * @param {VideoDOM} video
     * @param {CanvasContext} ctx
     */
    constructor(video, canvas) {
        this.video = video
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.frameLoader = document.createElement('canvas') // 提取视频帧
        this.frameLoaderCtx = this.frameLoader.getContext('2d')

        this.frameLoader.width = this.canvas.width
        this.frameLoader.height = this.canvas.height
    }

    /**
     * @description
     * 更新当前画布上下文上的帧
     */
    update() {
        // 获取视频帧信息
        this.frameLoaderCtx.drawImage(
            this.video,
            0,
            0,
            this.canvas.width,
            this.canvas.height
        )

        frame2char(
            this.frameLoaderCtx,
            this.frameLoader.width,
            this.frameLoader.height
        )
    }
}
