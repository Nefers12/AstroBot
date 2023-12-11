const { ApplicationCommandOptionType } = require('discord.js');
const { Permissions } = require('../../db/index');

module.exports = {
    admin: true,
    name: 'setperm',
    description : 'Défini les permissions d\'utilisation des commandes',
    help:'Utilisation : /setperm <commande> [role] [user]',
    options: [{
        name:'commande',
        description : 'Commande pour laquelle définir les permissions',
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        name:'role',
        description : 'Role à autoriser',
        type: ApplicationCommandOptionType.Role,
        required: false
    },
    {
        name:'user',
        description : 'Utilisateur à autoriser',
        type: ApplicationCommandOptionType.User,
        required: false
    },
],

    runSlash: async (client, interaction) => {

        const perm = await Permissions.findOne({ id: 1 });
        
        const cmd = interaction.options.getString('commande');
        const role = interaction.options.getRole('role');
        const user = interaction.options.getUser('user');
        let alreadyDefined = false;

        if (client.commands.has(interaction.options.getString('commande'))) {
            if(role){
                if(perm.commands[cmd].roles.includes(role.id))alreadyDefined = true;
                else perm.commands[cmd].roles.push(role.id);
            }if(user){
                if(perm.commands[cmd].users.includes(user.id))alreadyDefined = true;
                else perm.commands[cmd].users.push(user.id);
            }
            if (alreadyDefined) return interaction.reply({content :'Permission déjà définie', ephemeral: true});
        }else{
            return interaction.reply({content :'Commande inconnue', ephemeral: true});
        }

        await perm.save();
        interaction.reply({content :'Permission définie', ephemeral: true});
        
    }
}