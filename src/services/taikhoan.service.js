const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function createAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_AT_SECRET, {
        expiresIn: '1h',
    });
}

function createRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_RF_SECRET, {
        expiresIn: '7d',
    });
}

function decodeToken(token, secret = process.env.JWT_AT_SECRET) {
    return jwt.verify(token, secret, {
        ignoreExpiration: false,
    });
}

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, 10);
}

function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}

module.exports = {
    createAccessToken,
    decodeToken,
    createRefreshToken,
    hashPassword,
    comparePassword,
};
