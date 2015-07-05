/**
 * DailyDataFactory.
 * This factory is used to work with remote Daily financial data.
 * Created by Ga5Xz2 on 14.05.2015.
 */
var app = angular.module('MoneySaverApp');

app.factory('DailyDataFactory', function(){

    function getDailyData()
    {
        var o = [
            { id: 1, price: 286.32, spent: 71.48 },
            { id: 2, price: 226.17, spent: 13.52 },
            { id: 3, price: 205.66, spent: 5.12 }
        ];

        return o;
    }

    return {
        getDailyData: getDailyData
    };

});