const test = (req, res) => {
    const username = req.user.username;
    res.status(200).render('test', { username })
}

module.exports = test;