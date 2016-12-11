angular.module('MoneySaverApp').controller('PropertiesCtrl', propertiesCtrl);

propertiesCtrl.$inject = [ '$scope', 'TimezoneResource', 'PropertiesResource', '$log' ];

function propertiesCtrl($scope, timezones, properties, $log)
{
	var original;

	$scope.ctrlDisabled = true;
	$scope.timezoneChanged = false;
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
		if ($scope.properties.timezone.timeZoneId === timezone.timeZoneId) {
            return;
		}

		$log.log('Timezone changed!');

        $scope.properties.timezone = timezone;
        $scope.timezoneChanged = true;
        $scope.propsForm.$setDirty();
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
        $scope.timezoneChanged = false;
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
        $scope.timezoneChanged = false;

        $scope.ctrlDisabled = false;
    }
}