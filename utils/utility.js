(function () {
    'use strict';
}());
const constantsObj = require('./constant'),
    User = require('../models/users'),
    Message = require('./../models/messages');
Promise = require('promise');

const isUserExists = (obj) => {
    return new Promise((resolve, reject) => {
        let userObj = {
            email: obj.email,
            isActive: true,
            isDeleted: false
        }
        User.findOne(userObj, (err, result) => {
            if (err) {
                reject(err)
            }
            else if (result) {
                resolve(result);
            }
            else {
                resolve(false);
            }
        })
    })
}

const isUserLogedIn = (obj) => {
    return new Promise((resolve, reject) => {
        let msgObj = {
            _id: obj,
            isActive: true,
            isDeleted: false
        }
        Message.findOne(msgObj, { userId: 1 }, (err, data) => {
            User.findOne(data.userId, { isLogedIn: 1 , email: 1}, (err, result) => {
                if (err) {
                    reject(err)
                }
                resolve(result.isLogedIn);
            })
        });

    })
}
module.exports = {
    isUserExists: isUserExists,
    isUserLogedIn: isUserLogedIn
};