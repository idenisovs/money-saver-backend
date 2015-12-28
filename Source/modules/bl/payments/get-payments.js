/**
 * Created by Ga5Xz2 on 28.12.2015..
 */

module.exports = getPayments;

function getPayments(request, success, error)
{
    success([{ x: 1.23}, { x: 3.21 }]);
}