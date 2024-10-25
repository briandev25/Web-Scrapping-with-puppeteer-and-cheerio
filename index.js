const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  const quotes = await page.evaluate(() => {
    const quoteElements = document.querySelectorAll(".quote");
    const quotesList = [];

    for (const element of quoteElements) {
      const quoteText = element.querySelector(".text").innerHTML;
      const quoteAuthor = element.querySelector(".author").innerHTML;

      const tagElements = element.querySelectorAll(".tags .tag");
      const tags = [];
      for (const el of tagElements) {
        const label = el.innerHTML;
        tags.push(label);
      }
      quotesList.push({ quote: quoteText, author: quoteAuthor, tags: tags });
    }
    return quotesList;
  });

  console.log(quotes);
  await browser.close();
})();
