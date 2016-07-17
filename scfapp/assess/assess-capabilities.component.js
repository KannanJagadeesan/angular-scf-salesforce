/**
 * @name : scfNavAssess - third Level Component for capability generation
 * @desc :  Assess related logic goes into this component
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

    var setAssessCapController = function ( ) {
        
       var vm = this;

       vm.setChangeCap = function (objcap) {
                     
           vm.AssessCtrl.updateCapabilityID( objcap );
       }
    
    };

   

    var assessCapComponent = {

        templateUrl : './templates/assess/tpl-assess-capabilities.html',
        controller: setAssessCapController,
        bindings: { 
                    capabilities : '<'
                    
                  },

        require: { AssessCtrl: '^scfAssess' }

     };

   

     angular.module('scf.application')
           .component('scfAssessCapabilities', assessCapComponent);  

})();