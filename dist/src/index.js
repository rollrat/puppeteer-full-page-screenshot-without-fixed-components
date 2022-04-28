"use strict";
// source code from https://github.com/morteza-fsh/puppeteer-full-page-screenshot
// port by rollrat
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const merge_img_1 = __importDefault(require("merge-img"));
const jimp_1 = __importDefault(require("jimp"));
const puppeteerUtils_1 = require("./puppeteerUtils");
const pageDown = (page) => __awaiter(void 0, void 0, void 0, function* () {
    const isEnd = yield page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
        return window.scrollY >= document.documentElement.scrollHeight - window.innerHeight;
    });
    return isEnd;
});
const defaultOptions = {
    fullPage: false,
    captureBeyondViewport: false,
    type: 'png',
    delay: 0,
    path: null,
};
const fullPageScreenshot = (page, options = {}) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagesCount, extraPixels, viewport } = yield page.evaluate(() => {
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
    const _a = Object.assign(Object.assign({}, defaultOptions), options), { path, delay } = _a, pptrScreenshotOptions = __rest(_a, ["path", "delay"]);
    const images = [];
    for (let index = 0; index < pagesCount; index += 1) {
        if (delay) {
            yield page.waitForTimeout(delay);
        }
        yield (0, puppeteerUtils_1.removeFixedComponents)(page);
        const image = yield page.screenshot(pptrScreenshotOptions);
        yield pageDown(page);
        images.push(image);
    }
    if (pagesCount === 1) {
        const image = yield jimp_1.default.read(images[0]);
        if (path)
            image.write(path);
        return image;
    }
    // crop last image extra pixels
    const cropped = yield jimp_1.default.read(images.pop())
        .then((image) => image.crop(0, viewport.height - extraPixels, viewport.width, extraPixels))
        .then((image) => image.getBufferAsync(jimp_1.default.MIME_PNG));
    images.push(cropped);
    const mergedImage = yield (0, merge_img_1.default)(images, { direction: true });
    if (path) {
        yield new Promise((resolve) => {
            mergedImage.write(path, () => {
                resolve();
            });
        });
    }
    return mergedImage;
});
exports.default = fullPageScreenshot;
