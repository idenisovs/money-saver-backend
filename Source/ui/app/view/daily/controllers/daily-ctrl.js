var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', dailyController);

dailyController.$inject = [ '$scope', '$modal', '$log', 'DailyDataFactory', 'usSpinnerService', '$timeout' ];

function dailyController($scope, $modal, $log, dailyResource, spinnerService, $timeout)
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

	$scope.payment = { sum: null };
	$scope.datePicker = datePicker;
	$scope.showSpinner = true;
	$scope.summary;
	$scope.valid = false;
	$scope.viewNewIntervalModal = viewNewIntervalModal;
	$scope.today = today;
	$scope.compareDates = compareDates;
	$scope.savePayment = savePayment;
	$scope.$watch('payment.sum', checkValidity);

	reloadSummary();

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

	function savePayment()
	{
		$log.log('Saving payment ' + $scope.payment.sum);

		$scope.showSpinner = true;

		dailyResource.savePayment($scope.payment).then(reloadSummary);
	}

	function reloadSummary()
	{
		$scope.payment = { sum: null };

		$scope.summary = dailyResource.getSummary(onSummaryReceived);
	}

	function onSummaryReceived()
	{
		$scope.showSpinner = false;

		today();
	}

	var todayTimestamp = moment().startOf('day').valueOf();

	function checkValidity()
	{
		$scope.valid = !isNaN($scope.payment.sum) && $scope.payment.sum !== null;
	}

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