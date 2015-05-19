var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', ['$scope', '$modal', '$log', 
	function($scope, $modal, $log){

		$scope.show = function() {
			$modal.open({
				animation: true,
				size: 'lg',
				templateUrl: 'app/view/daily/modal.html',
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