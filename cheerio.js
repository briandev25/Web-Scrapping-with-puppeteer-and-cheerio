//Using cheerio

const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const url = "https://quotes.toscrape.com/";
const quotations = [];
axios
  .get(url)
  .then((res) => {
    console.log(res.status);
    const $ = cheerio.load(res.data);
    //Map throgh each element
    $(".quote").each((i, quote) => {
      const title = $(quote).find(".text").text();
      const author = $(quote).find(".author").text();
      quotations.push({ quote: title, author });
    });
    fs.writeFile("quote.json", JSON.stringify(quotations), (err) => {
      if (err) throw err;
      console.log("File successfully saved");
    });
  })
  .catch((err) => {
    console.log(err.status);
  })
  .finally(() => {
    console.log(quotations);
  });
