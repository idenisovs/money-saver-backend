/**
 * Root module of Intervals BL functions.
 * Created by I. Denisovs on 28.12.2015.
 */

var intervals =
{
    getLatest: require('./get-latest'),

    getById: require('./get-by-id'),
    
    getByTime: require('./get-by-time'),
    
    getByBoundary: require('./get-by-boundary'),
    
    getLatestSummary: require('./get-latest-summary'),
    
    getAll: require('./get-all'),
    
    getYears: require('./get-years'),
    
    create: require('./create-interval'),
    
    delete: require('./delete-interval'),
    
    update: require('./update-interval')
};

module.exports = intervals;