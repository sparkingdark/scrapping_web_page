const { Scraper, Root, OpenLinks, CollectContent } = require('nodejs-web-scraper');
const fs = require('fs');

(async () => {



    const config = {
        baseSiteUrl: `https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020`,
        startUrl: `https://prefeitura.pbh.gov.br/saude/licitacao/pregao-eletronico-151-2020`,
        logPath: './logs/'
    }

    const scraper = new Scraper(config);
    const root = new Root({ pagination: { queryString: 'page_num', begin: 1, end: 10 } });//Open pages 1-10.
    // YOU NEED TO SUPPLY THE QUERYSTRING that the site uses(more details in the API docs). "page_num" is just the string used on this example site.

    const bid_links = new OpenLinks('.item_eg>a, .menu-pbh .menu-item>a, .menu-pbh .field-content>a', {name: 'bid-links'});

    const pub_dates = new CollectContent('.col-sm-6.lbl-licitacao', { name: 'dates' })//Important to choose a name, for the getPageObject to produce the expected results.


    root.addOperation(pub_dates)
    root.addOperation(bid_links)

     await scraper.scrape(root);
     
     
 })()

 