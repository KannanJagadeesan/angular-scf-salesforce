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

var setHeaderService = function($http, ngForceConfig) {

var RESOURCEURL = ngForceConfig.resourceUrl;

var getMenuList = function( ){

    return $http.get( RESOURCEURL + '/menu' )
                .then( function (response) {
         
                     return response.data;
                     
                });
    
};

    this.getMenuList = getMenuList;
};

    angular
        .module('scf.application')
        .service('HeaderService', setHeaderService);

    setHeaderService.$inject = ['$http', 'ngForceConfig'];
    
})();