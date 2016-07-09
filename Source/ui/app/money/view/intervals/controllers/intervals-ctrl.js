/**
 * Created by Ilya Denisov on 09.07.2016..
 */

angular.module('MoneySaverApp').controller('IntervalsCtrl', intervalsCtrl);

intervalsCtrl.$inject = [ '$scope', '$routeParams', 'IntervalsResource', '$log', '$filter' ];

function intervalsCtrl($scope, $routeParams, intervalsResource, $log, $filter)
{
    $scope.selectedYear = $routeParams.year ? $routeParams.year : 'all';
    $scope.mode = $scope.selectedYear === 'all' ? 'YEARS' : 'INTERVALS';
    $scope.years = [];
    $scope.message = 'Fuck you!';

    if ($scope.mode === 'YEARS')
    {
        showYears();
    }
    else
    {
        showIntervals();
    }

    function showYears()
    {
        $log.debug('Showing years!');

        intervalsResource.getYears().then(updateYears);
    }

    function updateYears(response)
    {
        $scope.years = response;
    }

    function showIntervals()
    {
        $log.debug('Showing intervals!');

        intervalsResource.getByYear(2016).then(formatIntervals);
    }

    function formatIntervals(intervals)
    {
        var result = [];

        for (var i = 0; i < intervals.length; i++)
        {
            if (i % 4 === 0)
            {
                result.push([]);
            }

            var interval = intervals[i];

            interval.nr = i + 1;

            interval.name = getIntervalName(interval);

            var row = result.length - 1;

            result[row].push(interval);
        }

        $scope.intervals = result;
    }

    function getIntervalName(interval)
    {
        if (interval.name)
        {
            return interval.name;
        }

        var date = $filter('date');

        var start = date(interval.start, 'dd.MM.yyyy.');
        var end = date(interval.end, 'dd.MM.yyyy.');

        return start + ' — ' + end;
    }
}