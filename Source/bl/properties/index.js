/**
 * This business logic module allow to manage the properties of users.
 *
 * Created by I.Denisovs on 03.12.2016
 */

var properties = {
    get: require('./get-properties'),
    save: require('./save-properties')
};

module.exports = properties;