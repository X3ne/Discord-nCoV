const Discord = require('discord.js')
const file = require('../infections.json')

module.exports.run = async (client, msg) => {
    let user = msg.author.id

    if(user === 'USER.ID'){
        let data = file.y
        msg.channel.send(data)
    }
}

module.exports.help = {
    name: "json"
}
