const Discord = require('discord.js')
const config = require('../config.json')
let prefix = config.prefix;
const db = require('quick.db');
const langfile = require('../lang.json')

module.exports.run = async (client, msg) => {

    const user = msg.author
    
    const lang = db.get(`${user.id}.userinfos.lang`) || 'eng'

    msg.channel.send({
        embed: new Discord.RichEmbed()
            .setTitle(`**Help**`)
            .setDescription(`**${prefix}ncov** => ${langfile[lang].help.ncov}
            \n**${prefix}invite** => ${langfile[lang].help.invite}
            \n**${prefix}symptoms** => ${langfile[lang].help.symptoms}
            \n**${prefix}lang** => ${langfile[lang].help.lang}
            \n**${prefix}lastdata** => ${langfile[lang].help.lastdata}
            \n**${prefix}patchlog** => ${langfile[lang].help.patchlog}
            `)
            .setColor('RANDOM')
            .setTimestamp(new Date())
            .setFooter(`By : _𝙓 𝙀 𝙣 𝙚 🔥🌹 | 🇷🇺 | ${msg.author.username}`)
    })
}

module.exports.help = {
    name: "help"
}