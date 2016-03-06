var app = angular.module('MoneySaverApp');

app.controller('IntervalModalCtrl', intervalModalController);

intervalModalController.$inject = [ '$scope', '$uibModalInstance', '$log', 'DailyResource' ];

function intervalModalController($scope, $modalInstance, $log, dailyResource)
{
	var latestInterval = {};

	var dateOptions =
	{
		showWeeks: false,
		startingDay: 1,
		minDate: null
	};

	$scope.controlsDisabled = true;
	$scope.dateOptions = dateOptions;
	$scope.from = new Date();
	$scope.till = moment().endOf('month').toDate();
	$scope.datepickerFrom = { show: false, open: openDatePickerFrom };
	$scope.datepickerTill = { show: false, open: openDatePickerTill };
	$scope.selected = { item: 'Hello, world!' };

	$scope.ok = saveInterval;
	$scope.cancel = cancel;
	$scope.openDatePickerFrom = openDatePickerFrom;
	$scope.openDatePickerTill = openDatePickerTill;


	dailyResource.getLatestInterval().then(updateLatestInterval);

	function updateLatestInterval(receivedInterval)
	{
		latestInterval = receivedInterval;
		$scope.controlsDisabled = false;
	}

	function saveInterval()
	{
		$log.log($scope.from);
		$log.log($scope.till);
		$modalInstance.close();
	}

	function cancel()
	{
		//$log.info('cancel');
		$modalInstance.dismiss('cancel');
	}

	function openDatePickerFrom()
	{
		$scope.dateOptions.minDate = moment(latestInterval.end).add(1, 'd');
		$scope.datepickerFrom.show = true;
	}

	function openDatePickerTill()
	{
		$scope.dateOptions.minDate = moment($scope.from).add(1, 'd');
		$scope.datepickerTill.show = true;
	}
}