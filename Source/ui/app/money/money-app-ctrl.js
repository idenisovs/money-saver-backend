/**
 * Created by Ilya Denisov on 25.06.2016..
 */

angular.module('MoneySaverApp').controller('AppCtrl', appCtrl);

appCtrl.$inject = [ '$scope', '$resource', '$log', '$window', '$location',
    '$cookies', '$translate' ];

function appCtrl($scope, $resource, $log, $window, $location, $cookies, $translate)
{
    $scope.version = '';
    $scope.logout = logout;
    $scope.isActive = isActive;

    $resource('/api/version').get(updateVersion);

    var language = $cookies.get('lang');

    if (language)
    {
        $log.log('Selected language: ', language);

        $translate.use(language);
    }

    function updateVersion(response)
    {
        $scope.version = response.version;
    }

    function logout()
    {
        $resource('/api/auth/logout').get(logoutDone);
    }

    function logoutDone()
    {
        $window.location.href = 'login.html?logout=true';
    }

    function isActive(page)
    {
        var path = $location.path().substr(1, page.length);

        return (path === page);
    }
}
