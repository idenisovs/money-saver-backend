var app = angular.module('MoneySaverApp');

app.config(['$routeProvider', routeProviderConfig]);

function routeProviderConfig($routeProvider)
{
	var routes =
	{
		daily: { templateUrl: 'app/view/daily/templates/daily.tpl.html', controller: 'DailyCtrl' },

		monthly: { templateUrl: 'app/view/monthly/monthly.tpl.html', controller: 'MonthlyCtrl' },

		default: { redirectTo: '/daily' }
	};

	$routeProvider.when('/daily', routes.daily);

	$routeProvider.when('/monthly', routes.monthly);

	$routeProvider.otherwise(routes.default);
}