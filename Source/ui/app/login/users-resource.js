/**
 * Created by I.Denisovs on 14.03.2017.
 */

var app = angular.module('MoneySaverAppLogin').factory('users-resource', usersResource);

usersResource.$inject = ['$resource', '$log'];

function usersResource($resource, $log) {
    var methods = {
        'get': { isArray: false }
    };

    var activeUsersResource = $resource('/api/users/active', {}, methods);

    function getActiveUsersCount() {
        return activeUsersResource.get().$promise;
    }

    var api = {
        getActiveCount: getActiveUsersCount
    };

    return api;
}