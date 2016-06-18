/**
 * Created by I.Denisovs on 16.18.6.
 */

var app = angular.module('MoneySaverAppLogin');

app.factory('login-service', loginService);

loginService.$inject = ['$resource', '$log'];

function loginService($resource, $log)
{
    return {};
}