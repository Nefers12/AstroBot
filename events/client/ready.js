const dotenv = require('dotenv'); dotenv.config();

module.exports = {
    name: 'ready',
    once : true,
    async execute(client) {
        console.log('Bot opérationnel !');

        const devGuild = await client.guilds.cache.get(process.env.GUILD_ID);
        devGuild.commands.set(client.commands.map(cmd => cmd));

        client.user.setPresence({activities: [{ name: '/help', type: 'PLAYING' }]});
    }
}