var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', dailyController);

dailyController.$inject = [ '$scope', '$modal', '$log', 'DailyDataFactory', 'usSpinnerService', '$timeout' ];

function dailyController($scope, $modal, $log, dailyDataFactory, spinnerService, $timeout)
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

	$scope.datePicker = datePicker;
	$scope.viewNewIntervalModal = viewNewIntervalModal;
	$scope.today = today;
	$scope.showSpinner = true;
	$scope.summary = dailyDataFactory.getSummary(stopSpinner);
	$scope.compareDates = compareDates;

	function stopSpinner()
	{
		$scope.showSpinner = false;
		
		today();

		compareDates();
	}
	
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

	var todayTimestamp = moment().startOf('day').valueOf();

	function compareDates(date)
	{
		var compareTimestamp = moment(date).startOf('day').valueOf();

		if (todayTimestamp > compareTimestamp)
		{
			return 'success';
		}

		if (todayTimestamp < compareTimestamp)
		{
			return;
		}

		return 'info';
	}
}