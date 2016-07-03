/**
 * This controller handles the Summary updates from parent controller
 * and updates the chart data.
 *
 * Created by I.Denisovs on 03.07.2016.
 */

angular.module('MoneySaverApp').controller('ChartCtrl', chartCtrl);

chartCtrl.$inject = [ '$scope', '$log' ];

function chartCtrl($scope, $log)
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
}
