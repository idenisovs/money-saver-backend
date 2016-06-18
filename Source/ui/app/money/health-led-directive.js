/**
 * Created by Ilya Denisov on 12.03.2016..
 */

var app = angular.module('MoneySaverApp');

app.directive('healthLed', healthLedDirective);

healthLedDirective.$inject = [ 'HealthResource', '$log', '$timeout' ];

function healthLedDirective(healthResource, $log, $timeout)
{
    var directive =
    {
        restrict: 'E',
        template: '<span>{{counter}}</span>',
        link: link
    };

    function link($scope, element, attrs)
    {
        element.css('display', 'block');
        element.css('color', 'yellow');
        element.css('height', '15pt');
        element.css('width', '15pt');
        element.css('border-radius', '10px');
        element.css('text-align', 'center');
        element.css('background', 'white');

        var failCounter = 0;
        var maxFails = 5;
        var checkInterval = 5000;

        checkHealth();

        function checkHealth()
        {
            healthResource.check().then(onCheckOk, onCheckFailed);
        }

        function onCheckOk()
        {
            failCounter = 0;
            element.css('background', 'lime');
            $timeout(checkHealth, checkInterval);
        }

        function onCheckFailed()
        {
            failCounter++;
            element.css('background', 'yellow');

            if (failCounter > maxFails - 1)
            {
                element.css('background', 'red');
                return;
            }

            $timeout(checkHealth, checkInterval);
        }
    }



    return directive;
}