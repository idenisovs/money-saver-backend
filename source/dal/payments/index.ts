import getDailySpendings from './get-daily-spendings';
import deleteByInterval from './delete-by-interval';

const payments = {
    getByIntervalId: require('./get-by-interval-id'),

    getDailySpendings,

    getByDate: require('./get-by-date'),

    getByDateRange: require('./get-by-date-range'),

    getById: require('./get-by-id'),

    save: require('./save-payment'),

    update: require('./update-payment'),

    deleteByInterval,

    deleteById: require('./delete-by-id')
};

export default payments;

    