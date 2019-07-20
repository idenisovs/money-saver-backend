module.exports = function completeAuthentication(req, res) {
    res.json({
        user: req.user
    });
};
