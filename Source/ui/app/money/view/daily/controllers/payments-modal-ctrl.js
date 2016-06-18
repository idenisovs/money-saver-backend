/**
 * Created by Ilya Denisov on 11.03.2016..
 */

var app = angular.module('MoneySaverApp');

app.controller('PaymentsModalCtrl', paymentsModalCtrl);

paymentsModalCtrl.$inject = [ '$scope', '$log', '$uibModalInstance', 'date', 'DailyResource' ];

function paymentsModalCtrl($scope, $log, $modalInstance, date, dailyResource)
{
    $scope.saveBlocked = true;
    $scope.controlsDisabled = false;
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
        $scope.controlsDisabled = true;

        dailyResource.updatePayments($scope.payments).then(close);
    }

    function close()
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
        var time = new Date();

        var hh = time.getHours();
        var mm = time.getMinutes();
        var ss = time.getSeconds();

        var payment =
        {
            add: true,
            time: moment($scope.date).hour(hh).minute(mm).second(ss).valueOf()
        };

        $scope.payments.push(payment);
    }

    function reset()
    {
        angular.copy(backup, $scope.payments);
    }
}