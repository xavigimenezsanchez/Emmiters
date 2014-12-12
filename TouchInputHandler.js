'use strict';
/**
* Created with M06 DAW UF3.
* User: xavigimenezsanchez
* Date: 2014-12-11
* Time: 06:18 PM
*/
function TouchInputHandler(element) {
    this._lastInteractionCoordinates = null;
    InputHandlerBase.call(this, element);
    this._attachDomListeners();
}

heretar(InputHandlerBase,TouchInputHandler);

TouchInputHandler.prototype._attachDomListeners = function() {
    var el = this._element;
    el.addEventListener("touchstart", this._onDownDomEvent.bind(this),false);
    el.addEventListener("touchend", this._onUpDomEvent.bind(this), false);
    el.addEventListener("touchmove", this._onMoveDomEvent(this), false);
}

TouchInputHandler.prototype._onDownDomEvent = function(e) {
    this._lastInteractionCoordinates = this._getInputCoordinates(e);
    InputHandlerBase.prototype._onDownDomEvent.call(this, e);
    
};

TouchInputHandler.prototype._onUpDomEvent = function(e) {
    this.emit("up", {
        x: this._lastInteractionCoordinates.x,
        y: this._lastInteractionCoordinates.y,
        moved: this._moving,
        domEvent: e
        
    });
    this._stopEventIfRequired(e);
    this._lastInteractionCoordinates = null;
    this._moving = false;
}

TouchInputHandler.prototype._onMoveDomEvent = function(e) {
    this._lastInteractionCoordinates = this._getInputCoordinates(e);
    InputHandlerBase.prototype._onMoveDomEvent.call(this, e);
}

