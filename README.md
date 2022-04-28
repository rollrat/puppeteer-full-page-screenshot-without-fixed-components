# puppeteer-full-page-screenshot-without-fixed-components

[![npm package](https://img.shields.io/npm/v/puppeteer-full-page-screenshot-without-fixed-components.svg)](https://npmjs.org/package/puppeteer-full-page-screenshot-without-fixed-components)

this source code using https://github.com/morteza-fsh/puppeteer-full-page-screenshot


```js
import puppeteer from "puppeteer";
import fullPageScreenshot from "../src/fullPageScreenshot";

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

  await fullPageScreenshot(page, { path: "./page.png", delay: 100 });

  await browser.close();
})();

```

![](page.png)