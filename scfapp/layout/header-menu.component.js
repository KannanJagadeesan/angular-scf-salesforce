/**
 * @name : layoutHeaderMenu - Component
 * @desc :  Header menu component
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

/**
 * Wrap everything in an IFFE
 * 
 */

(function () { 

'use strict';

var  menuComponent  = {

    templateUrl: './templates/layout/tpl-header-menu.html',
    controller: 'MenuCtrl'
    
} 

    angular.module('scf.application')
           .component('layoutHeaderMenu', menuComponent);  

 })();