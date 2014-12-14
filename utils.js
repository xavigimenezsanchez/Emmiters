'use strict';
/**
* Created with M06 DAW UF3.
* User: xavigimenezsanchez
* Date: 2014-12-10
* Time: 11:41 PM
*/

function heretar(pare,fill) {
    fill.prototype = Object.create(pare.prototype);
    fill.prototype.constructor = fill;
}

function isTouchDevice() {
return ((window.ontouchstart) ||
     		(navigator.maxTouchPoints > 0) ||
     		(navigator.msMaxTouchPoints > 0)) 
}

