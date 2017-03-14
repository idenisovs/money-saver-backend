/**
 * This endpoint should return the number of active users;
 *
 * Created by I.Denisovs on 14.03.2017.
 */

function getActiveUsersCount(req, res) {
    res.json({ active: 123 });
}

module.exports = getActiveUsersCount;