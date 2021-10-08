const Discord = require('discord.js')
const db = require('quick.db');
const langfile = require('../lang.json')
const superagent = require('superagent')

module.exports.run = async (client, msg) => {

    const user = msg.author
    
    const lang = db.get(`${user.id}.userinfos.lang`)

    let {body} = await superagent

    .get(`https://lab.isaaclin.cn/nCoV/api/overall`)

    let test = require("./df.json")

    Array.from({length: 50}, (x,i) => {
        let state = test[i].provincestate || 'none'
        let province = test[i].countryregion || 'none'
        let lastupdate = test[i].lastupdate || 'none'
        let confirmed = test[i].confirmed || 'none'
        let death = test[i].deaths || 'none'
        let recovered = test[i].recovered || 'none'
        let lat = test[i].location.lat || 'none'
        let lng = test[i].location.lng || 'none'

        let tableau = `${state} ` + `${province} ` + `${lastupdate} ` + `${confirmed} ` + `${death} ` + `${recovered} ` + `${lat} ` + `${lng}`
        console.log(tableau)

        const embed = new Discord.RichEmbed()
            .setDescription(`${tableau}`)
        msg.channel.send(embed)
    })

}

module.exports.help = {
    name: "location"
}