const { MessageEmbed } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
var Rcon = require('rcon');

module.exports = {
    name: 'restart',
    help:'Redémarre le serveur minecraft au bout de 30 secondes',
    description : 'Redémarre le serveur minecraft au bout de 30 secondes',
    runSlash: async (client, interaction) => {
            
            var conn = new Rcon(process.env.SERVER_IP, process.env.RCON_PORT, process.env.RCON_PASS, options);

            //vérifier si l'utilisateur dispose du rôle Mod mc
            const roles = interaction.member.roles.cache.map(r => r.name);
            if(!roles.includes('Mod mc')) return interaction.reply({content :'Tu n\'as pas le droit d\'utiliser cette commande', ephemeral: true});

            interaction.reply({content :'Redémarrage du serveur dans 30 secondes', ephemeral: true});

            //envoyer la commande au serveur
            var options = {
                tcp: true,
                challenge: false
            };

            conn.on('auth', function() {
                console.log("Authenticated");
                conn.send(`say ${interaction.user.username} a redémarré le serveur`);
                conn.send('say Le serveur va redémarrer dans 30 secondes');
                setTimeout(function() {
                    conn.send('say Le serveur va redémarrer dans 5 secondes');
                }, 25000);
                setTimeout(function() {
                    conn.send('say Le serveur va redémarrer dans 4 secondes');
                }, 26000);
                setTimeout(function() {
                    conn.send('say Le serveur va redémarrer dans 3 secondes');
                }, 27000);
                setTimeout(function() {
                    conn.send('say Le serveur va redémarrer dans 2 secondes');
                }, 28000);
                setTimeout(function() {
                    conn.send('say Le serveur va redémarrer dans 1 secondes');
                }, 29000);
                setTimeout(function() {
                    conn.send('say Le serveur redémarre');
                }, 30000);
                setTimeout(function() {
                    conn.send('stop');
                }, 31000);
                setTimeout(function() {
                    conn.disconnect();
                }, 35000);
              }).on('response', function(str) {
                console.log("Response: " + str);
              }).on('error', function(err) {
                console.log("Error: " + err);
                conn.disconnect();
              }).on('end', function() {
                console.log("Connection closed");
              });
              
            conn.connect();
    }
}