angular.module('MoneySaverApp').controller('PropertiesCtrl', propertiesCtrl);

propertiesCtrl.$inject = ['$scope'];

function propertiesCtrl($scope)
{
	$scope.message =
	{
		header: 'Sorry!',
		body: 'Not implemented yet!'
	};
}