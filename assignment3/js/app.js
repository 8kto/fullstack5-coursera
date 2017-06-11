(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    ;

    /**
     * JsDoc definition of "menu item" type objects —
     * for better IDE autocompletion.
     * (works well in PhpStorm)
     *
     * @typedef {Object} Item
     * @property {Number} id
     * @property {String} name
     * @property {String} description
     * @property {String} large_portion_name
     * @property {Number} price_large
     * @property {Number} price_small
     * @property {String} short_name
     * @property {String} small_portion_name
     */
    //---------------------------------------------

    /**
     * Directive definition
     *
     * @constructor
     */
    function FoundItemsDirective() {
        return {
            restrict        : 'E',
            templateUrl     : 'templates/foundItemsList.html',
            scope           : {
                found   : '<',
                onRemove: '&'
            },
            controller      : FoundItemsDirectiveController,
            controllerAs    : 'dirCtrl',
            bindToController: true
        };
    }

    FoundItemsDirectiveController.$inject = ['MenuSearchService'];
    /**
     * Directive controller
     * @param {MenuSearchService} searchService
     * @constructor
     */
    function FoundItemsDirectiveController(searchService) {
        var directive = this;

        directive.isEmpty = function () {
            // Strong comparison not pass 'undefined' before any search
            return searchService.isEmptyState === true;
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    /**
     * Menu items search service
     *
     * @param $http
     * @param {String} ApiBasePath
     * @constructor
     */
    function MenuSearchService($http, ApiBasePath) {
        var service = this;

        /**
         * State flag for displaying "Empty message".
         *
         * Why not simple check the found.length?
         * Because at very first page loading it will cause displaying
         * such message, but it is incorrect since user had not searching anything yet.
         *
         * @type {Boolean|undefined}
         */
        service.isEmptyState = void 0; // zen version of undefined. Om!

        /**
         * Load terms and filter them
         *
         * @param {String} searchTerm
         * @return {angular.IPromise}
         */
        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url   : (ApiBasePath + "/menu_items.json")
            }).then(function (response) {
                var term = searchTerm.toLowerCase();

                if (!response.data || !response.data.menu_items) {
                    throw new Error('No data loaded');
                }

                return response.data.menu_items.filter(
                    /** @param {Item} item */
                    function (item) {
                        return -1 !== item.description.toLowerCase().indexOf(term);

                    });
            }).catch(function (error) {
                console.error("Something went terribly wrong: " + error);
                service.isEmptyState = true;
            });
        };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    /**
     * @param {MenuSearchService} searchService
     * @constructor
     */
    function NarrowItDownController(searchService) {
        var ctrl = this;

        /**
         * @type {string}
         */
        ctrl.searchTerm = '';

        /**
         * @type {Item[]}
         */
        ctrl.items = [];

        /**
         * Search item by desc comparison
         */
        ctrl.search = function () {
            // Clear results before search
            ctrl.found = [];

            // Term is not provided
            if (!ctrl.searchTerm) {
                searchService.isEmptyState = true;
                return;
            }

            searchService
                .getMatchedMenuItems(ctrl.searchTerm)
                .then(function (items) {
                    if (items && items.length) {
                        ctrl.found                 = items;
                        searchService.isEmptyState = false;
                    }
                    else {
                        searchService.isEmptyState = true;
                    }
                });
        };

        /**
         * @param {Number} itemIndex
         */
        ctrl.removeItem = function (itemIndex) {
            ctrl.found.splice(itemIndex, 1);

            if (!ctrl.found || !ctrl.found.length) {
                searchService.isEmptyState = true;
            }
        };
    }

})();
