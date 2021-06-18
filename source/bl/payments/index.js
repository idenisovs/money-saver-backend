const payments =
{
    get: require('./get-payments'), 

    save: require('./save-payments'), 
    
    delete: require('./delete-payments'),
    
    update: require('./update-payments')
};

module.exports = payments;