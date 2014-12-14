'use strict';
/**
 * Depenent de les capacitats del nostre dispositiu
 * Farem servir una classe o una altra
**/

var InputHandler = isTouchDevice() ? TouchInputHandler: MouseInputHandler