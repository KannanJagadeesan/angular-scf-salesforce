/**
 * @name : scfPrioritize - First Level Component
 * @desc :  Prioritize related logic goes into this component
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




    /**
    * Component defintion options
    */

    var prioritizeCompoent = {

        templateUrl : './templates/prioritize/tpl-prioritize.html'
        //controller: setPrioritizeController,
     };

    /** End of Component defintion */


    angular.module('scf.application')
        .component('scfPrioritize', prioritizeCompoent);

})();