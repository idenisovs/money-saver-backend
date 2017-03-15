/**
 * Created by Ilya Denisov on 25.06.2016..
 */

angular.module('MoneySaverAppLogin').controller('login-ctrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$resource', 'login-service', '$log', '$window',
    '$translate', '$cookies'];

function loginCtrl($scope, $resource, loginService, $log, $window, $translate, $cookies)
{
    var queryParams = getQueryString();
    var language = $cookies.get('lang');

    $scope.login = '';
    $scope.password = '';
    $scope.showWarning = false;
    $scope.showLoginFailed = false;
    $scope.showLoginRequierd = ('not-authorized' in queryParams);
    $scope.showLogoutSuccess = ('logout' in queryParams);
    $scope.message = 'Hello, world!';
    $scope.version = '';
    $scope.activeUsers = '-';

    $scope.performLogin = performLogin;
    $scope.emptyCredentials = isCredentialsEmpty;
    $scope.changeLanguage = changeLanguage;

    if (language)
    {
        changeLanguage(language);
    }

    $resource('/api/version').get(setVersion);
    $resource('/api/users/active').get(updateUsersCount);

    function setVersion(response)
    {
        $log.info('Application version: %s', response.version);

        $scope.version = response.version;
    }

    function updateUsersCount(users) {
        $scope.activeUsers = users.count;
    }

    function performLogin()
    {
        loginService.auth($scope.login, $scope.password).then(onLoginSuccess, onLoginFailed);

        $scope.login = '';
        $scope.password = '';
    }

    function onLoginSuccess()
    {
        $window.location.href = 'index.html';
    }

    function onLoginFailed(response)
    {
        $log.error('%d: %s', response.status, response.data.message);

        $scope.showLoginFailed = true;
    }

    function isCredentialsEmpty()
    {
        return $scope.login.length === 0 || $scope.password.length === 0;
    }

    function getQueryString()
    {
        var urlParams = {};

        var location = $window.location.href;

        if (location.indexOf('?') === -1)
        {
            return urlParams;
        }

        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = location.split('?')[1];

        while (match = search.exec(query))
        {
            urlParams[decode(match[1])] = decode(match[2]);
        }

        return urlParams;
    }

    function changeLanguage(lang)
    {
        language = lang;

        $translate.use(lang);

        var options = { expires: moment().add(1, 'month').toDate() };

        $cookies.put('lang', lang, options)
    }
}