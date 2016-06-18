/**
 * Created by Ilya Denisov on 11.03.2016..
 */

var app = angular.module('MoneySaverApp');

app.factory('PaymentsModal', paymentsModalFactory);

paymentsModalFactory.$inject = [ '$uibModal' ];

function paymentsModalFactory($modal)
{
    var api =
    {
        open: openPaymentsModal
    };

    return api;

    function openPaymentsModal(date)
    {
        var options =
        {
            animation: true,
            size: 'md',
            templateUrl: 'app/money/view/daily/templates/payments.modal.html',
            controller: 'PaymentsModalCtrl',
            resolve: { date: function() { return date } }
        };

        return $modal.open(options);
    }
}