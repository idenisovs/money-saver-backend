/**
 * Created by Ilya Denisov on 25.06.2016..
 */

angular.module('MoneySaverApp').controller('AppCtrl', appCtrl);

appCtrl.$inject = [ '$scope', '$resource', '$log', '$window', '$location' ];

function appCtrl($scope, $resource, $log, $window, $location)
{
    $scope.version = '';
    $scope.logout = logout;
    $scope.isActive = isActive;

    $resource('/api/version').get(updateVersion);

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
