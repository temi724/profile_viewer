function admin(req, res, next) {
    if (!req.admin.isAdmin) return res.status(403).send('You are not an admin')
    next()

}



module.exports = admin