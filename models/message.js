'use strict';

const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  createdAt: {type: Date, default: Date.now },
  userId: { type: String },
  userImage: { type: String },
  userName: { type: String }
});

messageSchema.statics.addUser = function(messageId, userId, cb){
  this.findById(messageId, (err, message)=>{
    if(err || !message) return cb(err || {error: 'Message not found'});

    message.setUser(userId, cb);
  })
}

messageSchema.methods.setUser = function(userId, cb){
  this.user = userId;
  this.save(cb);
}

let Message = mongoose.model('Message', messageSchema);

module.exports = Message;
