// source code from https://github.com/morteza-fsh/puppeteer-full-page-screenshot
// port by rollrat

import merge from 'merge-img';
import Jimp from 'jimp';
import { removeFixedComponents } from './puppeteerUtils';

const pageDown = async (page: any) => {
   const isEnd = await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight);
      return window.scrollY >= document.documentElement.scrollHeight - window.innerHeight;
   });

   return isEnd;
};

const defaultOptions = {
   fullPage: false,
   captureBeyondViewport: false,
   type: 'png',
   delay: 0,
   path: null,
};

const fullPageScreenshot = async (page: any, options = {}) => {
   const { pagesCount, extraPixels, viewport } = await page.evaluate(() => {
      window.scrollTo(0, 0);
      const pageHeight = document.documentElement.scrollHeight;
      return {
         pagesCount: Math.ceil(pageHeight / window.innerHeight),
         extraPixels: (pageHeight % window.innerHeight) * window.devicePixelRatio,
         viewport: {
            height: window.innerHeight * window.devicePixelRatio,
            width: window.innerWidth * window.devicePixelRatio,
         },
      };
   });

   const { path, delay, ...pptrScreenshotOptions } = { ...defaultOptions, ...options };

   const images = [];
   for (let index = 0; index < pagesCount; index += 1) {
      if (delay) {
         await page.waitForTimeout(delay);
      }
      await removeFixedComponents(page);
      const image = await page.screenshot(pptrScreenshotOptions);
      await pageDown(page);
      images.push(image);
   }

   if (pagesCount === 1) {
      const image = await Jimp.read(images[0]);
      if (path) image.write(path);
      return image;
   }
   
   // crop last image extra pixels
   const cropped = await Jimp.read(images.pop())
      .then((image) => image.crop(0, viewport.height - extraPixels, viewport.width, extraPixels))
      .then((image) => image.getBufferAsync(Jimp.MIME_PNG));

   images.push(cropped);
   const mergedImage = await merge(images, { direction: true });

   if (path) {
      await new Promise<void>((resolve) => {
         mergedImage.write(path, () => {
            resolve();
         });
      });
   }

   return mergedImage;
};

export default fullPageScreenshot;