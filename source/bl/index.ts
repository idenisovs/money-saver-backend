import auth from './auth';
import intervals from './intervals';
import * as payments from './payments';

const bl = {
    intervals,
    payments,
    auth,
    users: require('./users'),
    summary: require('./summary'),
    properties: require('./properties')
};

export default bl;
