'use strict';

/** 
 * EventEmmiter és la classe responsable
 * de portar el registre de listeners
 * i de notificar a aquest els nous
 * events que es produeixen
 */

function EventEmitter() {
    this._listeners = {};
}



/**
 * Mètode "addListener" o "on", tots dos noms són vàlids
 * Es fa servir per afegir una funció como un listener de
 * un esdeveniment creat per nosaltres
 * @param type tipus de esdeveniment
 * @param listener funció a afegir a la llista de listeners
 */

EventEmitter.prototype.addListener = EventEmitter.prototype.on = function(type, listener) {
    if (typeof listener !== "function")
        throw "Listener must be a function"
        
    if (!this._listeners[type]) {
        this._listeners[type] = [];
    }
    this._listeners[type].push(listener);
}
/** 
 * Mètode que esborra un listener de un tipus d'esdeveniment
 * @param type tipus d'esdeveniment
 * @param listener funció a esborrar de la llista de listeners
 * 
 */
EventEmitter.prototype.removeListener =  function(type, listener) {
    if (typeof listener !== "function") 
        throw "Listener must be a function";
    if(!this._listeners[type])
        return;
    
    var position = this._listeners[type].indexOf(listener);
    if (position != -1)
        this._listeners[type].splice(position,1);
        
};

/**
 * Mètode que esborra tots els listeners registrats
 * para un tipus d'esdeveniment
 * @param type tipus d'esdeveniment (opcional)
 * */
EventEmitter.prototype.removeAllListeners = function(type) {
    if (type) {
        this._listeners[type] = [];
    } else {
        this._listeners = {};
    }
};

/**
 * Mètode que executa tots els esdeveniments
 * d'un tipus, a més li passem el objecte que
 * crea el esdeveniment
 * @param type tipus d'esdeveniment
 * @param event el objecte que s'ha de crear
 **/

EventEmitter.prototype.emit = function(type, event) {
    if (!(this._listeners[type]) && 
       this._listeners[type].length) {
        return;
    }
    
    for (var i = 0; i < this._listeners[type].length) {
        this._listeners[type][i].apply(this, event);
    }
}