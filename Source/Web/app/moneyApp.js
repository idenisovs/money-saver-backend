var app = angular.module('MoneySaverApp', ['ui.bootstrap']);

app.controller('messageCtrl', ['$scope', function($scope){

    $scope.hello = 'Hello, world!';

}]);