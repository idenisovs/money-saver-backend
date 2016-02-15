var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', dailyController);

dailyController.$inject = [ '$scope', '$modal', '$log', 'DailyDataFactory', 'usSpinnerService', '$timeout' ];

function dailyController($scope, $modal, $log, dailyData, spinnerService, $timeout)
{
	$scope.datePicker = {
		opened: false,
		format: 'dd.MM.yyyy.',
		options: {
			formatYear: 'yyyy',
			startingDay: 1
		},
		minDate: new Date(2015, 0, 1),
		open: datePickerOpen
	};

	$scope.viewNewIntervalModal = viewNewIntervalModal;
	$scope.today = today;

	$scope.showSpinner = true;
	
	$timeout(function() { $scope.showSpinner = false; }, 3000);
	
	today();
	
	function today()
	{
		$scope.dt = new Date();
	}
	
	function datePickerOpen($event)
	{
		$event.preventDefault();
		$event.stopPropagation();
		$scope.datePicker.opened = true;
	}
	
	function viewNewIntervalModal()
	{
		var options = {
			animation: true,
			size: 'md',
			templateUrl: 'app/view/daily/templates/interval.modal.html',
			controller: 'IntervalModalCtrl'
		};
		
		$modal.open(options);
	}
}