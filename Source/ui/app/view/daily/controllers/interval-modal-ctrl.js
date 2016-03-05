var app = angular.module('MoneySaverApp');

app.controller('IntervalModalCtrl', intervalModalController);

intervalModalController.$inject = [ '$scope', '$uibModalInstance', '$log' ];

function intervalModalController($scope, $modalInstance, $log)
{
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