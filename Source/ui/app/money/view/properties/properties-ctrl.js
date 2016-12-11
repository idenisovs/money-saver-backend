angular.module('MoneySaverApp').controller('PropertiesCtrl', propertiesCtrl);

propertiesCtrl.$inject = [ '$scope', 'TimezoneResource', 'PropertiesResource', '$log' ];

function propertiesCtrl($scope, timezones, properties, $log)
{
	var original;
	var watchersSet = false;

	$scope.incorrectPassword = false;
	$scope.ctrlDisabled = true;
	$scope.timezoneChanged = false;
	$scope.pass = {
		changing: false,
		lengthOk: false,
		uppercaseOk: false,
		numberOk: false,
		matchOk: false
	};

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

        $scope.incorrectPassword = false;

		properties.save($scope.properties).then(dismissSpinner, fail);
    }

    function cancel() {
		$log.log('Cancelling changes!');

		$scope.properties = angular.copy(original);

		$scope.propsForm.$setPristine();
		$scope.propsForm.$setUntouched();
        $scope.timezoneChanged = false;
	}

    function fail(response) {
        $log.log('FAIL!');

        $log.log(response);

        if (response.status === 400) {
        	$scope.incorrectPassword = true;
		}

        dismissSpinner();
    }

    function dismissSpinner() {
        $log.log('Data load is done!');

        $scope.ctrlDisabled = false;

        if (!$scope.incorrectPassword) {
            $scope.propsForm.$setPristine();
            $scope.propsForm.$setUntouched();

            $scope.timezoneChanged = false;

            delete $scope.properties.password;
		}

        if (!watchersSet) {
            $scope.$watch('properties.password.primary', watchPasswords);
            $scope.$watch('properties.password.confirm', watchPasswords);
            watchersSet = true;
		}
    }

    function watchPasswords() {

    	if (!$scope.properties || !$scope.properties.password || !$scope.properties.password.primary) {

            $scope.pass.changing = false;

            $scope.propsForm.primaryPass.$setValidity('value', true);
            $scope.propsForm.primaryPass.$setPristine();

    		return;
		}

        $scope.pass.changing = true;

        var password = $scope.properties.password;

        $scope.pass.lengthOk = password.primary.length > 7;
        $scope.pass.uppercaseOk = password.primary.match(/[A-Z]/);
        $scope.pass.numberOk = password.primary.match(/[0-9]/);
        $scope.pass.matchOk = (password.primary == password.confirm);

        var isValid = $scope.pass.lengthOk
			&& $scope.pass.uppercaseOk
			&& $scope.pass.numberOk
			&& $scope.pass.matchOk;

        $scope.propsForm.primaryPass.$setValidity('value', isValid);
	}
}