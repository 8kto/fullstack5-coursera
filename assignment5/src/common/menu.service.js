(function () {
    "use strict";

    angular.module('common')
        .service('MenuService', MenuService);

    MenuService.$inject = ['$http', 'ApiPath'];
    function MenuService($http, ApiPath) {
        var service = this;

        service.getCategories = function () {
            return $http.get(ApiPath + '/categories.json').then(function (response) {
                return response.data;
            });
        };

        service.getMenuItems = function (category) {
            var config = {};
            if (category) {
                config.params = {'category': category};
            }

            return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
                return response.data;
            });
        };

        /**
         * @param {String} shortName
         */
        service.getMenuItem = function (shortName) {
            return $http
                .get(ApiPath + '/menu_items/' + shortName + '.json')
                .then(function (response) {
                    return response.data;
                })
                .catch(function () {
                    return null;
                });
        };

        // {"status":"500","error":"Internal Server Error"}

        // {"id":11,"short_name":"A11","name":"Young Chow Won Ton Soup (for 2)","description":"clear chicken broth with vegetables, veal, chicken, and beef and won tons","price_small":null,"price_large":11.95,"small_portion_name":null,"large_portion_name":null,"created_at":"2017-07-01T11:16:36.712Z","updated_at":"2017-07-01T11:16:36.712Z","category_short_name":"A","image_present":true}
    }

})();
