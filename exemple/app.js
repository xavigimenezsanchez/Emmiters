'use strict';
var canvas;
var ctx;
var RECT_SIZE = 100;
// This list of objects - plain rectangles
var rectangles = [{
    x: 100,
    y: 100
}, {
    x: 200,
    y: 100
}, {
    x: 100,
    y: 200
}];
// The rectangle that is currently "active"
var selectedIndex = -1;

function init() {
    canvas = initFullScreenCanvas("mainCanvas");
    ctx = canvas.getContext("2d");
    var input = new InputHandler(canvas);
    // Picking phase
    input.on("down", function(e) {
        rectangles.forEach(function(rect, index) {
            if(insideRectangle(e, rect)) selectedIndex = index;
        });
    });
    // Movement phase
    input.on("move", function(e) {
        if(selectedIndex > -1) {
            rectangles[selectedIndex].x += e.deltaX;
            rectangles[selectedIndex].y += e.deltaY;
        }
    });
    // release phase
    input.on("up", function(e) {
        selectedIndex = -1;
    });
    animateCanvas();
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach(function(obj, index) {
        drawRectangle(obj, index == selectedIndex);
    }, this);
    requestAnimationFrame(animateCanvas);
}

function drawRectangle(rectangle, isActive) {
    ctx.fillStyle = isActive ? "lightyellow" : "lightgray";
    ctx.strokeStyle = "darkgray";
    ctx.lineWidth = 5;
    ctx.fillRect(rectangle.x - RECT_SIZE / 2, rectangle.y - RECT_SIZE / 2, 100, 100);
    ctx.strokeRect(rectangle.x - RECT_SIZE / 2, rectangle.y - RECT_SIZE / 2, 100, 100);
}

function insideRectangle(e, rectangle) {
    return(e.x > rectangle.x - RECT_SIZE / 2 && e.x < rectangle.x + RECT_SIZE / 2 && e.y > rectangle.y - RECT_SIZE / 2 && e.y < rectangle.y + RECT_SIZE / 2);
}

function initFullScreenCanvas(canvasId) {
    var canvas = document.getElementById("mainCanvas");
    resizeCanvas(canvas);
    window.addEventListener("resize", function() {
        resizeCanvas(canvas);
    });
    return canvas;
}

function resizeCanvas(canvas) {
    canvas.width = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
}

window.addEventListener('load',init,false);
