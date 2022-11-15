const fs = require('fs');
const scraperObject = {
    url: 'https://www.cac.bcr.com.ar/es/precios-de-pizarra',
    url2: 'https://www.bna.com.ar/Personas',
    async scraper(browser){
        let page = await browser.newPage();
        let scrapedData = [];
		console.log(`Navigating to ${this.url}...`);
		// Navigate to the selected page
		await page.goto(this.url);
        console.log("Estamos en la pagina")
		// Wait for the required DOM to be rendered
		await page.waitForSelector('.mp-pusher');
        console.log("Se cargo el contenido de la pagina")
        let date= await page.evaluate('document.querySelector("section > div > div > div > h3").textContent.trim().substr(24)'); 
        let trigo= await page.evaluate('document.querySelector(".board-trigo > .board-wrapper .price").textContent.trim()'); 
        let maiz= await page.evaluate('document.querySelector(".board-maiz > .board-wrapper .price").textContent.trim()'); 
        let girasol= await page.evaluate('document.querySelector(".board-girasol > .board-wrapper .price").textContent.trim()'); 
        let soja= await page.evaluate('document.querySelector(".board-soja> .board-wrapper .price").textContent.trim()'); 
        let sorgo= await page.evaluate('document.querySelector(".board-sorgo > .board-wrapper .price").textContent.trim()'); 

        if ((trigo == 'S/C') || (trigo == 's/c')) {
            trigo= await page.evaluate('document.querySelector(".board-trigo > .board-wrapper .price-sc").textContent.trim()'); 
        }
        if ((maiz == 'S/C') || (maiz == 's/c')) {
            maiz= await page.evaluate('document.querySelector(".board-maiz > .board-wrapper .price-sc").textContent.trim()'); 
        }
        if ((girasol == 'S/C') || (girasol == 's/c')) {
            girasol= await page.evaluate('document.querySelector(".board-girasol > .board-wrapper .price-sc").textContent.trim()'); 
        }
        if ((soja== 'S/C') || (soja == 's/c')) {
            soja= await page.evaluate('document.querySelector(".board-soja > .board-wrapper .price-sc").textContent.trim()'); 
        }
        if ((sorgo == 'S/C') || (sorgo == 's/c')) {
            sorgo= await page.evaluate('document.querySelector(".board-sorgo > .board-wrapper .price-sc").textContent.trim()'); 
        }
        scrapedData.push(date);
        scrapedData.push(trigo);
        scrapedData.push(maiz);
        scrapedData.push(girasol);
        scrapedData.push(soja);
        scrapedData.push(sorgo);
		// console.log(date);
		// console.log(trigo);
		// console.log(maiz);
		// console.log(girasol);
		// console.log(soja);
		// console.log(sorgo);

        await page.close();

        let page2 = await browser.newPage();
		console.log(`Navigating to ${this.url2}...`);
		// Navigate to the selected page
		await page2.goto(this.url2);
        console.log("Estamos en la pagina 2")
		// Wait for the required DOM to be rendered
		await page2.waitForSelector('.contenido');
        console.log("Se cargo el contenido de la pagina 2")
        let preciodolar= await page2.evaluate('document.querySelector("#divisas > table > tbody > tr:nth-child(1) > td:nth-child(2)").textContent.trim().slice(0, -2)');
        scrapedData.push(preciodolar);
        await page2.close();

        return scrapedData;
    }
}


module.exports = scraperObject;