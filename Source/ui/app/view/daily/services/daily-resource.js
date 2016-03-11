/**
 * DailyDataFactory.
 * This factory is used to work with remote Daily financial data.
 * Created by Ga5Xz2 on 14.05.2015.
 */
var app = angular.module('MoneySaverApp');

app.factory('DailyResource', dailyResource);

dailyResource.$inject = [ '$resource', '$log' ];

function dailyResource($resource, $log)
{
	var paymentsConfig = { 'get': { method: 'GET', isArray: true } };
	var paymentsResource = $resource('/api/payments', {}, paymentsConfig);
	var summaryResource = $resource('/api/intervals/latest/summary');
	var latestIntervalResource = $resource('/api/intervals/latest');
	var intervalsResource = $resource('/api/intervals');

	var api =
	{
		getSummary: getSummary,
		getLatestInterval: getLatestInterval,
		getPayments: getPayments,
		savePayment: savePayment,
		saveInterval: saveInterval
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

	function getPayments(date)
	{
		if (!date)
		{
			return paymentsResource.get().$promise;
		}

		return paymentsResource.get({ date: date }).$promise;
	}

	function savePayment(payment)
	{
		payment.sum = parseFloat(payment.sum);

		return paymentsResource.save(payment).$promise;
	}

	function saveInterval(interval)
	{
		return intervalsResource.save(interval).$promise;
	}
}