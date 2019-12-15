const constantsObj = require('../utils/constant'),
    mongoose = require('mongoose'),
    utility = require('../utils/utility'),
    // User = mongoose.model('User'),
    Message = require('./../models/messages');
Response = require('../utils/response');


/**
 * Function is use to add message
 */
const addMessage = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        const MessageModel = obj;
        const msg = await Message.create(MessageModel);
        if (!msg) {
            callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
        }
        else {
            callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.messages.messageAdded))
        }
    }
    catch (err) {
        callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
    }
}

/**
 * Function is use to delete user message
 */
const deleteMessage = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        else {
            let doc = await Message.update({ _id: obj.messageId }, { $set: { isDeleted: true } }, {
                new: true
            });
            if (!doc) {
                callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
            }
            else {
                callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.validationMessages.messageDeleted))
            }

        }
    } catch (err) {

    }
}

/**
 * Function is use to reply to message
 */
const addReply = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        // check if user is loged in
        const isLogedIn = await utility.isUserLogedIn(obj.messageId);
        if (!isLogedIn) {
            callback(null, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.notLogedIn))
        }
        else {
            const MessageModel = {
                from: obj.from,
                text: obj.text
            };
            let doc = await Message.update({ _id: obj.messageId }, { $push: { reply: MessageModel } }, {
                new: true
            });
            if (!doc) {
                callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
            }
            else {
                callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.validationMessages.messageAdded))
            }
        }

    }
    catch (err) {
        callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
    }
}

/**
 * Function is use to show my message body
 */
const showMessage = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        const condition = {
            userId: mongoose.Types.ObjectId(obj.userId),
            isDeleted: false,
            isActive: true
        };
        const aggregate = [
            {
                $match: condition
            },
            { $sort: { createdAt: -1 } },
            {
                $lookup:
                {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "from"
                }
            },
            { $unwind: '$from' },
            {
                $lookup:
                {
                    from: "users",
                    localField: "reply.from",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: { path: "$user", "preserveNullAndEmptyArrays": true } },
            {
                $project: {
                    body: 1,
                    userId: 1,
                    userName: '$from.name',
                    createdAt: 1,
                    reply: {
                        from: '$user.name',
                        text: 1,
                        createdAt: 1
                    }
                }
            }
        ];
        let doc = await Message.aggregate(aggregate);
        if (!doc) {
            callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
        }
        else {
            callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.validationMessages.dataFound, doc))
        }
    }
    catch (err) {
        callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
    }
}

/**
 * Function is use to show all message body to admin
 */
const showMessageAdmin = async (obj, callback) => {
    try {
        const condition = {
            isDeleted: false,
            isActive: true
        };
        const aggregate = [
            {
                $match: condition
            },
            { $sort: { createdAt: -1 } },
            {
                $lookup:
                {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "from"
                }
            },
            { $unwind: '$from' },
            {
                $lookup:
                {
                    from: "users",
                    localField: "reply.from",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: { path: "$user", "preserveNullAndEmptyArrays": true } },
            {
                $project: {
                    body: 1,
                    userId: 1,
                    userName: '$from.name',
                    createdAt: 1,
                    reply: {
                        from: '$user.name',
                        text: 1,
                        createdAt: 1
                    }
                }
            }
        ];
        let doc = await Message.aggregate(aggregate);
        if (!doc) {
            callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
        }
        else {
            callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.validationMessages.dataFound, doc))
        }
    }
    catch (err) {
        callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
    }
}

/**
 * Function is use to delete user message by admin
 */
const deleteMessagebyAdmin = async (obj, callback) => {
    try {
        if (!obj) {
            callback(err, Response(constantsObj.statusCode.BadRequest, "failed", constantsObj.validationMessages.requiredFieldsMissing))
        }
        else {
            let doc = await Message.update({ _id: obj.messageId }, { $set: { isDeleted: true } }, {
                new: true
            });
            if (!doc) {
                callback(err, Response(constantsObj.statusCode.InternalServerError, "failed", err))
            }
            else {
                callback(null, Response(constantsObj.statusCode.OK, "success", constantsObj.validationMessages.messageDeleted))
            }

        }
    } catch (err) {

    }
}

module.exports = Object.assign({
    addMessage,
    addReply,
    deleteMessage,
    showMessage,
    showMessageAdmin,
    deleteMessagebyAdmin
});