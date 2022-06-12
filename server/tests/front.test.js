const puppeteer = require("puppeteer");

jest.setTimeout(30000);

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto("http://localhost:8080/");
});

test('Check for "List of Machines" title', async () => {
  try {
    await page.waitForTimeout(1000);
    const text = await page.$eval("caption", (el) => el.innerHTML);
    expect(text).toEqual(" List of Machines ");
  } catch (e) {
    console.error(e);
  };
});

test('Check for "Details" title', async () => {
  try {
    await page.waitForTimeout(1000);
    await page.click("a.button", (el) => el.innerHTML);
    await page.waitForNavigation();
    const text = await page.$eval("h1", (el) => el.innerHTML);
    expect(text).toEqual("Details Page");
  } catch (e) {
    console.error(e);
  };
});

afterEach(async () => {
  await browser.close();
});
