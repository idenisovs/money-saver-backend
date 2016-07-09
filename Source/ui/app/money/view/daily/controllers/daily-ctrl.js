angular.module('MoneySaverApp').controller('DailyCtrl', dailyController);

dailyController.$inject = [ '$scope', '$log', 'DailyResource', 'IntervalModal', 'PaymentsModal', '$filter' ];

function dailyController($scope, $log, dailyResource, intervalModal, paymentsModal, $filter)
{
	$scope.payment = { sum: null };

	$scope.datePicker = intervalModal.datePicker;
	$scope.openIntervalModal = openIntervalModal;
	$scope.openPaymentsModal = openPaymentsModal;

	$scope.showSpinner = true;
	$scope.summary = {};
	$scope.valid = false;
	$scope.today = today;
	$scope.compareDates = compareDates;
	$scope.savePayment = savePayment;
	$scope.$watch('payment.sum', checkValidity);
	$scope.noIntervalsYet = false;
	$scope.showIntervalsTable = false;
	$scope.selectedYear = 0;

	reloadSummary();

	function today()
	{
		$scope.dt = new Date();
	}

	function savePayment()
	{
		$scope.showSpinner = true;

		dailyResource.savePayment($scope.payment).then(reloadSummary);
	}

	function reloadSummary()
	{
		$scope.payment = { sum: null };

		dailyResource.getSummary().then(updateSummaryData, summaryUpdateFail);
	}

	function summaryUpdateFail(response)
	{
		if (response.status === 404)
		{
			updateSummaryData({});
		}
	}

	function updateSummaryData(response)
	{
		$scope.showSpinner = false;

		$scope.summary = response;

		var interval = $scope.summary.interval;

		$scope.noIntervalsYet = !(interval);

		$scope.showIntervalsTable = !$scope.noIntervalsYet;

		if ($scope.showIntervalsTable)
		{
			$scope.selectedYear = $filter('date')(interval.end, 'yyyy');

			interval.name = setIntervalName(interval);
		}

		$scope.$broadcast('SummaryData');

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

	function openIntervalModal()
	{
		var q = intervalModal.open().result;

		q.then(reloadSummary);
	}

	function openPaymentsModal(date)
	{
		var q = paymentsModal.open(date).result;

		q.then(reloadSummary);
	}

	function setIntervalName(interval)
	{
		if (interval.name)
		{
			return interval.name
		}

		var date = $filter('date');

		var start = date(interval.start, 'dd.MM.yyyy.');
		var end = date(interval.end, 'dd.MM.yyyy.');

		return start + ' — ' + end;
	}
}
