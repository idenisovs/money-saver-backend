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
    $scope.remove = remove;
    $scope.cancelRemove = cancelRemove;
    $scope.add = add;
    $scope.reset = reset;

    dailyResource.getPayments(date).then(viewPayments);

    var backup;

    function viewPayments(payments)
    {
        backup = payments;

        angular.copy(backup, $scope.payments);

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

    function remove(payment)
    {
        payment.remove = true;
    }

    function cancelRemove(payment)
    {
        delete payment.remove;
    }

    function add()
    {
        var payment =
        {
            add: true,
            time: Date.now()
        };

        $scope.payments.push(payment);
    }

    function reset()
    {
        angular.copy(backup, $scope.payments);
    }
}