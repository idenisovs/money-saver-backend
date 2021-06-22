import * as intervals from './intervals';
import * as payments from './payments';
import * as properties from './properties';
import * as users from './users';

const dal = {
    intervals,
    payments,
    users,
    properties,
    timezones: require('./timezones')
};

export default dal;