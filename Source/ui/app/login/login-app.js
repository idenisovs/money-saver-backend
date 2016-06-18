/**
 * Created by I.Denisovs on 16.13.6.
 */
var app = angular.module('MoneySaverAppLogin', ['ui.bootstrap', 'ngCookies', 'ngResource']);

app.controller('login-ctrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$timeout', 'login-service', '$log', '$window'];

function loginCtrl($scope, $timeout, loginService, $log, $window)
{
    $scope.login = '';
    $scope.password = '';
    $scope.showWarning = false;
    $scope.showLoginFailed = false;
    $scope.message = 'Hello, world!';
    $scope.performLogin = performLogin;
    $scope.emptyCredentials = isCredentialsEmpty;

    $timeout(warning, 2000);

    function warning()
    {
        $scope.showWarning = true;
    }

    function performLogin()
    {
        loginService.auth($scope.login, $scope.password).then(onLoginSuccess, onLoginFailed);
    }

    function onLoginSuccess(response)
    {
        $scope.login = '';
        $scope.password = '';

        $window.location.href = 'index.html';
    }

    function onLoginFailed(response)
    {
        $log.error('%d: %s', response.status, response.data.message);

        $scope.login = '';
        $scope.password = '';

        $scope.showLoginFailed = true;
    }

    function isCredentialsEmpty()
    {
        return $scope.login.length === 0 || $scope.password.length === 0;
    }
}