/**
 * This module contains data operations for table Payments
 * Created by I.Denisovs on 13.09.2015..
 */
var payments =
{
    getByIntervalId: require('./get-by-interval-id'),

    getDailySpendings: require('./get-daily-spendings'),

    getByDate: require('./get-by-date'),

    getByDateRange: require('./get-by-date-range'),

    getById: require('./get-by-id'),

    save: require('./save-payment'),

    update: require('./update-payment'),

    deleteByInterval: require('./delete-by-interval'),

    deleteById: require('./delete-by-id')
};


module.exports = payments;

    