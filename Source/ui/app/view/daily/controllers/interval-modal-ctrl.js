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
	$scope.totals;
	$scope.valid = false;

	$scope.ok = saveInterval;
	$scope.cancel = cancel;
	$scope.openDatePickerFrom = openDatePickerFrom;
	$scope.openDatePickerTill = openDatePickerTill;

	$scope.$watch('totals', checkValidity);


	dailyResource.getLatestInterval().then(updateLatestInterval);


	function updateLatestInterval(receivedInterval)
	{
		latestInterval = receivedInterval;
		$scope.controlsDisabled = false;
	}

	function saveInterval()
	{
		var interval =
		{
			start: moment($scope.from).format('YYYY-MM-DD'),
			end: moment($scope.till).format('YYYY-MM-DD'),
			sum: $scope.totals
		};

		dailyResource.saveInterval(interval).then(close);
	}

	function cancel()
	{
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

	function close()
	{
		$modalInstance.close();
	}

	function checkValidity()
	{
		$scope.valid = !isNaN($scope.totals) && $scope.totals !== null;
	}
}