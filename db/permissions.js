const { Schema, model } = require("mongoose");

    const permissionsSchema = new Schema({
        id: Number,
        commands: {
            roll: {
                roles: [String],
                users: [String],
                enable: {type: Boolean, default: false}
            },
            rcon: {
                roles: [String],
                users: [String],
                enable: {type: Boolean, default: true}
            },
            restart: {
                roles: [String],
                users: [String],
                enable: {type: Boolean, default: true}
            },
            whitelist: {
                roles: [String],
                users: [String],
                enable: {type: Boolean, default: true}
            },
            rl: {
                roles: [String],
                users: [String],
                enable: {type: Boolean, default: true}
            },
        }
    });

module.exports = model("Permissions", permissionsSchema);