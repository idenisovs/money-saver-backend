/**
 * Created by Ilya Denisov on 25.02.2016..
 */

var app = angular.module('MoneySaverApp');

app.factory('IntervalModal', intervalModal);

intervalModal.$inject = [ '$uibModal' ];

function intervalModal($modal)
{
    var datePicker =
    {
        opened: false,
        format: 'dd.MM.yyyy.',
        options: {
            formatYear: 'yyyy',
            startingDay: 1
        },
        minDate: new Date(2015, 0, 1),
        open: datePickerOpen
    };

    var api  =
    {
        datePicker: datePicker,
        open: openIntervalModal
    };

    return api;

    function datePickerOpen($event)
    {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.datePicker.opened = true;
    }

    function openIntervalModal()
    {
        var options = {
            animation: true,
            size: 'md',
            templateUrl: 'app/view/daily/templates/interval.modal.html',
            controller: 'IntervalModalCtrl'
        };

        return $modal.open(options);
    }
}