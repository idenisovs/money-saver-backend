const dal = {
    intervals: require('./intervals').default,
    payments: require('./payments'),
    users: require('./users'),
    properties: require('./properties'),
    timezones: require('./timezones')
};

module.exports = dal;