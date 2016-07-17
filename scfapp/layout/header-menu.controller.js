/**
 * @name : MenuCtrl - Controller
 * @desc :  Header menu controller - logic for menu creation goes here
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

    var setMenuController = function ($rootScope, HeaderService) {

        var vm = this;
        
        vm.menuItems = [];
       
        
        // Life Cycle Hooks //
        vm.$onInit = function () {

             HeaderService.getMenuList()
                          .then(menuListSuccess, menuListFailure);

            //console.log( 'This is testing!!' );
        };

        // Private functions goes here//

    
        /**
         * Success callback when menu items fetched from server
         */

        var menuListSuccess = function (response) {

            // var allMenus = angular.copy( response );
            
            // angular.forEach( allMenus, function( menu ){

            //     //console.log( menu );

            // });

            console.log( response );

            vm.menuItems = response;

        };

        /**
         * Failure callback
         */

        var menuListFailure = function () {


        };

        /**
         * Since we are dynamically generating the navigation. There is no way,
         * we can select/de-select the menu. thus, we are relying in the 
         * $stateChangeSuccess event.
         */

       $rootScope.$on('$stateChangeSuccess', function( event, toState ){

            console.log( toState )
       });

    };


    angular
        .module('scf.application')
        .controller('MenuCtrl', setMenuController);

    setMenuController.$inject = ['$rootScope', 'HeaderService'];

})();