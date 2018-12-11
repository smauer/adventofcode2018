// https://adventofcode.com/2018/day/1/input

const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://adventofcode.com/2018/day/1/input');

    const stories = await page.evaluate(() => {
        const links = Array.from(document.textContent)
        return links.slice(0, 10)
    })
    console.log(stories);
    await browser.close();
})();