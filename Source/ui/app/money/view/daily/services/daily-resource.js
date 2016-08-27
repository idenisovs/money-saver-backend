/**
 * DailyDataFactory.
 * This factory is used to work with remote Daily financial data.
 * Created by I. Denisovs on 14.05.2015.
 */
var app = angular.module('MoneySaverApp');

app.factory('DailyResource', dailyResource);

dailyResource.$inject = [ '$resource', '$log' ];

function dailyResource($resource, $log)
{
	var paymentsConfig =
	{
		'get': { method: 'GET', isArray: true },
		'update': { method: 'PUT', isArray: false }
	};

	var paymentsResource = $resource('/api/payments', {}, paymentsConfig);
	var summaryResource = $resource('/api/summary/payments', {});
	var latestIntervalResource = $resource('/api/intervals/latest');

	var intervalsConfig =
	{
		'create': { method: 'POST', isArray: false },
		'update': { method: 'PUT', isArray: false }
	};

	var intervalsResource = $resource('/api/intervals/:id', {}, intervalsConfig);

	var api =
	{
		getSummary: getSummary,
		getLatestInterval: getLatestInterval,
		getPayments: getPayments,
		savePayment: savePayment,
		updatePayments: updatePayments,
		saveInterval: saveInterval,
		updateInterval: updateInterval
	};

	return api;

	function getSummary(intervalId)
	{
		var query;

		if (intervalId)
		{
			query = { intervalid: intervalId };
		}

		return summaryResource.get(query).$promise;
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

	function updatePayments(payments)
	{
		var goodPayments = [];

		payments.forEach(filter);

		function filter(payment)
		{
			if (payment.add && payment.remove)
			{
				return;
			}

			payment.sum = parseFloat(payment.sum);

			goodPayments.push(payment);
		}

		return paymentsResource.update(goodPayments).$promise;
	}

	function saveInterval(interval)
	{
		return intervalsResource.create(interval).$promise;
	}

	function updateInterval(interval)
	{
		var pathParam = { id: interval.id };
		
		return intervalsResource.update(pathParam, interval).$promise;
	}
}