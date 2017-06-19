(function () {
    'use strict';

    angular
        .module('Spinner')
        .component('loadingSpinner', {
            templateUrl: 'src/spinner/loadingspinner.template.html',
            controller : SpinnerController
        })
        .run(function() {
            console.log('run');
        })
    ;


    SpinnerController.$inject = ['$rootScope'];
    function SpinnerController($rootScope) {
        console.log(222);
        var $ctrl      = this;
        var cancellers = [];

        $ctrl.$onInit = function () {
            var cancel = $rootScope.$on('$stateChangeStart',
                function (event, toState, toParams, fromState, fromParams, options) {
                    $ctrl.showSpinner = true;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $ctrl.showSpinner = false;
                });
            cancellers.push(cancel);

            cancel = $rootScope.$on('$stateChangeError',
                function (event, toState, toParams, fromState, fromParams, error) {
                    $ctrl.showSpinner = false;
                });
            cancellers.push(cancel);
        };

        $ctrl.$onDestroy = function () {
            cancellers.forEach(function (item) {
                item();
            });
        };

    }

})();
