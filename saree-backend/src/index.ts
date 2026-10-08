import cors from "cors";
import express, { type ErrorRequestHandler, type Request, type Response } from "express";
import sareesData from "./data/sarees.json";
import enMessages from "./messages/en.json";
import hiMessages from "./messages/hi.json";
import teMessages from "./messages/te.json";

const locales = ["en", "te", "hi"] as const;
type Locale = (typeof locales)[number];
const messages = { en: enMessages, te: teMessages, hi: hiMessages };

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

interface SareeTranslation {
  name: string;
  category: string;
  description: string;
}

interface SareeRecord {
  id: string;
  price: number;
  image: string;
  translations: Record<Locale, SareeTranslation>;
}

const app = express();
const port = Number(process.env.PORT ?? 5000);
const sarees: SareeRecord[] = sareesData;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  const locale = resolveLocale(request, response);
  if (!locale) return;

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

function resolveLocale(request: Request, response: Response): Locale | null {
  const requestedLocale: unknown = request.query.lang;

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

function localizeSaree(saree: SareeRecord, locale: Locale) {
  const { translations, ...fields } = saree;
  return { ...fields, ...translations[locale] };
}

function getMessages(locale: Locale) {
  return messages[locale];
}

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.get("/api/sarees", (request, response) => {
  const locale = resolveLocale(request, response);
  if (!locale) return;

  const data = sarees.map((saree) => localizeSaree(saree, locale));
  response.json({
    success: true,
    count: data.length,
    data,
  });
});

app.get("/api/sarees/:id", (request, response) => {
  const locale = resolveLocale(request, response);
  if (!locale) return;

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
  if (!locale) return;

  response.status(201).json({
    success: true,
    message: getMessages(locale).api.orderPlaced,
    orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
    data: request.body,
  });
});

app.use((request, response) => {
  const locale = resolveLocale(request, response);
  if (!locale) return;

  response.status(404).json({
    success: false,
    message: getMessages(locale).api.routeNotFound,
  });
});

const handleError: ErrorRequestHandler = (error, request, response, _next) => {
  console.error("Request failed:", error);
  const requestedLocale = request.query.lang;
  const locale =
    typeof requestedLocale === "string" && isLocale(requestedLocale) ? requestedLocale : "en";
  response.status(500).json({
    success: false,
    message: getMessages(locale).api.internalServerError,
  });
};

app.use(handleError);

app.listen(port, () => {
  console.log(`Backend API server running on http://localhost:${port}`);
});
