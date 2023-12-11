const { ApplicationCommandOptionType } = require('discord.js');
const { Permissions } = require('../../db/index');

module.exports = {
    admin: true,
    name: 'enableperm',
    description : 'Active ou désactive les permissions pour une commande',
    help:'Utilisation : /enableperm <commande> <Bool>',
    options: [{
        name:'commande',
        description : 'Commande pour laquelle définir les permissions',
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name:'enable',
        description : 'Autoriser ou non',
        type: ApplicationCommandOptionType.Boolean,
        required: true
    }],

    runSlash: async (client, interaction) => {

        const perms = await Permissions.findOne({ id: 1 });
        const cmd = interaction.options.getString('commande');
        const enable = interaction.options.getBoolean('enable');

        if(!perms) return interaction.reply({content :'Base de donnée non initialisée', ephemeral: true});

        if(perms.commands[cmd].enable == enable) return interaction.reply({content :'Les permisions pour cette commande sont déjà configurés de cette manière', ephemeral: true});

        perms.commands[cmd].enable = enable;
        await perms.save();
        
        interaction.reply({content :`Permissions ${perms.commands[cmd].enable ? 'activée':'désactivée'} pour la commande ${cmd}`, ephemeral: true});
    }
}