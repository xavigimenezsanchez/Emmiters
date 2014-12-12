'use strict';
/**
* Created with M06 DAW UF3.
* User: xavigimenezsanchez
* Date: 2014-12-10
* Time: 11:43 PM
*/

function InputHandlerBase(element) {
    EventEmitter.call(this);
    this._element = element;
    this._lastMoveCoordinates = null;
    this._moving = false;
    this._moveThreshold = 10;
    this._spotDomEvents = true;
        
}

heretar(EventEmitter,InputHandlerBase);

InputHandlerBase.prototype.getInputCoordinates = function(e) {
    var element = this._element;
    var coords = e.targetTouches ? e.targetTouches[0] : e;
    return {
        x: (coords.pageX || coords.clientX + document.body.scrollLeft) - element.offsetLeft,
        y: (coords.pageY || coords.clientY + document.body.scrollTop ) - element.offsetTop
    };
};

InputHandlerBase.prototype.onDownDomEvent = function(e) {
    var coords = this._lastMoveCoordinates = this._getInputCoordinates(e);
    this.emit("down", {x: coords.x, y: coords.y, domEvent: e});
    this._stopEventIfRquired(e);
};

InputHandlerBase.prototype._onMoveDomEvent = function(e) {
    var coords = this._getInputCoordinates(e);
    
    var deltaX = coords.x - this._lastMoveCoordinates.x;
    var deltaY = coords.y - this._lastMoveCoordinates.y;
    
    if (!this._moving && Math.sqrt(deltaX*deltaX + deltaY*deltaY) > this._moveThreshold) {
        this._moving = true;
    }
    
    if (this._moving) {
        this.emit("move", {x: coords.x, y: coords.y, deltaX: deltaX, deltaY: deltaY, domEvent: e});
        this._lastMoveCoordinates = coords;
    }
    
    this._stopEventIfRequired(e);
};

InputHandlerBase.prototype._onUpDomEvent = function(e) {
    var coords = this._getInputCoordinates(e);
    this.emit("up", {x:coords.x, y:coords.y,moved:this._moving, domEvent:e});
    this._stopEventIfRequired(e);
    this._moving = false;
}

InputHandlerBase.prototype._stopEventIfRequired = function(e) {
    if (this._stopDomEvents) {
        e.stopPropagation();
        e.preventDefault();
    }
}