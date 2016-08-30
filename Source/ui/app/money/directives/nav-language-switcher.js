angular.module('MoneySaverApp').directive('navLanguageSwitcher', languageSwitcher);

languageSwitcher.$inject = [ '$cookies', '$log', '$translate' ];

function languageSwitcher($cookies, $log, $translate)
{
	//{ key: 'lv', label: 'lang_lv', flag: 'latvia-flag-icon-64.png' }
	
	var languages =
    {
		'en': { label: 'English', flag: 'gb.png' },
		'ru': { label: 'Русский', flag: 'ru.png' }
	}
	
	var options =
    {
        restrict: 'A',
        templateUrl: 'app/money/directives/nav-language-switcher.html',
        link: link
    };
	
	function link($scope)
	{
		var currentLanguage = $cookies.get('lang') || 'en';
		
		$scope.languages = languages;
		$scope.current = languages[currentLanguage];
		$scope.switchLanguage = switchLanguage;

		function switchLanguage(selectedLanguage)
		{
			if (selectedLanguage === currentLanguage) 
			{
				return;
			}
			
			$translate.use(selectedLanguage);
			
			$scope.current = languages[selectedLanguage];
			
			var options = { expires: moment().add(1, 'month').toDate() };

			$cookies.put('lang', selectedLanguage, options)
			
			currentLanguage = selectedLanguage;
		}
	}
	
	return options;
}