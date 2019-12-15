const jwt = require('jsonwebtoken'),
    constantsObj = require('../utils/constant'),
    utility = require('../utils/utility'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Response = require('../utils/response'),
    bcrypt = require('bcryptjs');

/**
 * Function is use to sign up user account 
 */
const userRegister = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        const userObj = {
            email: obj.email
        }
        const userExist = await utility.isUserExists(userObj);
        if (userExist) {
            callback(null, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.userAlreadyExist))
        }
        else {
            const hashedPassword = bcrypt.hashSync(obj.password, 8);
            const UserModel = {
                name: obj.name,
                email: obj.email,
                password: hashedPassword,
            };
            const user = await User.create(UserModel);
            if (!user) {
                callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
            }
            else {
                callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.validationMessages.signupSuccess))
            }
        }
    }
    catch (err) {
        callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
    }
}

/**
 * Function is use to sign in user account 
 */
const userLogin = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        const userObj = {
            email: obj.email,
        }
        const userExist = await utility.isUserExists(userObj);
        if (!userExist) {
            callback(null, Response(constantsObj.statusCode.NotFound, "failed", constantsObj.validationMessages.userNotFound));
        }
        else {
            bcrypt.compare(obj.password, userExist.password, (err, result) => {
                if (err) {
                    callback(err, Response(constantsObj.statusCode.Unauthorized, "failed", constantsObj.validationMessages.invalidEmailOrPassword));
                } else {
                    if (!result)
                        callback(null, Response(constantsObj.statusCode.Unauthorized, "failed", constantsObj.validationMessages.invalidEmailOrPassword));

                    const payload = {
                        email: obj.email,
                    };
                    var token = jwt.sign(payload, process.env.secret, {
                        expiresIn: 60 * 60 * 24 // expires in 24 hours
                    });
                    User.update(payload, { $set: { isLogedIn: true } }, {
                        new: true
                    }, (err, data)=>{
                        console.log(err, data)
                    });
                    let data = {
                        name: userExist.name,
                        token: token,
                    }
                    callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.messages.loginSuccess, data));
                }
            });
        }
    }
    catch (err) {
        callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err));
    }
}

/**
 * Function is use to sign out user account 
 */
const userLogout = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        const logedOut = await User.update({ _id: obj.userId }, { $set: { isLogedIn: false } }, {
            new: true
        }) ? true : false;
        callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.messages.logotSuccess, logedOut));

    } catch (err) {
        callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err));
    }
}
module.exports = Object.assign({
    userRegister,
    userLogin,
    userLogout
});

