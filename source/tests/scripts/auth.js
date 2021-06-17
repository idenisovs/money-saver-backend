/**
 * Created by I.Denisovs on 16.30.5.
 */

var request = require('request');

request = request.defaults({ jar: true, json: true });

var options = { followAllRedirects: true, body: { username: 'user1', password: 'demo1' } };

request.post('http://rpi2:9001/api/auth', options, loginDone);

function loginDone(err, res, body)
{
    console.log('Login response status: %s.', res.statusCode);

    request.get('http://rpi2:9001/api/intervals/latest', latestDone);
}

var x = 0;

function latestDone(err, res, body)
{
    x++;

    console.log('Status code: %s!', res.statusCode);

    if (res.statusCode === 200)
    {
        console.log('Latest interval: ');
        console.log(body);
    }


    if (x < 2)
    {
        request.get('http://rpi2:9001/api/payments', paymentsDone);
    }
}

function paymentsDone(err, res, body)
{
    console.log('Payments:');
    console.log(body);

    request.get('http://rpi2:9001/api/auth/logout', logoutDone)
}

function logoutDone(err, res, body)
{
    console.log('Logout response status: %s.', res.statusCode);

    console.log('Requesting latest interval again...');

    request.get('http://rpi2:9001/api/intervals/latest', latestDone);
}
