(function () {
    "use strict";

    /**
     * @typedef {Object} User
     * @property {String} username
     * @property {String} email
     * @property {String} phone
     */

    angular.module('public')
        .service('UserService', UserService);

    function UserService() {
        var service = this;

        /**
         * @type {User}
         */
        service.user = null;

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
            service.user = user;
            console.log(user);
        };

    }

})();
