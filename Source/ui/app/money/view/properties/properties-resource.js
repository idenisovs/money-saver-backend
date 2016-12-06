/**
 * Created by I.Denisovs on 06.12.2016
 */

angular.module('MoneySaverApp').factory('PropertiesResource', propertiesResource);

propertiesResource.$inject = ['$resource'];

function propertiesResource($resource) {

    var config = {
        get: { method: 'GET', isArray: false },
		save: { method: 'PUT', isArray: false }
    };

    var properties = $resource('api/properties', {}, config);

    function get() {
        return properties.get();
    }
	
	function save(properties) {
		return properties.save(properties);
	}

    var api = {
        get: get,
		save: save
    };

    return api;
}