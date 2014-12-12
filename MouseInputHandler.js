'use strict';
/**
* Created with M06 DAW UF3.
* User: xavigimenezsanchez
* Date: 2014-12-11
* Time: 03:27 PM
*/

function MouseInputHandler(element) {
    InputHandlerBase.call(this, element);
    this._mouseDown = false;
    this._attachDomListeners();
};

heretar(InputHandlerBase,MouseInputHandler);

MouseInputHandler.prototype._attachDomListeners = function() {
    var el = this._element;
    el.addEventListener("mousedown", this._onDownDomEvent.bind(this),false);
    el.addEventListener("mouseup", this._onUpDomEvent.bind(this), false);
    el.addEventListener("mousemove", this._onMoveDomEvent.bind(this));
}

MouseInputHandler.prototype._onDownDomElement = function(e) {
    this._mouseDown = true;
    InputHandlerBase.prototype._onDownDomElement.call(this,e);
};

MouseInputHandler.prototype._onUpDomEvent = function(e) {
    this._mouseDown = false;
    InputHandlerBase.prototype._onUpDomEvent.call(this, e);
};

MouseInputHandler.prototype._onMoveDomEvent = function(e) {
    if (this._mouseDown) {
        InputHandlerBase.prototype._onMoveDomEvent.call(this, e);
    }
};

MouseInputHandler.prototype._attachDomListeners = function() {
    var el = this._element;
    el.addEventListener("mousedown", this._onDownDomElement.bind(this), false);
    el.addEventListener("mouseup", this._onUpDomEvent.bind(this), false);
    el.addEventListener("mousemove", this._onMoveDomEvent.bind(this), false);
    el.addEventListener("mouseout", this._onMouseOut.bind(this));
    
};

MouseInputHandler.prototype._onMouseOut = funtion() {
    this._mouseDown = false;
}