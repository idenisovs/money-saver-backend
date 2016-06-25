angular.module('MoneySaverApp').controller('MonthlyCtrl', monthlyCtrl);

monthlyCtrl.$inject = ['$scope'];

function monthlyCtrl($scope)
{
	$scope.message =
	{
		header: 'Sorry!',
		body: 'Not implemented yet!'
	};
}