// 获取video 和 canvas 的引用
let video = document.getElementById('v')
let canvas = document.getElementById('c')
let textArea = document.getElementById('text-area')

// 获取canvas 2D上下文对象
let ctx = canvas.getContext('2d')

let vStyleWidth
let vStyleHeight

video.onloadedmetadata = function() {
    canvas.width = video.videoWidth // 视频宽度
    canvas.height = video.videoHeight // 视频高度
    vStyleWidth = canvas.width
    vStyleHeight = canvas.height
}

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
let image2char = (ctx, width, height) => {
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
    textArea.value = innerContext
}

let animationHook // 暂停hook
let draw = () => {
    animationHook = requestAnimationFrame(draw)
    // 从视频等间隔取样
    ctx.drawImage(video, 0, 0, vStyleWidth, vStyleHeight)
    // 生成的字符串输出到textarea
    image2char(ctx, vStyleWidth, vStyleHeight)
}

video.addEventListener(
    'play',
    () => {
        draw()
    },
    false
)
video.addEventListener(
    'pause',
    () => {
        window.cancelAnimationFrame(animationHook)
    },
    false
)
video.addEventListener(
    'ended',
    () => {
        window.clearInterval(animationHook)
    },
    false
)
