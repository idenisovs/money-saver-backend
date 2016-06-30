/**
 * Created by I.Denisovs on 16.30.6.
 */

angular.module('MoneySaverApp').controller('chart-ctrl', chartCtrl);

chartCtrl.$inject = [ '$scope' ];

function chartCtrl($scope)
{
    var expected = [ 100, 80, 60, 40, 20, 0 ];
    var actuals = [ 100, 87, 52, 43, 19, 3 ];

    $scope.labels = [ '28.06', '29.06', '30.06', '01.07', '02.07', '03.07' ];

    $scope.colors = [ '#FF8811', '#97BBCD' ];

    $scope.data =
    [
        expected,
        actuals
    ];

    $scope.datasetOverride =
    [
        {
            label: 'Expected',
            type: 'line',
            backgroundColor: 'rgba(255, 255, 255, 0)'
        },
        {
            label: 'Actuals',
            type: 'bar'
        }
    ];

}