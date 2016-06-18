/**
 * Created by I.Denisovs on 16.13.6.
 */
var app = angular.module('MoneySaverAppLogin', ['ui.bootstrap', 'ngCookies', 'ngResource']);

app.controller('login-ctrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$timeout', 'login-service'];

function loginCtrl($scope, $timeout, loginService)
{
    $scope.showWarning = false;
    $scope.message = 'Hello, world!';

    $timeout(warning, 3000);

    function warning()
    {
        $scope.showWarning = true;
    }
}