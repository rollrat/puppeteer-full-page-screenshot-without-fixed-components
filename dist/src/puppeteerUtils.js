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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFixedComponents = void 0;
function removeFixedComponents(page) {
    return __awaiter(this, void 0, void 0, function* () {
        page.on("console", (msg) => __awaiter(this, void 0, void 0, function* () {
            const msgArgs = msg.args();
            for (let i = 0; i < msgArgs.length; ++i) {
                console.log(yield msgArgs[i].jsonValue());
            }
        }));
        yield page.evaluate(() => {
            var all = document.getElementsByTagName("*");
            for (var i = 0, max = all.length; i < max; i++) {
                if (all[i] instanceof Element && getComputedStyle(all[i]).position == 'fixed') {
                    all[i].remove();
                }
            }
        });
    });
}
exports.removeFixedComponents = removeFixedComponents;
