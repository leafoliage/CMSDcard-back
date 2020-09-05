const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const headerAuth = req.headers['authorization']
    const token = headerAuth && headerAuth.split(' ')[1]
    if (!token) return res.status(401).send()

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send(err.message)
        req.currUser = user
        next()
    })
}

module.exports = authenticateToken