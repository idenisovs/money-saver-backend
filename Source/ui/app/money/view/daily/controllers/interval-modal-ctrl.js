var app = angular.module('MoneySaverApp');

app.controller('IntervalModalCtrl', intervalModalController);

intervalModalController.$inject =
[ 
	'$scope', '$uibModalInstance', '$log', 'DailyResource', 'editMode', 'interval' 
];

function intervalModalController($scope, $modalInstance, $log, dailyResource, editMode, interval)
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
	
	if (editMode)
	{
		$log.debug(interval);
		
		$scope.from = interval.start;
		$scope.till = interval.end;
		$scope.totals = interval.sum;
	}
	else
	{
		$scope.from = new Date();
		$scope.till = moment().endOf('month').toDate();
	}
	
	$scope.datepickerFrom = { show: false, open: openDatePickerFrom };
	$scope.datepickerTill = { show: false, open: openDatePickerTill };
	$scope.selected = { item: 'Hello, world!' };
	$scope.valid = false;
	$scope.createMode = !editMode;
	$scope.editMode = editMode;

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
		var request =
		{
			start: moment($scope.from).format('YYYY-MM-DD'),
			end: moment($scope.till).format('YYYY-MM-DD'),
			sum: $scope.totals
		};

		if ($scope.createMode)
		{
			return dailyResource.saveInterval(request).then(close);
		}

		request.id = interval.id;

		dailyResource.updateInterval(request).then(close);
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