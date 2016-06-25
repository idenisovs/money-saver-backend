/**
 * Created by Ilya Denisov on 25.06.2016..
 */

angular.module('MoneySaverApp').controller('TitleCtrl', titleCtrl);

titleCtrl.$inject = [ '$scope', '$resource' ];

function titleCtrl($scope, $resource)
{
    $scope.version = '';

    $resource('/api/version').get(updateVersion);

    function updateVersion(response)
    {
        $scope.version = response.version;
    }
}
