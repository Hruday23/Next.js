"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const sarees_json_1 = __importDefault(require("./data/sarees.json"));
const en_json_1 = __importDefault(require("./messages/en.json"));
const hi_json_1 = __importDefault(require("./messages/hi.json"));
const te_json_1 = __importDefault(require("./messages/te.json"));
const locales = ["en", "te", "hi"];
const messages = { en: en_json_1.default, te: te_json_1.default, hi: hi_json_1.default };
function isLocale(value) {
    return locales.includes(value);
}
const app = (0, express_1.default)();
const port = Number(process.env.PORT ?? 5000);
const sarees = sarees_json_1.default;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (request, response) => {
    const locale = resolveLocale(request, response);
    if (!locale)
        return;
    response.json({
        success: true,
        message: getMessages(locale).api.serverRunning,
        endpoints: {
            health: "/api/health",
            sarees: "/api/sarees?lang=en|te|hi",
            sareeById: "/api/sarees/:id?lang=en|te|hi",
            createOrder: "POST /api/orders?lang=en|te|hi",
        },
    });
});
function resolveLocale(request, response) {
    const requestedLocale = request.query.lang;
    if (requestedLocale === undefined) {
        return "en";
    }
    if (typeof requestedLocale === "string" && isLocale(requestedLocale)) {
        return requestedLocale;
    }
    response.status(400).json({
        success: false,
        message: "Unsupported language. Use lang=en, lang=te, or lang=hi.",
        supportedLanguages: locales,
    });
    return null;
}
function localizeSaree(saree, locale) {
    const { translations, ...fields } = saree;
    return { ...fields, ...translations[locale] };
}
function getMessages(locale) {
    return messages[locale];
}
app.get("/api/health", (_request, response) => {
    response.json({ status: "ok" });
});
app.get("/api/sarees", (request, response) => {
    const locale = resolveLocale(request, response);
    if (!locale)
        return;
    const data = sarees.map((saree) => localizeSaree(saree, locale));
    response.json({
        success: true,
        count: data.length,
        data,
    });
});
app.get("/api/sarees/:id", (request, response) => {
    const locale = resolveLocale(request, response);
    if (!locale)
        return;
    const saree = sarees.find((item) => item.id === request.params.id);
    const messages = getMessages(locale);
    if (!saree) {
        response.status(404).json({ success: false, message: messages.api.sareeNotFound });
        return;
    }
    response.json({ success: true, data: localizeSaree(saree, locale) });
});
app.post("/api/orders", (request, response) => {
    const locale = resolveLocale(request, response);
    if (!locale)
        return;
    response.status(201).json({
        success: true,
        message: getMessages(locale).api.orderPlaced,
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
        data: request.body,
    });
});
app.use((request, response) => {
    const locale = resolveLocale(request, response);
    if (!locale)
        return;
    response.status(404).json({
        success: false,
        message: getMessages(locale).api.routeNotFound,
    });
});
const handleError = (error, request, response, _next) => {
    console.error("Request failed:", error);
    const requestedLocale = request.query.lang;
    const locale = typeof requestedLocale === "string" && isLocale(requestedLocale) ? requestedLocale : "en";
    response.status(500).json({
        success: false,
        message: getMessages(locale).api.internalServerError,
    });
};
app.use(handleError);
app.listen(port, () => {
    console.log(`Backend API server running on http://localhost:${port}`);
});
