import puppeteer from "puppeteer";
import dotenv from "dotenv";
dotenv.config();

let url = process.env.URL;

const welcomeMessage = `
Добро пожаловать, мы рады, что у вас все хорошо!
Welcome, we"re glad you"re doing well!
`;

const commandsMessage = `
/help Вся полезная информация и команды
/help All the useful information and commands

/lodging Ссылка на размещение на странице
/lodging Link to the accommodations on the page

/page Информация о странице
/page Information about the page

/news Последние новости
/news The lastest news

/transporting Ссылка на перевозки на странице
/transporting Link to the transportings on the page

/donations Ссылка на донаты на странице
/donations Link to the donates on the page

Refugees site: ${url}

Мы хотим помочь, распространяйте сообщение
We want to help, spread the message
`;

async function startPageContentNews() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      })
    const page = await browser.newPage();
    await page.setDefaultTimeout(120000);
    await page.goto(url + "whats-new/");
    await page.waitForSelector(".block-body");
    await page.screenshot({ path: 'example.png' });

    let urls = await page.$$eval("div div.structItem-title", links => {
        links = links.map(el => el.querySelector("a").href)
        return links;
    });
    let lastTwoNews = urls.slice(0, 2);

    await browser.close();
    return lastTwoNews;
}

async function newsPageContentNews() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox','--disable-setuid-sandbox']
      })
    const page = await browser.newPage();
    await page.setDefaultTimeout(120000);
    await page.goto(url + "whats-new/");
    await page.waitForSelector(".block-body");

    let urls = await page.$$eval("div div.structItem-title", links => {
        let linksContent = links.map(el => el.querySelector("a").textContent);
        links = links.map(el => el.querySelector("a").href);
        return [links, linksContent];
    });
    let news = urls;
    news[0] = news[0].slice(0, 3);

    await browser.close();
    return news;
}

const newsFunctionHandler = async (ctx) => {
    const lastestNews = await newsPageContentNews();
    const links = lastestNews[0];
    const contents = lastestNews[1];

    ctx.reply(`
    Вы можете увидеть последние новости на странице.
You can see what the latest news is on the page.

News Refugees site: ${url}/whats-new/

${contents[0]}:
${links[0]}.

${contents[1]}:
${links[1]}

    `);
}

const lodgingFunctionHandler = (ctx) => {
    ctx.reply(`
    Вы можете проверить наличие дешевых и бесплатных мест для проживания, а также предложить место для проживания.
You can check for cheap and free places to stay, and you can offer a place to stay too.

Refugees site: ${url}
    `);
}

const transportingFunctionHandler = (ctx) => {
    ctx.reply(`
    Если у вас есть автомобиль или вы ищете его, вы можете зайти на страницу.
If you have a vehicle or you are looking for one you can come to the page.

Refugees site: ${url}
    `);
}

const donationsFunctionHandler = (ctx) => {
    ctx.reply(`
    Если вы хотите пожертвовать едой, лекарствами, одеждой, пожалуйста, заходите на страницу.
If you want to donate with food, medicine, clothes, please come to the page.

Refugees site: ${url}
    `);
}

const pageFunctionHandler = (ctx) => {
    ctx.reply(`
    Страница беженцев предназначена для того, чтобы держать нас вместе и информировать. Об этом будет сообщаться на странице о размещении, пожертвованиях, транспорте и новостях. Идея состоит в том, чтобы иметь возможность держать нас в курсе, чтобы быть в безопасности.
The refugee page is designed to keep us united and informed. It will be communicated through the page about accommodation, donations, transportation and news. The idea is to be able to keep us informed in order to be safe.

Refugees site: ${url}
News Refugees site: ${url}
    `);
}

export {
    welcomeMessage,
    commandsMessage,
    startPageContentNews,
    newsFunctionHandler,
    lodgingFunctionHandler,
    transportingFunctionHandler,
    donationsFunctionHandler,
    pageFunctionHandler,
}