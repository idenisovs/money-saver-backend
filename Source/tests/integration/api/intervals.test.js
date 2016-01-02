/**
 * Created by Ga5Xz2 on 12.12.2015..
 */
var request = require('request').defaults({ json: true });
var chai = require('chai');
var assert = chai.assert;
var util = require('util');
var host = require('./host.json').host;
var helper = require('./helper/helper');

describe('Intervals REST API', intervalsRestTests);

function intervalsRestTests()
{
    before(helper.createInterval);

    describe('Get intervals', require('./intervals/get-intervals'));
    describe('Create intervals', require('./intervals/create-interval'));
    describe('Delete intervals', require('./intervals/delete-interval'));

    after(helper.deleteInterval);
}