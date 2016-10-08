/**
 * Created by I. Denisovs on 12.12.2015..
 */
var util = require('util');
var host = require('./host.json').host;
var helper = require('./helper/helper');

describe('Intervals REST API', intervalsRestTests);

function intervalsRestTests()
{
    before(helper.login);

    describe('Get intervals', require('./intervals/get-intervals'));
    describe('Create intervals', require('./intervals/create'));
    describe('Delete intervals', require('./intervals/delete-interval'));

    after(helper.clearIntervals);
    after(helper.logout);
}