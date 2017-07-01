(function () {
    'use strict';

    angular.module('public')
        .config(routeConfig);

    /**
     * Configures the routes and views
     */
    routeConfig.$inject = ['$stateProvider'];
    function routeConfig($stateProvider) {
        // Routes
        $stateProvider
            .state('public', {
                abstract   : true,
                templateUrl: 'src/public/public.html'
            })
            .state('public.home', {
                url        : '/',
                templateUrl: 'src/public/home/home.html'
            })
            .state('public.menu', {
                url         : '/menu',
                templateUrl : 'src/public/menu/menu.html',
                controller  : 'MenuController',
                controllerAs: 'menuCtrl',
                resolve     : {
                    menuCategories: ['MenuService', function (MenuService) {
                        return MenuService.getCategories();
                    }]
                }
            })
            .state('public.menuitems', {
                url         : '/menu/{category}',
                templateUrl : 'src/public/menu-items/menu-items.html',
                controller  : 'MenuItemsController',
                controllerAs: 'menuItemsCtrl',
                resolve     : {
                    menuItems: ['$stateParams', 'MenuService', function ($stateParams, MenuService) {
                        return MenuService.getMenuItems($stateParams.category);
                    }]
                }
            })

            // Assignment's routes
            .state('public.user-info', {
                url        : '/my-info',
                templateUrl: 'src/public/user/user-info.html',
                controller  : 'UserController',
                controllerAs: 'userCtrl'
            })
            .state('public.sign-up', {
                url        : '/sign-up',
                templateUrl: 'src/public/user/sign-up.html',
                controller  : 'RegistrationController',
                controllerAs: 'regCtrl'
            })

        ;
    }
})();
