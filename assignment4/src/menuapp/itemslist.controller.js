(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsListController', ItemsListController);

    ItemsListController.$inject = ['$stateParams', 'items'];
    function ItemsListController($stateParams, items) {
        var itemDetail         = this;
        var item               = items[$stateParams.itemId];
        itemDetail.name        = item.name;
        itemDetail.quantity    = item.quantity;
        itemDetail.description = item.description;
    }

})();
