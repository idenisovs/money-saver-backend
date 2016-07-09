/**
 * Created by Ilya Denisov on 09.07.2016..
 */

angular.module('MoneySaverApp').controller('IntervalsCtrl', intervalsCtrl);

intervalsCtrl.$inject = [ '$scope', '$routeParams' ];

function intervalsCtrl($scope, $routeParams)
{
    $scope.message = 'Fuck you!!!';

    $scope.selectedYear = $routeParams.year ? $routeParams.year : 'all';
}