const crypto = require('crypto');

const generateToken = (req, res, next) => {
    const token = crypto.randomBytes(8).toString('hex');
    req.token = token;
    next();
};

module.exports = generateToken;