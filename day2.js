const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({userDataDir:'E:\\projects\\puppeteer_dev_profile'});
    const page = await browser.newPage();
    await page.goto('https://adventofcode.com/2018/day/2/input');
    const boxIds = await page.evaluate(() => {
        const pageText = document.body.textContent;
        return pageText.split('\n');
    })
    
    let countDoubles = 0;
    let countTriples = 0;
    
    boxIds.some(function(boxID) {
        var tmpCounts = freqCounts(boxID);
        var dub = 0;
        var trip = 0;
        Object.keys(tmpCounts).forEach(function(c) {
            if (tmpCounts[c] == 2) {
                dub = 1;
            }
            if (tmpCounts[c] == 3) {
                trip = 1;
            }
        });
        countDoubles += dub;
        countTriples += trip;
    })    
    
    console.log(`Checksum: ${countDoubles * countTriples}`);

    await browser.close();
})();

const freqCounts = (text) => {
    var count = {};
    text.split('').forEach(function(c) {
        count[c] ? count[c]++ : count[c] = 1;
    });
    return count;
}