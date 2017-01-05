/**
 * Created by I.Denisovs on 15.12.2016
 */

angular.module('MoneySaverApp').controller('AboutCtrl', aboutCtrl);

aboutCtrl.$inject = [ '$scope', '$log', '$location', '$anchorScroll' ];

function aboutCtrl($scope, $log, $location, $scroll) {

    $scope.idealChart = makeChart();
    $scope.realChart = makeChart([195, 187, 172, 142, 101, 92, 87, 75, 70, 55 ]);
    $scope.scrollTo = scrollTo;

    function scrollTo(anchor) {
        $location.hash(anchor);
        $scroll();
    }

    function makeChart(actual) {

        var sum = 180;
        var days = 10;
        var expenses = sum / days;
        var expected = [];

        for (var i = 0; i < days; i++) {
            expected.push(sum - expenses * i);
        }

        if (!actual) {
            actual = expected;
        }

        var chart = {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            colors: ['#FF8811', '#97BBCD'],
            series: ['Expected', 'Actual'],
            data: [expected, actual],
            datasetOverride: [
                {label: 'Expected', type: 'line', backgroundColor: 'rgba(255, 255, 255, 0)'},
                {label: 'Actual', type: 'bar'}
            ],
            options: {
                scales: {
                    xAxes: [{display: true}],
                    yAxes: [{
                        ticks: {
                            max: 200,
                            beginAtZero: true,
                            display: false
                        }
                    }]
                }
            }
        };

        return chart;
    }
}