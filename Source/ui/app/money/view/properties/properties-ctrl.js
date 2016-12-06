angular.module('MoneySaverApp').controller('PropertiesCtrl', propertiesCtrl);

propertiesCtrl.$inject = [ '$scope', 'TimezoneResource', 'PropertiesResource', '$log' ];

function propertiesCtrl($scope, timezones, properties, $log)
{
	$scope.message =
	{
		header: 'Sorry!',
		body: 'Not implemented yet!'
	};
	
	$scope.user = 
	{ 
		login: 'User1',
		email: 'ga5xz2@gmail.com',
		password: 
		{
			original: '',
			created: '', 
			confirm: ''
		},
		timezone: { "timeZoneId": "30", "gmtAdjustment": "GMT+00:00", "useDaylightTime": "1", "value": "0", "label": "(GMT+00:00) Greenwich Mean Time: Dublin, Edinburgh, Lisbon, London" },
	};

	$scope.timezones = timezones.getAll();
	$scope.properties = properties.get();
	
	
	$log.log($scope.properties);

	$scope.selectTimezone = selectTimezone;

	function selectTimezone(timezone) {
		$scope.user.timezone = timezone;
	}
}