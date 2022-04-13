import bot from "./bot.js";

import {     
    welcomeMessage,
    commandsMessage,
    startPageContentNews,
    newsFunctionHandler,
    lodgingFunctionHandler,
    transportingFunctionHandler,
    donationsFunctionHandler,
    pageFunctionHandler,
 } from "./controllers.js";

bot.start(async (ctx) => { 
    const lastNews = await startPageContentNews();
    ctx.reply(`
    ${welcomeMessage}
    ${commandsMessage}
Последние новости:
The latest news:
${lastNews[0]}\n
${lastNews[1]}
    `);
})

bot.help((ctx) => {
    ctx.reply(commandsMessage);
})

bot.hears(["news", "news".toUpperCase(), "News"], newsFunctionHandler)
bot.command(["news", "news".toUpperCase(), "News"], newsFunctionHandler)

bot.hears(["lodging", "lodging".toUpperCase(), "Lodging"], lodgingFunctionHandler)
bot.command(["lodging", "lodging".toUpperCase(), "Lodging"], lodgingFunctionHandler)


bot.hears(["transporting", "transporting".toUpperCase(), "Transporting"], transportingFunctionHandler)
bot.command(["transporting", "transporting".toUpperCase(), "Transporting"], transportingFunctionHandler)

bot.hears(["donations", "donations".toUpperCase(), "Donations"], donationsFunctionHandler)
bot.command(["donations", "donations".toUpperCase(), "Donations"], donationsFunctionHandler)

bot.hears(["page", "page".toUpperCase(), "Page"], pageFunctionHandler)
bot.command(["page", "page".toUpperCase(), "Page"], pageFunctionHandler)

export default bot