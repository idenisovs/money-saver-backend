/**
 * Created by I.Denisovs on 28.08.2016
 */

angular.module('MoneySaverApp').config(['$translateProvider', translateConfig]);

function translateConfig($translateProvider)
{
    var files = [ { prefix: 'i18n/', suffix: '.json' } ];

    //$translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useStaticFilesLoader({ files: files });
    // $translateProvider.useCookieStorage();
    $translateProvider.preferredLanguage('en');
}