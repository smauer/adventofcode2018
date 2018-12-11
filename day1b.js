const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({userDataDir:'E:\\projects\\puppeteer_dev_profile'});
    const page = await browser.newPage();
    await page.goto('https://adventofcode.com/2018/day/1/input');
    const frequencies = await page.evaluate(() => {
        const pageText = document.body.textContent;
        return pageText.split('\n');
    })
    //const frequencies = ["+3", "+3", "+4", "-2", "-4"];
    var loopCount = 0;
    var newTotal = 0;
    var count = 0;
    var freqList = [0];
    var dupeFreq = 0;
    notFound = true;
    while (notFound) {
        frequencies.some(function(element) {
            var tmpInt = parseInt(element);
            if (tmpInt && !isNaN(tmpInt)) {
                count++;                
                newTotal += tmpInt;
                //console.log(`list[${count}]=${newTotal}`);
                if (freqList.includes(newTotal)) {
                    console.log(`included: ${newTotal}`)
                    notFound = false;
                    dupeFreq = newTotal;
                    return true;
                }
                freqList.push(newTotal);
            } else {
                console.log(element);
            }
        })    
        console.log(`loop ${loopCount++}`);
    }
    //console.log(freqList);
    console.log(`Total: ${dupeFreq}`)
    await browser.close();
})();