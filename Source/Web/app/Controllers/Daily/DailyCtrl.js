var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', ['$scope', '$modal', '$log', 
	function($scope, $modal, $log){
		
		$scope.show = function() { console.log('ok'); };
		
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