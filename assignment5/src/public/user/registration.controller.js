(function () {
    "use strict";

    angular.module('public')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['UserService'];
    function RegistrationController(userService) {
        var $ctrl = this;

        /**
         * @type {User}
         */
        $ctrl.user = userService.getUser();

        /**
         * Register valid user in user service
         */
        $ctrl.submit = function () {
            userService.register($ctrl.user);
        };

        /**
         * Debug filling
         */
        $ctrl.debugFill = function () {
            $ctrl.user.firstname    = 'First';
            $ctrl.user.lastname     = 'Last';
            $ctrl.user.email        = 'my@email.org';
            $ctrl.user.phone        = '123-123-1234';
            $ctrl.user.favoriteDish = 'A1';
        };

        /**
         * @return {boolean}
         */
        $ctrl.isSigned = function () {
            return userService.isSigned();
        };
    }

})();
