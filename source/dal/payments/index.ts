import getDailySpendings from './get-daily-spendings';

const payments = {
    getByIntervalId: require('./get-by-interval-id'),

    getDailySpendings,

    getByDate: require('./get-by-date'),

    getByDateRange: require('./get-by-date-range'),

    getById: require('./get-by-id'),

    save: require('./save-payment'),

    update: require('./update-payment'),

    deleteByInterval: require('./delete-by-interval'),

    deleteById: require('./delete-by-id')
};

export default payments;

    