/**
 * Created by Ga5Xz2 on 28.12.2015..
 */
var Promise = require('promise');
var dal = require('../../dal/dal');

module.exports = savePayments;

function savePayments(payments, success, error)
{
	try
	{
		validate();
		
		save();
	}
	catch(err)
	{
		error({ reason: 'params', message: err });
		return;
	}
	
	function validate()
	{
		
	}
	
	function save()
	{
		var q = [];

		var promise;
		
		for (var i = 0; i < payments.length; i++)
		{
			promise = dal.payments.save(payments[i]);
			
			q.push(promise);
		}
		
		Promise.all(q).then(success, error);
	}
}



