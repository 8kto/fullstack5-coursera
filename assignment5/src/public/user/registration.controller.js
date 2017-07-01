(function () {
    "use strict";

    angular.module('public')
        .controller('RegistrationController', RegistrationController);

    RegistrationController.$inject = ['UserService', 'MenuService'];

    /**
     * @param {UserService} userService
     * @param {MenuService} menuService
     * @constructor
     */
    function RegistrationController(userService, menuService) {
        var $ctrl = this;

        /**
         * @type {User}
         */
        $ctrl.user = userService.getUser();

        /**
         * @type {boolean}
         */
        $ctrl.menuItemExists = false;

        /**
         * @type {boolean}
         */
        $ctrl.submitted = false;

        /**
         * Register valid user in user service
         */
        $ctrl.submit = function () {
            $ctrl.submitted = true;
            var shortName   = $ctrl.user.favoriteDish;

            if (!shortName) {
                throw new Error('No short name provided');
            }

            menuService.getMenuItem(shortName)
                .then(function (response) {
                    if (response && response.short_name) {
                        $ctrl.menuItemExists = true;
                        userService.register($ctrl.user, response);
                    }
                    else {
                        $ctrl.menuItemExists = false;
                    }
                })
            ;

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
