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
	var api = 
	{
		getSummary: $resource('/api/intervals/latest/summary').get
	};
	
	return api;
}