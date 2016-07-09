/**
 * Created by Ilya Denisov on 09.07.2016..
 */

angular.module('MoneySaverApp').controller('IntervalsCtrl', intervalsCtrl);

intervalsCtrl.$inject = [ '$scope', '$routeParams', 'IntervalsResource', '$log' ];

function intervalsCtrl($scope, $routeParams, intervalsResource, $log)
{
    $scope.selectedYear = $routeParams.year ? $routeParams.year : 'all';

    $scope.intervals = intervalsResource.getByYear(2016);

    $scope.intervals.then(done);

    function done(response)
    {
        $log.debug('Fucking done!');

        $log.log(response);
    }
}