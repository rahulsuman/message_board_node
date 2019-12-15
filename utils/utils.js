(function () {
    'use strict';
}());

const jwt = require('jsonwebtoken'),
    env = require('./../env'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
module.exports = {
    ensureAuthorized: ensureAuthorized
}

function ensureAuthorized(req, res, next) {
    let unauthorizedJson = {
        code: 401,
        'message': 'Unauthorized',
        data: {}
    };
    if (req.headers.authorization) {
        let token = req.headers.authorization;
        let splitToken = token.split(' ');
        try {
            token = splitToken[1];
            if (splitToken[0] == 'admin_bearer') {
                let decoded = jwt.verify(token, process.env.secret);
                req.user = decoded;
            } else if (splitToken[0] == 'Bearer') {
                let decoded = jwt.verify(token, process.env.secret);
                req.user = decoded;
                User.findOne({
                    isActive: true,
                    isDeleted: false
                }, 'email').exec(function (err, user) {
                    if (err || !user) {
                        res.json(unauthorizedJson);
                    } else {
                        req.user = user;
                        next();
                    }
                });
            } else {
                res.json(unauthorizedJson);
            }
        } catch (err) {
            res.json(unauthorizedJson);
        }
    } else {
        res.json(unauthorizedJson);
    }
}
