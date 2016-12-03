/**
 * Created by I.Denisovs on 03.12.2016
 */

angular.module('MoneySaverApp').factory('TimezoneResource', timezoneResource);

timezoneResource.$inject = ['$resource'];

function timezoneResource($resource) {

    var config = {
        getAll: { method: 'GET', isArray: true }
    };

    var timezones = $resource('i18n/timezones.json', {}, config);

    function getAll() {
        return timezones.getAll();
    }

    var api = {
        getAll: getAll
    };

    return api;
}