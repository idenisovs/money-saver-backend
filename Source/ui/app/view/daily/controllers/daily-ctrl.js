var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', dailyController);

dailyController.$inject = [ '$scope', '$log', 'DailyResource', 'IntervalModal', 'PaymentsModal' ];

function dailyController($scope, $log, dailyResource, intervalModal, paymentsModal)
{
	$scope.payment = { sum: null };

	$scope.datePicker = intervalModal.datePicker;
	$scope.openIntervalModal = openIntervalModal;
	$scope.openPaymentsModal = openPaymentsModal;

	$scope.showSpinner = true;
	$scope.summary;
	$scope.valid = false;
	$scope.today = today;
	$scope.compareDates = compareDates;
	$scope.savePayment = savePayment;
	$scope.$watch('payment.sum', checkValidity);

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
}