angular.module('MoneySaverApp').controller('PropertiesCtrl', propertiesCtrl);

propertiesCtrl.$inject = [ '$scope', 'TimezoneResource', 'PropertiesResource', '$log' ];

function propertiesCtrl($scope, timezones, properties, $log)
{
	var original;

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

	function dismissSpinner() {
		$log.log('Data load is done!');
    }

	function selectTimezone(timezone) {
		$scope.properties.timezone = timezone;
	}

	function save() {
		$log.log('Saving properties!');

		properties.save($scope.properties).then(dismissSpinner, fail);
    }

    function fail(obj) {
		$log.log('FAIL!');
		$log.log(obj);
    }

    function cancel() {
		$log.log('Cancelling changes!');

		$scope.properties = angular.copy(original);
	}
}