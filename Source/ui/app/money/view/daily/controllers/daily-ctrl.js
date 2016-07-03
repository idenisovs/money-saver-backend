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
	$scope.noIntervalsYet = false;
	$scope.showIntervalsTable = false;

	$scope.chart = makeChartDataObject();

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

		dailyResource.getSummary().then(updateSummaryData);
	}

	function updateSummaryData(response)
	{
		$scope.showSpinner = false;

		$scope.summary = response;

		$scope.noIntervalsYet = !($scope.summary.schedule);

		$scope.showIntervalsTable = !$scope.noIntervalsYet;

		if (!$scope.noIntervalsYet)
		{
			updateChart();
		}

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

	function makeChartDataObject()
	{
		var chart =
		{
			labels: [],
			colors: [ '#FF8811', '#97BBCD' ],
			series: [ 'Expected', 'Actual' ],
			data: [ [], [] ],
			datasetOverride:
			[
				{ label: 'Expected', type: 'line', backgroundColor: 'rgba(255, 255, 255, 0)' },
				{ label: 'Actual', type: 'bar' }
			],
			options:
			{
				scales: {
					xAxes: [{ display: false }],
					yAxes: [{
						ticks: {
							max: 0,
							beginAtZero: true
						}
					}]
				}
			}
		};

		return chart;
	}

	function updateChart()
	{
		$log.info($scope.summary.schedule);

		var schedule = $scope.summary.schedule;

		if ($scope.chart.labels.length === 0)
		{
			schedule.forEach(fillChartObject);
		}

		schedule.forEach(updateChartItems);
	}

	function fillChartObject(scheduleItem)
	{
		var date = scheduleItem.date.split('-');

		var label = date[2] + '.' + date[1];

		$scope.chart.labels.push(label);
		$scope.chart.data[0].push(0);
		$scope.chart.data[1].push(0);
	}

	function updateChartItems(scheduleItem, idx)
	{
		if (idx === 0 && $scope.chart.options.scales.yAxes[0].ticks.max === 0)
		{
			var max = Math.round(scheduleItem.sum) + 10;

			$scope.chart.options.scales.yAxes[0].ticks.max = max;
		}

		$scope.chart.data[0][idx] = Math.round(scheduleItem.sum * 100) / 100;

		$scope.chart.data[1][idx] = scheduleItem.residual;
	}
}