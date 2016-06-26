/**
 * Created by I. Denisovs on 20.12.2015..
 */

module.exports = prepareData;

function prepareData()
{
    var summary =
    {
        interval: makeInterval(),
        spendings: makeSpendings()
    };

    return summary;
}


function makeInterval()
{
    var start = new Date(2015, 11, 1);
    var end = new Date(2015, 11, 10);

    return { id: 1, start: start.getTime(), end: end.getTime(), sum: 100.0 };
}

function makeSpendings()
{
    var result =
        [
            { date: '2015-12-02', sum: 7.01 },
            { date: '2015-12-03', sum: 0.99 },
            { date: '2015-12-05', sum: 5.00 },
            { date: '2015-12-06', sum: 2.35 },
            { date: '2015-12-07', sum: 10.00 }
        ];

    return result;
}