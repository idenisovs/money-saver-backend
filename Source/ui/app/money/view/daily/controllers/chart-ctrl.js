/**
 * This controller handles the Summary updates from parent controller
 * and updates the chart data.
 *
 * Created by I.Denisovs on 03.07.2016.
 */

angular.module('MoneySaverApp').controller('ChartCtrl', chartCtrl);

chartCtrl.$inject = [ '$scope', '$log', '$translate' ];

function chartCtrl($scope, $log, $translate)
{
    var stopWatchSummary = $scope.$watch('summary', dataArrived);

    function dataArrived()
    {
        stopWatchSummary();
        updateChart();
    }

    $scope.chart = makeChartDataObject();

    $scope.$on('SummaryData', updateChart);

    function updateChart()
    {
        if (stopWatchSummary)
        {
            stopWatchSummary();
            stopWatchSummary = null;
        }

        if ($scope.noIntervalsYet || !$scope.summary.schedule)
        {
            return;
        }

        var schedule = $scope.summary.schedule;

        var labelsLength = $scope.chart.labels.length;

        if (labelsLength === 0 || labelsLength !== schedule.length)
        {
            $scope.chart = makeChartDataObject();

            schedule.forEach(fillChartObject);
        }

        var max = Math.round($scope.summary.interval.sum) + 10;

        $scope.chart.options.scales.yAxes[0].ticks.max = max;

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
        $scope.chart.data[0][idx] = round(scheduleItem.sum);

        $scope.chart.data[1][idx] = round(scheduleItem.residual);
    }
	
	function round(value)
	{
		return Math.round(value * 100) / 100;
	}

    function makeChartDataObject()
    {
		var expectedLabel = $translate.instant('CHART_EXPECTED');
		var actualLabel = $translate.instant('CHART_ACTUAL');
		
        var chart =
        {
            labels: [],
            colors: [ '#FF8811', '#97BBCD' ],
            series: [ expectedLabel, actualLabel ],
            data: [ [], [] ],
            datasetOverride:
                [
                    { label: expectedLabel, type: 'line', backgroundColor: 'rgba(255, 255, 255, 0)' },
                    { label: actualLabel, type: 'bar' }
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
}
