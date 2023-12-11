const { Permissions } = require('../../db/index');

module.exports = {
    admin: true,
    name: 'dbsetup',
    description : 'Initialise la base de données',
    help:'Cette commande ne nécessite pas de paramètres',

    runSlash: async (client, interaction) => {

        const perms = await Permissions.findOne({ id: 1 });

        if(perms) return interaction.reply({content :'La base de donnée est déjà initialisée', ephemeral: true});

        const permissionsCreate = await new Permissions({
            id: 1
        });

        await permissionsCreate.save();
        
        interaction.reply({content :'Base de donnée initialisée', ephemeral: true});
    }
}