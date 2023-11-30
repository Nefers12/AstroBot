const { Schema, model } = require("mongoose");

    const userSchema = new Schema({
        userId: String,
        userName: String,
        joinDate: Date,
        messagesCount: Number,
        userAvatar: String,
    });

module.exports = model("User", userSchema);