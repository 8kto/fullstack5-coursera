(function () {
    'use strict';

    angular
        .module('MenuApp')
        .controller('ItemListController', ItemListController);

    ItemListController.$inject = ['items'];
    /**
     * Storage injected by resolving service method
     * @see MenuDataService.getItemsForCategory
     *
     * @param {Object} storage
     * @param {Object} storage.data
     */
    function ItemListController(storage) {
        var itemList = this;

        /**
         * @type {Item[]}
         */
        itemList.items = storage.data.menu_items;

        /**
         * @type Category
         */
        itemList.category = storage.data.category;
    }

})();

