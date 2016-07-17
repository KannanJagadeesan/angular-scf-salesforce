/**
 * @name : layoutWelcomeTab - Component
 * @desc :  Header welcome section and tab component
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

var setHeaderMenuTabController = function () {

    var vm = this;
       vm.name = "Kannan";   
       vm.items = [
        'Previous Year Assessments',
        'Download Report',
        'Close Assessment'
  ];

}

var  headerTabComponent  = {

    templateUrl: './templates/layout/tpl-welcome-tab.html',
    controller: setHeaderMenuTabController,
    bindings: { name : '@'}
    
} 

    angular.module('scf.application')
           .component('layoutWelcomeTab', headerTabComponent);  

 })();