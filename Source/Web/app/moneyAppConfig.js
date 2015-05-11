var app = angular.module('MoneySaverApp');

app.config(['$routeProvider',
	function($routeProvider){
			
		$routeProvider.when('/daily', {
			templateUrl: 'app/Controllers/Daily/Daily.html',
			controller: 'DailyCtrl'
		});
		
		$routeProvider.when('/monthly', {
			templateUrl: 'app/Controllers/Monthly/Monthly.html',
			controller: 'MonthlyCtrl'
		});
		
		$routeProvider.otherwise({
			redirectTo: '/daily'
		});
	}
]);