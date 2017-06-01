(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        /**
         * Defines a states with messages
         * @type {Object}
         */
        const STATES = {
            empty  : {
                message: "Please enter data first",
                state  : "info"
            },
            tooMuch: {
                message: "Too much!",
                state  : "danger"
            },
            enough : {
                message: "Enjoy!",
                state  : "success"
            }
        };

        // Set default values first
        setState('empty');

        /**
         * Count items and change the state of UI
         * @return {void}
         */
        $scope.check = function () {
            var itemsRaw = $scope.menu, items;

            if (!itemsRaw) {
                return setState('empty');
            }

            items = itemsRaw.split(',');

            // Removes all empty items
            items = items.filter(function (item) {
                item = item.trim();
                return (item && 0 !== item.length);
            });

            if (!items || !items.length) {
                return setState('empty');
            }
            if (items.length <= 3) {
                return setState('enough');
            }
            else {
                return setState('tooMuch');
            }
        };

        /**
         * Display a state into UI
         * @param {String} type One of STATES keys
         * @return {void}
         */
        function setState(type) {
            $scope.message = STATES[type].message;
            $scope.state   = STATES[type].state;
        }
    }
})();
