import auth from './auth';

const bl = {
    intervals: require('./intervals'),
    payments: require('./payments'),
    auth,
    users: require('./users'),
    summary: require('./summary'),
    properties: require('./properties')
};

export default bl;
