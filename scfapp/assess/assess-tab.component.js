/**
 * @name : scfTabAssess - Second Level Component holds capability and questions components
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

    var setAssessTabController = function (  ) {
        
        var vm = this;
        
        vm.$onInit = function(){

        };

    };

    var assessTabComponent = {

        templateUrl : './templates/assess/tpl-assess-tab.html',
        controller: setAssessTabController
     };

 //setAssessTabController.$inject = [ 'AssessService' ];

     angular.module('scf.application')
           .component('scfAssessTab', assessTabComponent);  

})();