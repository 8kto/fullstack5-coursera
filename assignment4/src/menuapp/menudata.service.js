(function () {
    'use strict';

    angular.module('Data')
        .service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http', 'ApiBasePath']
    function MenuDataService($http, ApiBasePath) {
        var service = this;

        /**
         *
         */
        service.getAllCategories = function () {
            return $http({
                method: "GET",
                url   : (ApiBasePath + "/categories.json")
            }).catch(function (error) {
                console.error("Something went terribly wrong", error);
            });
        };

        /**fixme
         *
         *
         *
         * getItemsForCategory(categoryShortName) - this method should return a promise which is a result of using the $http service, using the following REST API endpoint: https://davids-restaurant.herokuapp.com/menu_items.json?category=, where, before the call to the server, your code should append whatever categoryShortName value was passed in as an argument into the getItemsForCategory method.
         *
         * Load terms and filter them
         *
         * @param {String} searchTerm
         * @return {angular.IPromise}
         */
        service.getItemsForCategory = function (searchTerm) {
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
                service.setEmptyState(true);
            });
        };
    }

})();
