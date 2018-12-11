const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({userDataDir:'E:\\projects\\puppeteer_dev_profile'});
    const page = await browser.newPage();
    await page.goto('https://adventofcode.com/2018/day/2/input');
    const boxIds = await page.evaluate(() => {
        const pageText = document.body.textContent;
        return pageText.split('\n');
    })
    
    // const boxIds = [    'abcde',
    //                     'fghij',
    //                     'klmno',
    //                     'pqrst',
    //                     'fguij',
    //                     'axcye',
    //                     'wvxyz']

    for (var i = 0; i < boxIds.length; i++) {
        let result = checkDiff(boxIds, i);
        if (result[0] > -1) {
            console.log(result[2]);
            return true;
        }
    }    
    
    await browser.close();
})();

const checkDiff = (ary, idx) => {
    var s1 = ary[idx];
    var s2 = ary[(ary.length - 1) - idx];
    for (var j = idx + 1; j < ary.length; j++) {
        // console.log(`check ${idx}: ${ary[j]} ? ${s1}`);
        // console.log(`check2 ${idx}: ${ary[(ary.length - 1) - j]} ? ${s2}`);
        let check1 = offByOne(ary[j], s1);
        let check2 = offByOne(ary[(ary.length - 1) - j], s2);
        if (check1[0]) {
            return [idx, j, s1.substring(0,check1[1]) + s1.substring(check1[1]+1, s1.length)];
        } else if (check2[0]) {
            return [(ary.length - 1) - idx, (ary.length - 1) - j, s2.substring(0,check2[1]) + s2.substring(check2[1]+1, s2.length)];
        } 
    }
    return [-1,-1,''];
}

const offByOne = (s1, s2) => {
    var diffCount = 0;
    var diffIdx = -1;
    for (var i = 0; i < s1.length; i++) {
        if (s1[i] == s2[i]) {

        } else {
            diffCount++;
            diffIdx = i;
        }
    }
    return [diffCount == 1, diffIdx];
}