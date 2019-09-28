module.exports = function(req, res) {
    res.render('login', {authentication: true});
}