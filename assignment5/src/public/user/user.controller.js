(function () {
    "use strict";

    angular.module('public')
        .controller('UserController', UserController);

    UserController.$inject = ['UserService'];
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
        }
    }

})();
