/**
 * @name : scf.application
 * @desc :  Application start file for SCF Porject. This is the the main module
 * 
 * The coding and best practices are heavily infulenced from 
 * JHON PAPA's excellent angular coding style guide
 * https://github.com/johnpapa/angular-styleguide
 */

/**
 * Wrap everything in an IFFE
 * 
 */

(function() {

    'use strict';

    var setRouteConfig = function( $stateProvider, $urlRouterProvider ){
        
        // For any unmatched url, redirect to /assess
        $urlRouterProvider.otherwise("/assess");
        
        
        $stateProvider
                     .state( 'assess', STATECONFIG.assess )
                     .state( 'prioritize', STATECONFIG.prioritize)
                                        

    };

    angular.module('scf.application', [ 
                                        'ui.router',
                                        'ngForce',
                                        'ui.bootstrap',
                                        'scf.templates',
                                        'scf.filters'

                                       ])
          .config(setRouteConfig)
          .constant( 'REMOTECONTROLLER', 'SCFAssess' );

     setRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'ngForceConfig']

})();