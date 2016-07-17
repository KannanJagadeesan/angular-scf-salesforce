/**
 * This is a one single file for all filters
 * Its uses its own module named scf.filters
 * Which, will be injected into the main module.
 */

/**
 * Wrap everything into an IFFE
 * 
 */

(function() {

    'use strict';

    var setRoutingText = function (  ) {
        
        return function (routeText) {
            
            return( _.replace(_.toLower(routeText), ' ', '_'));
            
        }
        

    }



    angular.module('scf.filters', [])
           .filter( 'routingText', setRoutingText ); 
})();