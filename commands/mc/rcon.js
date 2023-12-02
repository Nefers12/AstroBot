const { ApplicationCommandOptionType } = require('discord.js');
const dotenv = require('dotenv'); dotenv.config();
var Rcon = require('rcon');

module.exports = {
    name: 'rcon',
    help:'Envoie des commandes au serveur minecraft',
    description : 'Envoie des commandes au serveur minecraft',
    options : [{
        name:'commande',
        description : 'Commande à envoyer au serveur',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    runSlash: async (client, interaction) => {
            
            const cmd = interaction.options.getString('commande');
            var conn = new Rcon(process.env.SERVER_IP, process.env.RCON_PORT, process.env.RCON_PASS, options);

            //vérifier l'id de l'utilisateur
            if(interaction.user.id != '231508535236755456') return interaction.reply({content :'Tu n\'as pas le droit d\'utiliser cette commande', ephemeral: true});

            var options = {
                tcp: true,
                challenge: false
            };

            conn.on('auth', function() {
                console.log("Authenticated");
                conn.send(cmd);
              }).on('response', function(str) {
                console.log("Response: " + str);
                interaction.reply({content :`Commande envoyée : ${cmd}\nRéponse serveur:` + str, ephemeral: true});
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