'use strict';
var canvas;
var ctx;
var RECT_SIZE = 100;
// Array d'objectes: 4 rectangles
var rectangles = [{
    x: 100,
    y: 100
}, {
    x: 200,
    y: 100
}, {
    x: 100,
    y: 200
}, {
    x: 200,
    y: 200
}];

var selectedIndex = -1;  //Rectangle que està actiu actualment

/**
 * Funció que s'executa al inici 
 * de la app
 **/

function init() {
    canvas = initFullScreenCanvas("mainCanvas");
    ctx = canvas.getContext("2d");
    var input = new InputHandler(canvas);  //objecte que gestiona el ratolí o la pantalla tàctil
    // Esdeveniment down
    input.on("down", function(e) {
        rectangles.forEach(function(rect, index) {
            if(insideRectangle(e, rect)) selectedIndex = index;  //Ens activa el rectangle on hem fet clic
        });
    });
    // Esdeveniment de moviment
    input.on("move", function(e) {
        //Canvia les coordenades del rectangle actiu
        if(selectedIndex > -1) {
            rectangles[selectedIndex].x += e.deltaX;
            rectangles[selectedIndex].y += e.deltaY;
        }
    });
    // Esdeveniment Up
    input.on("up", function(e) {
        //No hi ha cap rectangle actiu
        selectedIndex = -1;
    });
    animateCanvas();
}

/**
 * Funció que pinta els rectangles
 * en el canvas
 **/
function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    rectangles.forEach(function(obj, index) {
        drawRectangle(obj, index == selectedIndex);
    }, this);
    requestAnimationFrame(animateCanvas);
}

/**
 * Funcio que pinta un rectangle
 * @param rectangle coordenades del rectangle a pintar
 * @param isActive ens diu si el rectangle a pintar és el actiu
 **/
function drawRectangle(rectangle, isActive) {
    ctx.fillStyle = isActive ? "#64FE2E" : "lightblue";
    ctx.strokeStyle = isActive ? "green":"darkblue";
    ctx.lineWidth = 5;
    ctx.fillRect(rectangle.x - RECT_SIZE / 2, rectangle.y - RECT_SIZE / 2, 100, 100);
    ctx.strokeRect(rectangle.x - RECT_SIZE / 2, rectangle.y - RECT_SIZE / 2, 100, 100);
}

/**
 * Funció que controla si un
 * punt està dintre del un rectangle
 * @param e objecte que conté les coordenades del ratolí o el dit
 * @param rectangle objecte que conté les coordenades del rectangle
 **/
function insideRectangle(e, rectangle) {
    return(e.x > rectangle.x - RECT_SIZE / 2 && e.x < rectangle.x + RECT_SIZE / 2 && e.y > rectangle.y - RECT_SIZE / 2 && e.y < rectangle.y + RECT_SIZE / 2);
}

/**
 * funció que inicializa el canvas a la 
 * grandària de la finestra i crea un
 * esdeveniment per canviar la grandària 
 * del canvas quan es canvia la grandària
 * del navegador
 * @param canvasId identificador html del canvas
 **/
function initFullScreenCanvas(canvasId) {
    var canvas = document.getElementById("mainCanvas");
    resizeCanvas(canvas);
    window.addEventListener("resize", function() {
        resizeCanvas(canvas);
    });
    return canvas;
}

/** 
 * Funció que canvia la grandària del
 * un element del html, en el nostre cas
 * la farem servir per canviar la 
 * grandària del canvas
 * @param canvas de la nostra aplicació
 **/

function resizeCanvas(canvas) {
    canvas.width = document.width || document.body.clientWidth;
    canvas.height = document.height || document.body.clientHeight;
}

window.addEventListener('load',init,false);
