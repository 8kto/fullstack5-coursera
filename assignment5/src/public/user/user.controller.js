(function () {
    "use strict";

    angular.module('public')
        .controller('UserController', UserController);

    UserController.$inject = ['UserService'];

    /**
     * @param {UserService} userService
     * @constructor
     */
    function UserController(userService) {
        var $ctrl = this;

        /**
         * @type {User}
         */
        $ctrl.user = userService.getUser();

        /**
         * @return {boolean}
         */
        $ctrl.isSigned = function () {
            return userService.isSigned();
        };

        /**
         * @return {MenuItem}
         */
        $ctrl.getUserFavoriteMenuItem = function () {
            return userService.getUserFavoriteMenuItem();
        }
    }

})();
