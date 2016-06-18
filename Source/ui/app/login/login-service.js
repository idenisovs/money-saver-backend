/**
 * Created by I.Denisovs on 16.18.6.
 */

var app = angular.module('MoneySaverAppLogin');

app.factory('login-service', loginService);

loginService.$inject = ['$resource', '$log'];

function loginService($resource, $log)
{
    var authResourceConfig =
    {
        'post': { method: 'POST', isArray: false }
    };

    var authResource = $resource('/api/auth', {}, authResourceConfig);

    var api =
    {
        auth: authorization
    };

    return api;

    function authorization(login, password)
    {
        var credentials = { username: login, password: password };

        return authResource.post(credentials).$promise;
    }
}