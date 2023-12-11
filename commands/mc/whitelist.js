const { ApplicationCommandOptionType } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
var Rcon = require('rcon');

module.exports = {
    name: 'whitelist',
    help:'Utilisation : /whitelist <pseudo>',
    description : 'Envoie des commandes au serveur minecraft',
    options : [{
        name:'pseudo',
        description : 'Commande à envoyer au serveur',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    runSlash: async (client, interaction) => {
            
            const cmd = interaction.options.getString('pseudo');
            var conn = new Rcon(process.env.SERVER_IP, process.env.RCON_PORT, process.env.RCON_PASS, options);

            //vérifier si l'utilisateur dispose du rôle Mod mc
            const roles = interaction.member.roles.cache.map(r => r.name);
            if(!roles.includes('Mod mc')) return interaction.reply({content :'Tu n\'as pas le droit d\'utiliser cette commande', ephemeral: true});

            //envoyer la commande au serveur
            var options = {
                tcp: true,
                challenge: false
            };

            conn.on('auth', function() {
                console.log("Authenticated");
                conn.send(`whitelist add ${cmd}`);
              }).on('response', function(str) {
                console.log("Response: " + str);
                interaction.reply({content :`Demande de whitelist pour ${cmd} Réponse serveur:` + str, ephemeral: true});
                conn.disconnect();
              }).on('error', function(err) {
                console.log("Error: " + err);
                conn.disconnect();
              }).on('end', function() {
                console.log("Connection closed");
              });
              
            conn.connect();
    }
}