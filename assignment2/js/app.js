(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    ;

    ToBuyController.$inject         = ['ShoppingListCheckOffService'];
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

    /**
     * JsDoc definition of "item" type objects —
     * for better IDE autocompletion.
     * (works well in PhpStorm)
     *
     * @typedef {Object} Item
     * @property {String} name
     * @property {Number} quantity
     */
    //---------------------------------------------

    /**
     * List service
     *
     * @constructor
     */
    function ShoppingListCheckOffService() {
        var service = this;

        var itemsToBuy  = itemsProvider(),
            itemsBought = [];

        /**
         * @param {Number} itemIndex
         * @return {Item[]}
         */
        service.removeItem = function (itemIndex) {
            return itemsToBuy.splice(itemIndex, 1);
        };

        /**
         * @param {Item} item
         */
        service.addItem = function (item) {
            itemsBought.push(item);
        };

        /**
         * @param {Number} itemIndex
         */
        service.buyItem = function (itemIndex) {
            var removed = service.removeItem(itemIndex);

            if (removed) {
                service.addItem(removed[0]);
            }
            else {
                throw new Error('Item not found');
            }
        };

        /**
         * @return {Item[]}
         */
        service.getItemsToBuy = function () {
            return itemsToBuy;
        };

        /**
         * @return {Item[]}
         */
        service.getItemsBought = function () {
            return itemsBought;
        };
    }

    /**
     * To buy list controller
     *
     * @param {ShoppingListCheckOffService} listService
     * @constructor
     */
    function ToBuyController(listService) {
        var toBuyCtrl = this;

        toBuyCtrl.items = listService.getItemsToBuy();

        toBuyCtrl.buyItem = function (itemIndex) {
            listService.buyItem(itemIndex);
        };
    }

    /**
     * Bought items controller
     *
     * @param {ShoppingListCheckOffService} listService
     * @constructor
     */
    function AlreadyBoughtController(listService) {
        var alreadyCtrl = this;

        alreadyCtrl.items = listService.getItemsBought();
    }

    /**
     * Provider of default items
     *
     * @return {Item[]}
     */
    function itemsProvider() {
        return [
            {name: 'Eggs', quantity: 10},
            {name: 'Noodles', quantity: 2},
            {name: 'Brinjal', quantity: 3},
            {name: 'Garlic', quantity: 5},
            {name: 'Soy sauce', quantity: 1}
        ];
    }
})();
