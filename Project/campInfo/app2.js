const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // A COLLER: 'XPath' ou 'full XPath'
    const [el] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[1]');
    const txt = await el.getProperty("textContent");
    const nom = await txt.jsonValue();

    const [el2] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[2]');
    const txt2 = await el2.getProperty("textContent");
    const ville = await txt2.jsonValue();

    const [el3] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[3]');
    const txt3 = await el3.getProperty("textContent");
    const region = await txt3.jsonValue();

    const [el4] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[7]/a');
    const txt4 = await el4.getProperty("textContent");
    const email = await txt4.jsonValue();

    const [el5] = await page.$x('//*[@id="campsite-address"]/div[1]/div[1]/p[8]/a');
    const txt5 = await el5.getProperty("textContent");
    const telephone = await txt5.jsonValue();

    const [el6] = await page.$x('//*[@id="campsite-address"]/div[1]/div[2]/div/p[1]');
    const txt6 = await el6.getProperty("textContent");
    var latitude = await txt6.jsonValue();

    const [el7] = await page.$x('//*[@id="campsite-address"]/div[1]/div[2]/div/p[2]');
    const txt7 = await el7.getProperty("textContent");
    var longitude = await txt7.jsonValue();

    var indexParentheseOuvrante = latitude.indexOf('(');
    var indexParentheseFermante = latitude.indexOf(')');

    latitude = latitude.substring(indexParentheseOuvrante + 1, indexParentheseFermante);

    indexParentheseOuvrante = longitude.indexOf('(');
    indexParentheseFermante = longitude.indexOf(')');

    longitude = longitude.substring(indexParentheseOuvrante + 1, indexParentheseFermante);

    console.log(JSON.stringify({nom, ville, region, email, telephone, latitude, longitude}), ",");
    
    browser.close();

}

const urls = ["https://www.pincamp.ch/fr/campings/alp-safari-camping-glamping","https://www.pincamp.ch/fr/campings/alpencamping","https://www.pincamp.ch/fr/campings/camping-au-grand-bois","https://www.pincamp.ch/fr/campings/bauernhof-camping-wyler"];

// console.log(process.argv[2]);
for (let url0 of urls) {
    scrapeProduct(url0);
}


// A COLLER: url source
// scrapeProduct('https://www.pincamp.ch/fr/campings/thermal-camping-brigerbad');

/* DOC
await: permet d'attendre que la fonction s'éxecute.
$x: sélecteur puppeteer pour le 'xpath'.
*/