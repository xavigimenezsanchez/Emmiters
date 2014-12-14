'use strict';
/**
 * La funció d'aquesta classe és servir de
 * cor de la nostra API per transformar els
 * esdeveniments DOM en altres tres més fàcil
 * d'usar:
 *      *_onUpDomEvent()
 *      *_onDownDomEvent()
 *      *_onMoveDomEvent()
 **/


function InputHandlerBase(element) {
    EventEmitter.call(this);
    this._element = element; // El element del DOM
    this._lastMoveCoordinates = null; // Últim moviment conegut, el fem servir per calcular el delta
    this._moving = false; // flag que indica que hem traspassat el unbral: Si és true es tracta d'un moviment real
    this._moveThreshold = 10; // El valor del umbral en pixels
    this._spotDomEvents = true; // Per defecte parem la propagació de esdeveniments i el preventDefault
        
}

heretar(EventEmitter,InputHandlerBase);

/**
 * Aquest mètode recupera les 
 * coordenades de un esdeveniment de entrada
 * ignorant el Multitouch
 * @param e objecte que ha generat el esdeveniment del DOM
 **/
InputHandlerBase.prototype.getInputCoordinates = function(e) {
    var element = this._element;
    var coords = e.targetTouches ? e.targetTouches[0] : e;
    return {
        x: (coords.pageX || coords.clientX + document.body.scrollLeft) - element.offsetLeft,  
        y: (coords.pageY || coords.clientY + document.body.scrollTop ) - element.offsetTop
    };
};


/**
 * Aquest mètode es dispara quan es produeix 
 * qualsevol esdeveniment "down" del DOM:
 *          *mousedown
 *          *touchstart
 * @param e objecte event del DOM
 **/
InputHandlerBase.prototype.onDownDomEvent = function(e) {
    var coords = this._lastMoveCoordinates = this._getInputCoordinates(e);
    this.emit("down", {x: coords.x, y: coords.y, domEvent: e}); // Dispara el esdeveniment "down"
    this._stopEventIfRequired(e);
};

/**
 * Aquest mètode s'encarrega de controlar el moviment del ratolí o 
 * del dit i si se ha passat el umbral llavors dispara el 
 * esdeveniment "move".  A més controla el paràmetre DELTA
 * @param e objecte event del DOM
 **/
InputHandlerBase.prototype._onMoveDomEvent = function(e) {
    var coords = this._getInputCoordinates(e);
    
    // Calcula el DELTA
    var deltaX = coords.x - this._lastMoveCoordinates.x;
    var deltaY = coords.y - this._lastMoveCoordinates.y;
    
    // Comprovem si s'ha traspassat el umbral, si és aixì vol dir
    // que el moviment que s'ha produit és vàlid, és a dir,
    // es tracta d'un moviment real i no és un micromoviment 
    if (!this._moving && Math.sqrt(deltaX*deltaX + deltaY*deltaY) > this._moveThreshold) {
        this._moving = true;
    }
    
    // si _moving == true vol dir que s'ha produït un moviment real
    // llavors s'ha de llançar el nostre esdeveniment "move"
    if (this._moving) {
        this.emit("move", {x: coords.x, y: coords.y, deltaX: deltaX, deltaY: deltaY, domEvent: e});
        this._lastMoveCoordinates = coords;
    }
    
    this._stopEventIfRequired(e);
};


/**
 * Aquest mètode s'encarrega de controlar quan treiem
 * el dit de ratolí o de la pantalla tàctil, quan passa
 * això inicialitzem el falt _moving, ja que el moviment 
 * s'ha acabat. És dispararà quan es produeixen els 
 * esdeveniments de DOM:
 *                *mouseup
 *                *touchend
 * @param e objecte event del DOM
 **/
InputHandlerBase.prototype._onUpDomEvent = function(e) {
    var coords = this._getInputCoordinates(e);
    this.emit("up", {x:coords.x, y:coords.y,moved:this._moving, domEvent:e});
    this._stopEventIfRequired(e);
    this._moving = false;
}

/**
 * Deté la progagació dels esdeveniments i el
 * comportament per defecte del navegador
 * @param e objecte event del DOM
 **/
InputHandlerBase.prototype._stopEventIfRequired = function(e) {
    if (this._stopDomEvents) {
        e.stopPropagation();
        e.preventDefault();
    }
}