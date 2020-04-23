var yyy = document.getElementById('xxx');
var content = yyy.getContext('2d');

// 设置高宽
autoSetCanvasSize(yyy)

lisentToUser(yyy)

// 橡皮擦
var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    actions.className = 'actions x'
}

brush.onclick = function () {
    eraserEnabled = false
    actions.className = 'actions'
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
    content.moveTo(x1, y1)
    content.lineWidth = 5
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


