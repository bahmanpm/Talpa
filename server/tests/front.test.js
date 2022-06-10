const puppeteer = require("puppeteer");

jest.setTimeout(20000);

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
    console.log(text);
    expect(text).toEqual(" List of Machines ");
  } catch (e) {
    console.error(e);
  } finally {
    console.log("We are done!");
  }
});

test('Check for "Details" title', async () => {
  try {
    await page.waitForTimeout(1000);
    await page.click("a.button", (el) => el.innerHTML);
    await page.waitForNavigation();
    console.log(page.url());
    // await Promise.all([page.waitForNavigation(), console.log(page.url())]);
  } catch (e) {
    console.error(e);
  } finally {
    console.log("We are done!");
  }
});

// afterEach(async () => {
//   await browser.close();
// });
