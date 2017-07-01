(function () {
    "use strict";

    /**
     * @typedef {Object} User
     * @property {String} firstname
     * @property {String} lastname
     * @property {String} email
     * @property {String} phone
     * @property {String} favoriteDish
     */

    angular.module('public')
        .service('UserService', UserService);

    function UserService() {
        var service = this;

        /**
         * @type {User}
         */
        service.user = {};

        service.signed = false;

        /**
         * @return {User}
         */
        service.getUser = function () {
            return service.user;
        };

        /**
         * @param {User} user
         */
        service.register = function (user) {
            service.user   = user;
            service.signed = true;

            return true;
        };

        /**
         * @return {boolean}
         */
        service.isSigned = function () {
            return service.signed;
        }
    }

})();
