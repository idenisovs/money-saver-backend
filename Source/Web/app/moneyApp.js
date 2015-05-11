var app = angular.module('MoneySaverApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', 
	function($routeProvider){
		$routeProvider.when('/daily', {
			templateUrl: 'app/daily.html',
			controller: 'DailyCtrl'
		});
		
		$routeProvider.when('/monthly', {
			templateUrl: 'app/monthly.html',
			controller: 'MonthlyCtrl'
		});
		
		$routeProvider.otherwise({
			redirectTo: '/daily'
		});
	}
]);

app.controller('DailyCtrl', ['$scope', '$modal', '$log', 
	function($scope, $modal, $log){

		$scope.show = function() {
			var modalInstance = $modal.open({
				animation: true,
				size: 'lg',
				templateUrl: 'app/modal.html',
				controller: 'ModalInstanceCtrl'
			});
		};
	}
]);

app.controller('MonthlyCtrl', ['$scope', '$modal', '$log', 

	function($scope, $modal, $log){
		
		$scope.message = {
			header: 'Hello, there!',
			body: 'It`s your monthly spendings page!'
		};

	}
	
]);

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$log', 
	function($scope, $modalInstance, $log){
		//$log.info('Kkk');
		$scope.selected = { item: 'Hello, world!' };
		
		$scope.ok = function() {
			//$log.info('ok');
			$modalInstance.close();
		};
		
		$scope.cancel = function() {
			//$log.info('cancel');
			$modalInstance.dismiss('cancel');
		};
	}
]);