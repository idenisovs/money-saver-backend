module.exports = function completeAuthentication(req, res) {
    res.json(req.user);
};
