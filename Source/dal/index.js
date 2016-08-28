/**
 * This module is root for all Data Access Layer modules.
 * Created by I. Denisovs on 13.09.2015.
 */
var dal =
{
    intervals: require('./intervals'),

    payments: require('./payments'),

    users: require('./users')
};

module.exports = dal;