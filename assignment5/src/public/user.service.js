(function () {
    "use strict";

    /**
     * JsDoc definition of JSON objects returned by REST-services
     * for better IDE autocompletion.
     * (works well in PhpStorm)
     *
     * @typedef {Object} MenuItem
     * @property {Number} id
     * @property {String} name
     * @property {String} description
     * @property {String} large_portion_name
     * @property {Number} price_large
     * @property {Number} price_small
     * @property {String} short_name
     * @property {String} small_portion_name
     */

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

        /**
         * @type {boolean}
         */
        service.signed = false;

        /**
         * @type {MenuItem}
         */
        service.favoriteMenuItem = {};

        /**
         * @return {User}
         */
        service.getUser = function () {
            return service.user;
        };

        /**
         * @param {User} user
         * @param {MenuItem} menuItem
         */
        service.register = function (user, menuItem) {
            service.user             = user;
            service.signed           = true;
            service.favoriteMenuItem = menuItem;

            return true;
        };

        /**
         * @return {boolean}
         */
        service.isSigned = function () {
            return service.signed;
        };

        /**
         * @return {MenuItem}
         */
        service.getUserFavoriteMenuItem = function () {
            return service.favoriteMenuItem;
        }
    }

})();
