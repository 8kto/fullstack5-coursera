(function () {
    'use strict';

    angular
        .module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
                url        : '/',
                templateUrl: 'src/menuapp/templates/view/home.template.html'
            })

            // Categories
            .state('categories', {
                url        : '/categories',
                templateUrl: 'src/menuapp/templates/view/categories.template.html',
                controller : 'CategoryListController as categoryList',
                resolve    : {
                    items: ['MenuDataService', function (menuService) {
                        return menuService.getAllCategories();
                    }]
                }
            })

            .state('justordinarypage', {
                url        : '/justordinarypage',
                templateUrl: 'src/ordinarypage/view.template.html'
            })

        // Items in category
        // .state('items', {
        //     url        : '/categories/{categoryId}',
        //     templateUrl: 'src/menuapp/templates/items.template.html',
        //     controller : "ItemDetailController as itemDetail"
        // });
        ;
    }

})();
