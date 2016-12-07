/**
 * Created by I.Denisovs on 06.12.2016
 */

angular.module('MoneySaverApp').factory('PropertiesResource', propertiesResource);

propertiesResource.$inject = [ '$resource', '$log' ];

function propertiesResource($resource, $log) {

    var config = {
        get: { method: 'GET', isArray: false },
        save: { method: 'PUT', isArray: false }
    };

    var properties = $resource('api/properties', {}, config);

    function get() {
        return properties.get().$promise;
    }
	
	function save(data) {
		return properties.save(data).$promise;
	}

    var api = {
        get: get,
		save: save
    };

    return api;
}