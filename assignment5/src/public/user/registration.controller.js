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
        $ctrl.user = {
            username: '',
            email   : '',
            phone   : ''
        };

        /**
         * Register valid user in user service
         */
        $ctrl.submit = function () {
            console.log('submit');
            userService.register($ctrl.user);
        };

        /**
         * Debug filling
         */
        $ctrl.debugFill = function () {
            $ctrl.user.username = 'Username';
            $ctrl.user.email    = 'my@email.org';
            $ctrl.user.phone    = '123-123-1234';
        };
    }

})();
