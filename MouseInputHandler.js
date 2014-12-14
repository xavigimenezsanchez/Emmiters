'use strict';

/**
* Implementació de la classe InputHandlerBase
* per entorns d'escriptori, és a dir, controla
* els moviments del ratolí
**/

function MouseInputHandler(element) {
    InputHandlerBase.call(this, element);
    this._mouseDown = false; //ens serveix per controlar si l'usuari ha polsat el botó del ratolí 
    this._attachDomListeners();  //inicialitza els events del ratolí
};

heretar(InputHandlerBase,MouseInputHandler);

/*
 * Adjunta els listeners als esdeveniments mouseXXX
 * del DOM
 **/
MouseInputHandler.prototype._attachDomListeners = function() {
    var el = this._element;
    // La funció bind crea una nova funció
    // on this és el objecte des d'on es crida
    el.addEventListener("mousedown", this._onDownDomEvent.bind(this),false);
    el.addEventListener("mouseup", this._onUpDomEvent.bind(this), false);
    el.addEventListener("mousemove", this._onMoveDomEvent.bind(this));
    el.addEventListener("mouseout", this._onMouseOut.bind(this));
}

/**
 * Override de _onDownDomElement de InputHandelerBase
 * Mètode que gestiona el que s'ha de fer quan polsem el 
 * botó de ratolí. Primer posa el flag _mouseDown a true
 * i després crida al listener _onDownDomElement de
 * InputHandlerBase
 * @param e objecte event del DOM
 **/
MouseInputHandler.prototype._onDownDomElement = function(e) {
    this._mouseDown = true;
    InputHandlerBase.prototype._onDownDomElement.call(this,e); 
};

/**
 * Override de _onUpDomElement de InputHandelerBase
 * Mètode que gestiona el que s'ha de fer quan deixem de polsar el 
 * botó de ratolí. Primer posa el flag _mouseDown a false
 * i després crida al listener _onUpDomElement de
 * InputHandlerBase
 * @param e objecte event del DOM
 **/
MouseInputHandler.prototype._onUpDomEvent = function(e) {
    this._mouseDown = false;
    InputHandlerBase.prototype._onUpDomEvent.call(this, e);
};

/**
 * Override de _onMoveDomElement de InputHandelerBase
 * Mètode que gestiona el que s'ha de fer quan deixem movem 
 * el ratolí. Només dispararà el esdeveniment si tenim
 * polsat el botó del ratolí disparant el listener
 *  _onMoveDomElement de InputHandlerBase
 * @param e objecte event del DOM
 **/

MouseInputHandler.prototype._onMoveDomEvent = function(e) {
    if (this._mouseDown) {
        InputHandlerBase.prototype._onMoveDomEvent.call(this, e);
    }
};

/**
 * Mètode nou per aquesta classe
 * S'encarrega de posar a false la propietat _mouseDown
 * quan el ratolí surt del canvas
 **/
MouseInputHandler.prototype._onMouseOut = funtion() {
    this._mouseDown = false;
}