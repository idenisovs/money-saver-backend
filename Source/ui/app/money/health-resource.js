/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var app = angular.module('MoneySaverApp');

app.factory('HealthResource', healthResource);

healthResource.$inject = [ '$resource' ];

function healthResource($resource)
{
    var health = $resource('/api/health');

    var api =
    {
        check: callHealthEndpoint
    };

    return api;

    function callHealthEndpoint()
    {
        return health.get().$promise;
    }
}