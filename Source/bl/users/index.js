/**
 * This BL function helps to process the requests to the Users resource.
 *
 * Created by I.Denisovs on 16.23.5.
 */

var users =
{
    getById: require('./get-by-id'),

    getActiveCount: require('./get-active-count')
};

module.exports = users;