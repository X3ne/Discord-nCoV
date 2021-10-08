const Discord = require('discord.js');
const client = new Discord.Client();
const superagent = require('superagent');
const config = require('./config.json')
let prefix = config.prefix;
//let prefix = process.env.PREFIX;
const fs = require('fs')
const infections = require('./infections.json')
const dateTime = require('date-time');
const request = require('request')
const cheerio = require('cheerio')

client.commands = new Discord.Collection();

//Update + Start
client.on('ready', async() => {
    console.log(`Logged in as ${client.user.tag}!`);

        async function updata () {

            let {body} = await superagent

            .get(`https://lab.isaaclin.cn/nCoV/api/overall`)

            let date = dateTime({showTimeZone: true});

            console.log(`${date} Data updated`)

            client.user.setActivity(`☣️ ${body.results[0].confirmedCount} Confirmed cases Last update: ${date}  (More ? => ${prefix}ncov) ${client.guilds.size} Servers : ${prefix}invite`, { type: 'WATCHING' });
        
            request('https://bnonews.com/index.php/2020/02/the-latest-coronavirus-cases/', (error, 
            response, html) => {
                if (!error && response.statusCode == 200){
                    const $ = cheerio.load(html);
                
                    const data = [];
                    $('h2:contains("Timeline (GMT)")')
                        .nextUntil('h3')
                        .each((idx, el) => {
                            if (el.name === 'h4') {
                                const obj = {
                                    date: $(el)
                                        .text()
                                        .trim(),
                                        time: $(el)
                                            .next()
                                            .children('li')
                                            .toArray()
                                            .map(li => ({
                                             time_and_description: $(li)
                                                .text()
                                                .trim()
                                                .replace(' (Source)', ''),
                                            }))
                                };
                            data.push(obj)
                                
                                fs.writeFile ("scrappeddata.json", JSON.stringify({"data": data}), function(err) {
                                    if (err) throw err;
                                    console.log(`${date} scrapped data updated`);
                                });
                            }})
                }
            })
        }
        updata();
        setInterval(updata, 720000);
});

//720000

//Graph
client.on('ready', async() => {

    let {body} = await superagent

    .get(`https://lab.isaaclin.cn/nCoV/api/overall`)

    let date = dateTime({showTimeZone: true});

    const file = infections
    let datainfection = file.y
    let datadate = file.x

    function datainfect () {

        datainfection.push(`${body.results[0].confirmedCount}`)

        fs.writeFile ("infections.json", JSON.stringify({
            "y": datainfection,
            "x": datadate

        }), function(err) {
            if (err) throw err;
            console.log(`${date} Infections update`);
        })

        const plotly = require('plotly')('X3ne', 'IWq8pnCOJaYmI8FrogAp')

        var trace1 = {
            y: datainfection,
            x: datadate,
            type: "scatter",
            marker: {
                color: "rgba(5, 168, 163, 0.96)"
            },
            line: {
                color:"rgba(5, 168, 163, 0.31)"
            },
        };
        
        var figure = { 
            'data': [trace1] 
            };
        
        var imgOpts = {
            format: 'png',
            width: 1000,
            height: 500,
        }
        
        plotly.getImage(figure, imgOpts, function (error, imageStream) {
            if (error) return console.log (error);
        
            var fileStream = fs.createWriteStream('graph.png');
            imageStream.pipe(fileStream);

            console.log(`${date} Graph created`)
        });

        //Finish
        console.log(`
        ╔═════════════════════════════════╗
        ║-->  Bot Name : ${client.user.username}
        ╟─────────────────────────────────╢
        ║-->  Prefix   : ${prefix} 
        ╟─────────────────────────────────╢
        ║-->  Users    : ${client.users.filter(user => !user.client).size}
        ╟─────────────────────────────────╢
        ║-->  Bots     : ${client.users.filter(user => user.client).size}
        ╟─────────────────────────────────╢
        ║-->  Channels : ${client.channels.size}
        ╟─────────────────────────────────╢
        ║-->  Guilds   : ${client.guilds.size}
        ╚═════════════════════════════════╝
        Prêt !`);
    }
    datainfect();
    setInterval(datainfect, 86400000)
})

//86400000

//Commands loader
fs.readdir("./commands", (err, file) => {
    if(err) console.log(err)

    let jsfile = file.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Impossible de trouver la commande !")
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded !`)
        client.commands.set(props.help.name, props);
    })
})

client.on("message", async msg => {
    let args = msg.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    let command;

    if (!msg.content.startsWith(prefix)) return

    command = client.commands.get(client.aliases.get(cmd));

    if (command) command.run(client, msg, args, prefix);
})

client.login(config.token);
//client.login(process.env.TOKEN);