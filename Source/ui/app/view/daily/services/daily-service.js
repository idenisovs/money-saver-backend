/**
 * DailyDataFactory.
 * This factory is used to work with remote Daily financial data.
 * Created by Ga5Xz2 on 14.05.2015.
 */
var app = angular.module('MoneySaverApp');

app.factory('DailyDataFactory', dailyDataFactory);

dailyDataFactory.$inject = [ '$resource' ];

function dailyDataFactory($resource)
{
	var paymentsResource = $resource('/api/payments');
	var intervalResource = $resource('/api/intervals/latest/summary');

	var api = 
	{
		getSummary: getSummary,
		savePayment: savePayment
	};

	return api;

	function getSummary(callback)
	{
		return intervalResource.get(callback);
	}

	function savePayment(payment)
	{
		payment.sum = parseFloat(payment.sum);

		return paymentsResource.save(payment).$promise;
	}
	

}