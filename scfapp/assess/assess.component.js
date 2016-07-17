/**
 * @name : scfAssess - First Level Component
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

    var setAssessController = function (AssessService) {

        var vm = this;

        vm.disciplineID = "";
        vm.capID = ""; // Default Capability ID
        vm.disciplinesList = []; // Holds the disciplines array fetched from the server.
        vm.allCapabilitiesList = []; // Holds all the capabilites fetched from the server.
        vm.capabilites = []; // Holds capabilites for a particular disciplineId
        vm.uniqueCapabilityDetails = []; 

        vm.$onInit = function () {

            AssessService.getAssessDetails()
                .then(tabsListSuccess, tabsListFailure);

        };

        vm.setDisciplineStateChange = function (objDisp) {
            
            vm.disciplineID = objDisp.disciplineId;
            setChangeState();    
            console.warn( objDisp )

        }

        vm.updateCapabilityID = function (objcap) {
            
            vm.capID = objcap.capabilityId;
            
        };

        // Private functions starts //

        var setChangeState = function () { 

            vm.capabilites = AssessService.getCapabilities( vm.disciplineID, vm.allCapabilitiesList );

            var capIds = AssessService.getCapabilityIDs( vm.capabilites );

            var objDetails =  AssessService.getCapabilityQuestionsDetails( capIds, vm.capabilites );

            vm.uniqueCapabilityDetails = objDetails.capList;

            vm.capabilites = _.flattenDeep(objDetails.allCapsForDiscipline);
            
            vm.capID =  _.first( vm.uniqueCapabilityDetails ).capabilityId;
         }


        var tabsListSuccess = function (response) {

            vm.disciplinesList = response.disciplines;
            vm.allCapabilitiesList = response.questions;
            vm.disciplineID =  _.first(vm.disciplinesList).disciplineId;
            setChangeState();
            
        };

        
        var tabsListFailure = function () { };

    };

    setAssessController.$inject = ['AssessService'];


    /**
     * Component defintion options
     */

    var assessCompoent = {

        templateUrl: './templates/assess/tpl-assess.html',
        controller: setAssessController,
    };


    /** End of Component defintion */

    angular.module('scf.application')
        .component('scfAssess', assessCompoent);

})();