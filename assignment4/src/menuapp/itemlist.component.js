(function () {
    'use strict';

    angular.module('MenuApp')
        .component('itemsList', {
            templateUrl: 'src/menuapp/templates/component/items.template.html',
            bindings   : {
                items: '<',
                category: '&'
            }
        });

})();
