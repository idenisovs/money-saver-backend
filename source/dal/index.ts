import * as intervals from './intervals';
import * as payments from './payments';
import * as properties from './properties';

const dal = {
    intervals,
    payments,
    users: require('./users').default,
    properties,
    timezones: require('./timezones')
};

export default dal;