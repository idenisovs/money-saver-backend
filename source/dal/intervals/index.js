/**
 * Root module for data access operations of Intervals.
 * Created by I.Denisovs on 13.09.2015..
 */

var intervals =
{
    getLatest: require('./get-latest'),

    getNthLatest: require('./get-nth-latest'),

    getById: require('./get-by-id'), 
    
    getByTime: require('./get-by-time'), 
    
    getByBoundary: require('./get-by-boundary'), 
    
    getAll: require('./get-all'), 
    
    create: require('./create'), 
    
    update: require('./update-interval'), 
    
    delete: require('./delete')
};

module.exports = intervals;