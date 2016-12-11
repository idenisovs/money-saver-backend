angular.module('MoneySaverApp').controller('PropertiesCtrl', propertiesCtrl);

propertiesCtrl.$inject = [ '$scope', 'TimezoneResource', 'PropertiesResource', '$log' ];

function propertiesCtrl($scope, timezones, properties, $log)
{
	var original;

	$scope.ctrlDisabled = true;
	$scope.selectTimezone = selectTimezone;
	$scope.save = save;
	$scope.cancel = cancel;

	timezones.getAll().then(receiveTimezones);

	function receiveTimezones(timezones) {
		$scope.timezones = timezones;

		properties.get().then(receiveProperties);
    }

    function receiveProperties(properties) {
		original = properties;

		$scope.properties = angular.copy(properties);

		dismissSpinner();
	}

	function selectTimezone(timezone) {
		$scope.properties.timezone = timezone;
	}

	function save() {
		$log.log('Saving properties!');

		$scope.ctrlDisabled = true;

		properties.save($scope.properties).then(dismissSpinner, fail);
    }

    function cancel() {
		$log.log('Cancelling changes!');

		$scope.properties = angular.copy(original);

		$scope.propsForm.$setPristine();
		$scope.propsForm.$setUntouched();
	}

    function fail(obj) {
        $log.log('FAIL!');
        $log.log(obj);

        dismissSpinner();
    }

    function dismissSpinner() {
        $log.log('Data load is done!');

        $scope.propsForm.$setPristine();
        $scope.propsForm.$setUntouched();

        $scope.ctrlDisabled = false;
    }
}