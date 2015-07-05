var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', ['$scope', '$modal', '$log', 
	function($scope, $modal, $log){

		$scope.viewNewIntervalModal = function() {
			$modal.open({
				animation: true,
				size: 'md',
				templateUrl: 'app/view/daily/templates/interval.modal.html',
				controller: 'IntervalModalCtrl'
			});
		};
	}
]);

app.controller('IntervalModalCtrl', ['$scope', '$modalInstance', '$log', 
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