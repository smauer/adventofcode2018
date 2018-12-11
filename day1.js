const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({userDataDir:'E:\\projects\\puppeteer_dev_profile'});
  const page = await browser.newPage();
  //await page.setExtraHTTPHeaders({Referer: 'https://sparktoro.com/'}) 
  await page.goto('https://adventofcode.com/2018/day/1/input');
  const stories = await page.evaluate(() => {
  const links = document.body.textContent;
  return links.split('\n');
  })
    var newTotal = 0;
    stories.forEach(function(element) {
        var tmpInt = parseInt(element);
        if (!isNaN(tmpInt)) {
            newTotal += parseInt(element);
            //console.log(parseInt(element));
        }

    })
    console.log(`Total: ${newTotal}`)
    await browser.close();
    })();