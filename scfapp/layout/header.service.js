/**
 * @name : HeaderService
 * @desc : Service for communicating to the back end header, menu related data
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

var setHeaderService = function(vfr, REMOTECONTROLLER, ngForceConfig) {

    var getMenuList = function(){

        var remoteNavList = vfr.send( 'SCFAssess.FetchHeaderInfo', {}, false );
            
            return remoteNavList( 'SCF' ).then( function( response ){ 

                    return( response );

            }); 
    };

// var getMenuList = function(){

//     var getFormatFunc = vfr.send( REMOTECONTROLLER + '.' + 'FetchHeaderInfo', {}, false );
            
//             return getFormatFunc( ngForceConfig.appName ).then(function( response ){
                 
//                    return (response);
                 
//              });  
// };

    this.getMenuList = getMenuList;
};

    angular
        .module('scf.application')
        .service('HeaderService', setHeaderService);

    setHeaderService.$inject = ['vfr', 'REMOTECONTROLLER', 'ngForceConfig'];
    
})();