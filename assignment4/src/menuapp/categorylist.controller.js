(function () {
    'use strict';

    angular
        .module('MenuApp')
        .controller('CategoryListController', CategoryListController);

    CategoryListController.$inject = ['items'];

    /**
     * Items injected by resolving service method
     * @see MenuDataService.getAllCategories
     *
     * @param {Object} items
     * @constructor
     */
    function CategoryListController(items) {
        var categoryList = this;

        categoryList.items = items.data;
    }

})();
