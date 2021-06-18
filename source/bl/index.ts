import auth from './auth';
import intervals from './intervals';

const bl = {
    intervals,
    payments: require('./payments'),
    auth,
    users: require('./users'),
    summary: require('./summary'),
    properties: require('./properties')
};

export default bl;
