/**
 * @name : scfQuestionAssess - third Level Component for question generation
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

    var setAssessQuestionController = function ( ) {
        
        var vm = this;
       
        vm.questionsList = [];
        vm.capabilityName = '';

       vm.$onChanges = function( changesObj ){

          if( changesObj.capList || changesObj.capId){

              vm.questionsList = _.filter(vm.capList, ['capabilityId', vm.capId]);
              //vm.capabilityName = _.first( vm.questionsList  ).capabilityName;
           }
       
       };


       // Private functions starts //

       
    };

   

    var assessQuestionComponent = {

        templateUrl : './templates/assess/tpl-assess-questions.html',
        controller: setAssessQuestionController,
        controllerAs: 'quest',
        bindings: {  
                    capList : '<', 
                    capId : '<'
                   }

     };

   

     angular.module('scf.application')
           .component('scfAssessQuestions', assessQuestionComponent);  

})();