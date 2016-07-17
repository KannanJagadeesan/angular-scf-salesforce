/**
 * @name : AssessService
 * @desc : Service for communicating to the back end header, assessment related data
 * 
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

    var setAssessService = function ($http, ngForceConfig) {

        var RESOURCEURL = ngForceConfig.resourceUrl;

        var getAssessDetails = function () {

            return $http.get(RESOURCEURL + '/assessTabs')
                .then(function (response) {

                    return (response.data);

                });
        };

        /**
         * @DESC - This function gets list of capabilities for a particular discipline.
         * @PARAM disciplineId - the id to search
         * @PARAM objCapabilities - the complete capability list being fetched from the server.
         * @RETURN Array of objects containing capabilities for this disciplineId.
         */


        var getCapabilitiesByDisciplinesID = function (disciplineId, objCapabilities) {

            return _.filter(objCapabilities, ['disciplineId', disciplineId]);
        };

        /**
         * @DESC - This function gets the list of capability ids from a given capabilities list. 
         * @PARAM objCapabilities - this capabilities list
         * @RETURN Array of capability ids
         */

        var getCapIdsFromList = function (objCapabilities) {

            return _.uniq(_.map(objCapabilities, 'capabilityId'));
        };


        /**
         * @DESC - This function gets the capabilities details and the questions 
         * details of the first capability in the list.
         * @PARAM  
         */

        var getCapabilityQuestionsDetails = function (capIDs, objCapabilities) {

            var allCapsForDiscipline = [];

            var capabilitiesList = [];

            angular.forEach(capIDs, function (value) {

                var capability = _.filter(objCapabilities, ['capabilityId', value]);

                var firstDetails = _.first(capability);

                capabilitiesList.push({
                    capabilityId: firstDetails.capabilityId,
                    capabilityName: firstDetails.capabilityName
                });

                allCapsForDiscipline.push(capability);

            });

            return { 
                        allCapsForDiscipline : allCapsForDiscipline, 
                        capList :  capabilitiesList
                    }

        };

        this.getAssessDetails = getAssessDetails;
        this.getCapabilities = getCapabilitiesByDisciplinesID;
        this.getCapabilityIDs = getCapIdsFromList;
        this.getCapabilityQuestionsDetails = getCapabilityQuestionsDetails;
    };


    angular.module('scf.application')
        .service('AssessService', setAssessService);

    setAssessService.$inject = ['$http', 'ngForceConfig'];

})();