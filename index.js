var yyy = document.getElementById('xxx');
var content = yyy.getContext('2d');
var lineWidth = 5
var strokeStyle = 'red'

// 设置高宽
autoSetCanvasSize(yyy)

lisentToUser(yyy)

// 橡皮擦
var eraserEnabled = false

pen.onclick = function () {
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}

eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

red.onclick = function () {
    console.log('sd')
    strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    pink.classList.remove('active')
}


green.onclick = function () {
    console.log('sd')
    strokeStyle = 'green'
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
    pink.classList.remove('active')
}

blue.onclick = function () {
    console.log('sd')
    strokeStyle = 'blue'
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
    pink.classList.remove('active')
}

pink.onclick = function () {
    console.log('sd')
    strokeStyle = 'pink'
    pink.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}


// 清空
clear.onclick = function () {
    content.clearRect(0, 0, yyy.width, yyy.height)
}

// 保存图片
download.onclick = function () {
    var url = yyy.toDataURL("image/png")
    console.log('保存了hhh', url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'imgs'
    a.target = '_blank'
    a.click()
}

// 线 
thin.onclick = function () {
    thin.classList.add('active')
    thick.classList.remove('active')
    lineWidth = 5
}

thick.onclick = function () {
    thick.classList.add('active')
    thin.classList.remove('active')
    lineWidth = 10
}



// 监听画笔动作

// 特性检测
function lisentToUser(canvas) {
    var using = false,
        lastPoint = { x: undefined, y: undefined }
    console.log(document.body.ontouchstart, 'yxs')
    if (document.body.ontouchstart !== undefined) { //检测是否是手机设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX,
                y = a.touches[0].clientY
            using = true
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x, y }
            }
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX,
                y = a.touches[0].clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = { x, y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        canvas.onmousedown = function (a) {
            var x = a.clientX,
                y = a.clientY
            using = true
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = { x, y }
            }
        }

        canvas.onmousemove = function (a) {
            var x = a.clientX,
                y = a.clientY
            if (!using) {
                return
            }
            if (eraserEnabled) {
                content.clearRect(x - 5, y - 5, 10, 10)
            } else {
                newPoint = { x, y }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }

        canvas.onmouseup = function () {
            using = false
        }
    }
}

// 画线

function drawLine(x1, y1, x2, y2) {
    content.beginPath()
    content.strokeStyle = strokeStyle
    content.moveTo(x1, y1)
    content.lineWidth = lineWidth
    content.lineTo(x2, y2)
    content.stroke()
}

// 获取宽度

function autoSetCanvasSize(canvas) {
    setCanvasSize()
    window.onresize = function () {
        setCanvasSize()
    }
    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth,
            pageHeight = document.documentElement.clientHeight
        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}


