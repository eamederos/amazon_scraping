const puppeteer = require('puppeteer');

(async ()=> {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://www.amazon.es/');
    await page.type('#twotabsearchtextbox', 'libros de javascript');
    await page.click('.nav-search-submit input');
    await page.waitForSelector('[data-component-type=s-search-result]');
    await page.waitForTimeout(3000);

    const search_links = await page.evaluate(() => {
        const elements = document.querySelectorAll('[data-component-type=s-search-result] h2 a');
        const links = []
        for(let element of elements){
            links.push(element.href);
        }
        return links;
    });
    for (let link of search_links){
        await page.goto(link);
        // await page.waitForTimeout(2000);
    } 
    
    // await page.screenshot({path: 'amazon2.jpg'});
    await browser.close();
    //await p
})();


