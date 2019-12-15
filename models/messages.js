(function () {
    'use strict';
}());
const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'users',
        required: true
    },
    reply: [{
        from: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        text: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;  