import { Page } from "puppeteer";

export async function removeFixedComponents(page: Page): Promise<void> {
  page.on("console", async (msg) => {
    const msgArgs = msg.args();
    for (let i = 0; i < msgArgs.length; ++i) {
      console.log(await msgArgs[i].jsonValue());
    }
  });

  await page.evaluate(() => {
    var all = document.getElementsByTagName("*");
    for (var i = 0, max = all.length; i < max; i++) {
      if (all[i] instanceof Element && getComputedStyle(all[i]).position == 'fixed') {
        all[i].remove();
      }
    }
  });
}
