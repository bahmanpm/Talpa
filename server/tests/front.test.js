const puppeteer = require("puppeteer");

jest.setTimeout(30000);

test("We can launch a browser", async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
  } catch (e) {
    console.error(e);
  } finally {
    console.log("We are done!");
  }
});
