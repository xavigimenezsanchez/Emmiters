'use strict';
/**
 * Implementació de la clase InputHandlerBase
 * per contolar els touch dels dispositius
 * tàctils.
 **/


function TouchInputHandler(element) {
    this._lastInteractionCoordinates = null; //necessaria per controlar la darrera coordenada abans de fer touchend
    InputHandlerBase.call(this, element); 
    this._attachDomListeners(); //inicialitza els esdeveniments tàctils
}

heretar(InputHandlerBase,TouchInputHandler);

/*
 * Adjunta els listeners als esdeveniments touchXXX
 * del DOM
 **/
TouchInputHandler.prototype._attachDomListeners = function() {
    var el = this._element;
    // La funció bind crea una nova funció
    // on this és el objecte des d'on es crida
    el.addEventListener("touchstart", this._onDownDomEvent.bind(this),false);
    el.addEventListener("touchend", this._onUpDomEvent.bind(this), false);
    el.addEventListener("touchmove", this._onMoveDomEvent.bind(this), false);
}

/**
 * Override de _onDownDomElement de InputHandelerBase
 * Mètode que gestiona el que s'ha de fer quan polsem
 * la pantalla. Primer actualitza la propietat
 * _lastInteraccionCoordinates
 * i després crida al listener _onDownDomElement de
 * InputHandlerBase
 * @param e objecte event del DOM
 **/
TouchInputHandler.prototype._onDownDomEvent = function(e) {
    this._lastInteractionCoordinates = this._getInputCoordinates(e);
    InputHandlerBase.prototype._onDownDomEvent.call(this, e); 
};

/**
 * Aquest mètode s'ha reescriure senser, pel problema que 
 * tenim amb touchend que no guarda les coordenades.
 * Si observeu és molt semblant al _onUpDomEvent de
 * InputHandlerBase, però el objecte que creem hem
 * de treure les coordenades de _lastInterationCoordinates
 * @param e objecte event del DOM
 **/
TouchInputHandler.prototype._onUpDomEvent = function(e) {
    if (this._lastInteractionCoordinates){
        this.emit("up", {
            x: this._lastInteractionCoordinates.x,
            y: this._lastInteractionCoordinates.y,
            moved: this._moving,
            domEvent: e    
        });
    };
    this._stopEventIfRequired(e);
    this._lastInteractionCoordinates = null;
    this._moving = false;
}

/**
 * Override de _onMoveDomElement de InputHandelerBase
 * Mètode que gestiona el que s'ha de fer quan movem 
 * el dit. Va guardant les coordenades per on passa
 * i dispara el mètode
 *  _onMoveDomElement de InputHandlerBase
 * @param e objecte event del DOM
 **/
TouchInputHandler.prototype._onMoveDomEvent = function(e) {
    this._lastInteractionCoordinates = this._getInputCoordinates(e);
    InputHandlerBase.prototype._onMoveDomEvent.call(this, e);
}

