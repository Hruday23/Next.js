"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locales = void 0;
exports.isLocale = isLocale;
exports.getMessages = getMessages;
const en_json_1 = __importDefault(require("./en.json"));
const hi_json_1 = __importDefault(require("./hi.json"));
const te_json_1 = __importDefault(require("./te.json"));
exports.locales = ["en", "te", "hi"];
const messages = { en: en_json_1.default, te: te_json_1.default, hi: hi_json_1.default };
function isLocale(value) {
    return exports.locales.includes(value);
}
function getMessages(locale) {
    return messages[locale];
}
