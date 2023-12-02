const { Schema, model } = require("mongoose");

    const permissionsSchema = new Schema({
        roll: {
            roles: [String],
            users: [String],
        },
        rcon: {
            roles: [String],
            users: [String],
        },
        restart: {
            roles: [String],
            users: [String],
        },
        whitelist:{
            roles: [String],
            users: [String],
        },
        rl:{
            roles: [String],
            users: [String],
        },
    });

module.exports = model("Permissions", permissionsSchema);