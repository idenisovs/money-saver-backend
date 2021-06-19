import intervals from './intervals';

const dal = {
    intervals,
    payments: require('./payments'),
    users: require('./users'),
    properties: require('./properties'),
    timezones: require('./timezones')
};

export default dal;