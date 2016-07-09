/**
 * Created by Ilya Denisov on 09.07.2016..
 */

angular.module('MoneySaverApp').factory('IntervalsResource', intervalsResource);

intervalsResource.$inject = [ '$resource', '$log' ];

function intervalsResource($resource, $log)
{
    $log.debug('Intervals Resource alive!');

    var config =
    {
        get: { method: 'GET', isArray: true }
    };

    var intervalsService = $resource('/api/intervals', {}, config);

    var api =
    {
        getAll: getIntervalList,

        getByYear: getIntervalsByYear
    };

    function getIntervalList()
    {
        $log.debug('Taking intervals list!');

        return intervalsService.get().$promise;
    }

    function getIntervalsByYear(year)
    {
        var from = year + '-01-01';
        var till = year + '-12-31';

        var query = { from: from, till: till };

        return intervalsService.get(query).$promise;
    }

    return api;
}