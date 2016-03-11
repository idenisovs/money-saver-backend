/**
 * Created by Ilya Denisov on 11.03.2016..
 */

var app = angular.module('MoneySaverApp');

app.controller('PaymentsModalCtrl', paymentsModalCtrl);

paymentsModalCtrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'date', 'DailyResource' ];

function paymentsModalCtrl($scope, $log, $modalInstance, date, dailyResource)
{
    $scope.saveBlocked = true;
    $scope.date = date;
    $scope.payments = [];

    $scope.save = save;
    $scope.cancel = cancel;

    dailyResource.getPayments(date).then(viewPayments);

    function viewPayments(payments)
    {
        $scope.payments = payments;
        $scope.saveBlocked = false;
    }

    function save()
    {
        $modalInstance.close();
    }

    function cancel()
    {
        $modalInstance.dismiss('cancel');
    }
}