/**
 * Root module of Payments BL functions
 * Created by I. Denisovs on 28.12.2015.
 */

var payments = 
{
    get: require('./get-payments'), 

    save: require('./save-payments'), 
    
    delete: require('./delete-payment'), 
    
    update: require('./update-payments')
};

module.exports = payments;