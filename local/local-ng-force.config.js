/**
 * 
 * This file is to mock the Sales force setup
 * 
 */

(function(angular){

    var sitePrefix ='./';
   
    angular.module('ngForce.config', []).constant('ngForceConfig', {
        
        appName: 'SCF',
        resourceUrl : 'http://localhost:7001'
     
    });


// Module to mock the actual scf.templates in local //

    angular.module( 'scf.templates', []);

})(angular);