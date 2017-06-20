(function () {
    'use strict';

    /**
     * JsDoc definitions for JSON-objects returned by REST-services
     * for better IDE autocompletion.
     * (works well in PhpStorm)
     */

    /**
     * @typedef {Object} Category
     * @property {String} name
     * @property {String} short_name
     * @property {String} special_instructions
     */

    /**
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

    //-------------------------------------------------------------------------

    /**
     * Service loads data from RESTful service
     */
    angular
        .module('Data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        /**
         * Load all categories
         *
         * @return {angular.IPromise}
         */
        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url   : (ApiBasePath + "/categories.json")
            }).catch(function (error) {
                console.error("Loading of categories failed", error);
            });
        };

        /**
         * Load items by category shortname
         *
         * @param {String} shortName
         * @return {angular.IPromise}
         */
        service.getItemsForCategory = function (shortName) {
            return $http({
                method: "GET",
                url   : (ApiBasePath + "/menu_items.json"),
                params: {
                    category: shortName
                }
            }).catch(function (error) {
                console.error("Loading of category items failed", error);
            });
        };
    }

})();
