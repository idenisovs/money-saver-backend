import * as intervals from './intervals';
import * as payments from './payments';

const dal = {
    intervals,
    payments,
    users: require('./users').default,
    properties: require('./properties'),
    timezones: require('./timezones')
};

export default dal;