/**
 * DailyDataFactory.
 * This factory is used to work with remote Daily financial data.
 * Created by Ga5Xz2 on 14.05.2015.
 */
var app = angular.module('MoneySaverApp');

app.factory('DailyResource', dailyResource);

dailyResource.$inject = [ '$resource' ];

function dailyResource($resource)
{
	var paymentsResource = $resource('/api/payments');
	var summaryResource = $resource('/api/intervals/latest/summary');
	var latestIntervalResource = $resource('/api/intervals/latest');

	var api =
	{
		getSummary: getSummary,
		getLatestInterval: getLatestInterval,
		savePayment: savePayment
	};

	return api;

	function getSummary(callback)
	{
		return summaryResource.get(callback);
	}

	function getLatestInterval()
	{
		return latestIntervalResource.get().$promise;
	}

	function savePayment(payment)
	{
		payment.sum = parseFloat(payment.sum);

		return paymentsResource.save(payment).$promise;
	}
	

}