var app = angular.module('MoneySaverApp');

app.config(['$routeProvider', routeProviderConfig]);

function routeProviderConfig($routeProvider)
{
	var routes =
	{
		daily: { templateUrl: 'app/money/view/daily/templates/daily.tpl.html', controller: 'DailyCtrl' },

		monthly: { templateUrl: 'app/money/view/monthly/monthly.tpl.html', controller: 'MonthlyCtrl' },

		intervals: { templateUrl: 'app/money/view/intervals/templates/view.tpl.html', controller: 'IntervalsCtrl' },
		
		properties: { templateUrl: 'app/money/view/properties/view.tpl.html', controller: 'PropertiesCtrl' },

		about: { templateUrl: 'app/money/view/about/view.tpl.html' },

		default: { redirectTo: '/daily' }
	};

	$routeProvider.when('/daily/:intervalId?', routes.daily);

	$routeProvider.when('/monthly', routes.monthly);

	$routeProvider.when('/intervals/:year?', routes.intervals);
	
	$routeProvider.when('/properties', routes.properties);

	$routeProvider.when('/about', routes.about);

	$routeProvider.otherwise(routes.default);
}