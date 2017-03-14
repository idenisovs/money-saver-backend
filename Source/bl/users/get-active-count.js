/**
 * This function calculates the number of active users.
 *
 * Created by I.Denisovs on 14.03.2017.
 */

function getActiveUsersCount(success, error) {
    setTimeout(function() {
        success(123);
    }, 1234);
}

module.exports = getActiveUsersCount;