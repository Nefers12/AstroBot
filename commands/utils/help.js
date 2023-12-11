const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'help',
    help:'Tu semble avoir compris comment ça marche :upside_down:',
    description : 'Commande d\'aide',
    options : [{
        name:'commande',
        description : 'Commande à afficher',
        type: ApplicationCommandOptionType.String,
    }],
    runSlash: async (client, interaction) => {
            
            const commande = interaction.options.getString('commande');
            const cmd = client.commands.map(c => `\`${c.name}\``).join('\n');

            if(!commande) {
                const helpEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({name: `Un peu d'aide pour ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
                .setTitle(`voici la liste des commandes disponibles :`)
                .setTimestamp()
                .setDescription(cmd);	
    
                interaction.reply({embeds: [helpEmbed], ephemeral: true});
            }else{
                const helpEmbed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({name: `Aide pour la commande ${commande}`, iconURL: interaction.user.displayAvatarURL()})
                .setDescription(`${client.commands.get(commande).description}\n${client.commands.get(commande).help}`)
                .setTimestamp()
    
                interaction.reply({embeds: [helpEmbed], ephemeral: true});

            }
    }
}