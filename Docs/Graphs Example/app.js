var deps = [ 'chart.js' ];

var app = angular.module('AngularChartTest', deps);

app.controller('ChartCtrl', chartCtrl);

chartCtrl.$inject = [ '$scope' ];

function chartCtrl($scope)
{
	$scope.message = 'Testing Angular Chart JS 2.0';
	
	$scope.labels = [ '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20' ]
	$scope.series = [ 'Actuals', 'Expected' ];
	$scope.colors = [ '#FF0000', '#0000FF' ];
	
	$scope.data = 
	[ 
		[ 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5 ],
		[ 100, 98, 93, 87, 80, 73, 61, 58, 55, 53, 51, 49, 47, 43, 35, 27, 20, 10, 5, 1 ]
	];
	
	$scope.datasetOverride =
	[
		{ 
			label: 'Expected', 
			type: 'line', 
			borderWidth: 3, 
			backgroundColor: "rgba(255,255,255,0)"
		},
		{ 
			label: 'Actuals', 
			type: 'bar', 
			borderWidth: 1,
			backgroundColor: "rgba(0,0,255,0.75)"
		}
	];
}