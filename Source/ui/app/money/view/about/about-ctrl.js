/**
 * Created by I.Denisovs on 15.12.2016
 */

angular.module('MoneySaverApp').controller('AboutCtrl', aboutCtrl);

aboutCtrl.$inject = [ '$scope', '$log', '$location', '$anchorScroll' ];

function aboutCtrl($scope, $log, $location, $scroll) {

    $scope.scrollTo = scrollTo;

    function scrollTo(anchor) {
        $location.hash(anchor);
        $scroll();
    }
}