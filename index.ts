import puppeteer from "puppeteer";
import fullPageScreenshot from "./fullPageScreenshot";

// https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
const iPhone = puppeteer.devices["iPhone 13 Pro Max"];
// const galaxy = puppeteer.devices['Galaxy S9+'];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto(
    "https://n.news.naver.com/mnews/article/016/0001984416?sid=101"
  );

  await fullPageScreenshot(page, { path: "./page.png" });

  await browser.close();
})();
