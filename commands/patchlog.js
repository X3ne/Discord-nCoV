const Discord = require('discord.js')
const db = require('quick.db');
const langfile = require('../lang.json')

module.exports.run = async (client, msg) => {
    const user = msg.author
    
    const lang = db.get(`${user.id}.userinfos.lang`) || 'eng'

    msg.channel.send({
        embed: new Discord.RichEmbed()
            .setTitle(`**__Patchlog__**`)
            .setDescription(`**30/01/2020** => ${langfile[lang].patchlog.graph}
            \n**01/02/2020** => ${langfile[lang].patchlog.api}
            \n**09/02/2020** => ${langfile[lang].patchlog.lastdata}`)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`By : _𝙓 𝙀 𝙣 𝙚 🔥🌹 | 🇷🇺`)
    })
}

module.exports.help = {
    name: "patchlog"
}