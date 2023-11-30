module.exports = {
    name: 'rl',
    description : 'Redemarre le bot',
    help:'Cette commande redémarre le bot',

    runSlash: async (client, interaction) => {
        interaction.reply({content :'Bot redémarré', ephemeral: true}).then(() => {

            if(interaction.user.id != '231508535236755456') return interaction.reply({content :'Tu n\'as pas le droit d\'utiliser cette commande', ephemeral: true});
            
            return process.exit();
        });
    }
}