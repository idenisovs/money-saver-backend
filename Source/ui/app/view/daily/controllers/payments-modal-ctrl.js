/**
 * Created by Ilya Denisov on 11.03.2016..
 */

var app = angular.module('MoneySaverApp');

app.controller('PaymentsModalCtrl', paymentsModalCtrl);

paymentsModalCtrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'date' ];

function paymentsModalCtrl($scope, $log, $modalInstance, date)
{
    $scope.date = date;
    $scope.message = 'Hello, world!';
    $scope.save = save;
    $scope.cancel = cancel;

    function save()
    {
        $modalInstance.close();
    }

    function cancel()
    {
        $modalInstance.close();
    }
}