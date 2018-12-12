const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({userDataDir:'E:\\projects\\puppeteer_dev_profile'});
    const page = await browser.newPage();
    await page.goto('https://adventofcode.com/2018/day/3/input');
    // const claims = await page.evaluate(() => {
    //     const pageText = document.body.textContent;
    //     return pageText.split('\n');
    // })
    
    const claims = ['#1 @ 3,2: 5x4'
                     ,'#2 @ 3,2: 5x4'
                     ,'#3 @ 3,2: 5x4']

    const overlaps = {};

    for (let i = 0; i < claims.length - 1; i++) {
        let [topleft,size] = claims[i].split('@ ')[1].split(': ');
        let [top, left] = topleft.split(',').map(function(val) {return parseInt(val,10)});
        let [width,height] = size.split('x').map(function(val) {return parseInt(val,10)});
        //console.log(`${top} , ${left}`);
        //console.log(`${width} x ${height}`);
        for (let i = top; i < top+height; i++) { 
            for (let j = left; j < left+width; j++) {
                const key = `${j}x${i}`;
                //console.log(key);
                if (overlaps.hasOwnProperty(key)) {
                    //console.log(`found: ${key} - ${overlaps[key]}`)
                    overlaps[key] = overlaps[key] + 1;
                } else {
                    overlaps[key] = 1;
                } 
            }
        }
    }    

    let count = 0;

    //console.log(overlaps);

    Object.keys(overlaps).forEach(function(key) {
        if (overlaps[key] > 1) count++;
    });

    console.log(count);

    await browser.close();
})();