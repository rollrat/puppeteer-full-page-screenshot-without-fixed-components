"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const fullPageScreenshot_1 = __importDefault(require("../src/fullPageScreenshot"));
// https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
const iPhone = puppeteer_1.default.devices["iPhone 13 Pro Max"];
// const galaxy = puppeteer.devices['Galaxy S9+'];
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.emulate(iPhone);
    yield page.goto("https://n.news.naver.com/mnews/article/016/0001984416?sid=101");
    yield (0, fullPageScreenshot_1.default)(page, { path: "./page.png", delay: 100 });
    yield browser.close();
}))();
