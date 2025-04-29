const JWT = require('jsonwebtoken')

const createToken = (obj)=> {
    return JWT.sign(obj, process.env.JWT_SECRET, {expiresIn: "10d"});
}

module.exports = createToken;