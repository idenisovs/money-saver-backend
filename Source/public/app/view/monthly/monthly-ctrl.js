var app = angular.module('MoneySaverApp');

app.controller('MonthlyCtrl', ['$scope', '$modal', '$log', 

	function($scope, $modal, $log){
		
		$scope.message = {
			header: 'Hello, there!',
			body: 'It`s your monthly spendings page!'
		};
	}
	
]);

