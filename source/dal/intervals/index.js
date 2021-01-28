const intervals = {
    getLatest: require('./get-latest'),

    getNthLatest: require('./get-nth-latest'),

    getById: require('./get-by-id'), 
    
    getByTime: require('./get-by-time'), 
    
    getByBoundary: require('./get-by-boundary'), 
    
    getAll: require('./get-all'), 
    
    create: require('./create'), 
    
    update: require('./update-interval'), 
    
    delete: require('./delete'),

    getCount: require('./get-intervals-count')

};

module.exports = intervals;
