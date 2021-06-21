import * as intervals from './intervals';

const dal = {
    intervals,
    payments: require('./payments').default,
    users: require('./users').default,
    properties: require('./properties'),
    timezones: require('./timezones')
};

export default dal;