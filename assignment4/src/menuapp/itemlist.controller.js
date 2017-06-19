(function () {
    'use strict';

    angular
        .module('MenuApp')
        .controller('ItemListController', ItemListController);

    ItemListController.$inject = ['MenuDataService', 'items'];
    /**
     *
     * @param {MenuDataService} menuService
     * @param {Object} response
     * @param {Object} response.data
     * @constructor
     */
    function ItemListController(menuService, response) {
        var itemList = this;

        itemList.items    = response.data.menu_items;
        itemList.category = response.data.category;
    }

})();
