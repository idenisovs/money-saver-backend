var app = angular.module('MoneySaverApp');

app.config(['$routeProvider',
	function($routeProvider){
			
		$routeProvider.when('/daily', {
			templateUrl: 'app/controllers/daily/daily.tpl.html',
			controller: 'DailyCtrl'
		});
		
		$routeProvider.when('/monthly', {
			templateUrl: 'app/controllers/monthly/monthly.tpl.html',
			controller: 'MonthlyCtrl'
		});
		
		$routeProvider.otherwise({
			redirectTo: '/daily'
		});
	}
]);