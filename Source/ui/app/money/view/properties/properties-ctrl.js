angular.module('MoneySaverApp').controller('PropertiesCtrl', propertiesCtrl);

propertiesCtrl.$inject = ['$scope'];

function propertiesCtrl($scope)
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
			primary: '', 
			confirm: '' 
		},
		timezone: 0
	};
}