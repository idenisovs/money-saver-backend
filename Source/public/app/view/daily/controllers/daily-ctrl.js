var app = angular.module('MoneySaverApp');

app.controller('DailyCtrl', ['$scope', '$modal', '$log', 
	function($scope, $modal, $log){

        $scope.datePicker = {
            opened: false,
            format: 'dd.MM.yyyy.',
            options: {
                formatYear: 'yyyy',
                startingDay: 1
            },
            minDate: new Date(2015, 0, 1),
            open: function($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.datePicker.opened = true;
            }
        };

        $scope.today = function() {
            $scope.dt = new Date();
        };

        $scope.today();

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