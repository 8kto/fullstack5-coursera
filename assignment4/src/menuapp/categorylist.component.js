(function () {
    'use strict';

    angular
        .module('MenuApp')
        .component('categoryList', {
            templateUrl: 'src/menuapp/templates/component/categorylist.template.html',
            bindings   : {
                items: '<'
            }
        });
})();
