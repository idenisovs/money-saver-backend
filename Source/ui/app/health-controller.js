/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var app = angular.module('MoneySaverApp');

app.controller('HealthController', healthController);

healthController.$inject = [ '$scope', 'HealthResource', '$timeout' ];

function healthController($scope, healthResource, $timeout)
{
    var HEALTH =
    {
        UNKNOWN: 0,
        OK: 1,
        PROBLEMS: 2,
        FAILED: 3
    };

    $scope.health = HEALTH.UNKNOWN;
    $scope.responseInterval = 0;
    $scope.failedCount = 0;

    var timestamp = 0;

    checkConnectionHealth();

    function checkConnectionHealth()
    {
        timestamp = Date.now();

        healthResource.check().then(success, fail);
    }

    function success()
    {
        var delta = Date.now() - timestamp;

        $scope.responseInterval = delta;

        $scope.failedCount = 0;

        $scope.health = HEALTH.OK;

        $timeout(checkConnectionHealth, 5000);
    }

    function fail()
    {
        $scope.failedCount++;

        if ($scope.failedCount < 3)
        {
            $scope.health = HEALTH.PROBLEMS;
            $timeout(checkConnectionHealth, 5000);
            return;
        }

        $scope.health = HEALTH.FAILED;
    }
}