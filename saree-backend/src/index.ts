import cors from "cors";
import type { Locale, SareeRecord } from "@hruday23/reusable";
import express, { type ErrorRequestHandler, type Request, type Response } from "express";
import nodemailer from "nodemailer";
import sareesData from "./data/sarees.json";
import enMessages from "./messages/en.json";
import hiMessages from "./messages/hi.json";
import teMessages from "./messages/te.json";

const locales: readonly Locale[] = ["en", "te", "hi"];
const messages = { en: enMessages, te: teMessages, hi: hiMessages };
const contactRecipient = "bharathiprints40@gmail.com";

interface ContactMessage {
  name: string;
  email: string;
  phone: string;
  productId: string;
  message: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readContactField(value: unknown, maxLength: number): string | null {
  if (typeof value !== "string") return null;
  const field = value.trim();
  return field.length <= maxLength ? field : null;
}

function parseContactMessage(value: unknown): ContactMessage | null {
  if (!isRecord(value)) return null;

  const name = readContactField(value.name, 100);
  const email = readContactField(value.email, 254);
  const phone = readContactField(value.phone ?? "", 40);
  const productId = readContactField(value.productId ?? "", 40);
  const message = readContactField(value.message, 5000);

  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    phone === null ||
    productId === null ||
    !message
  ) {
    return null;
  }

  return { name, email, phone, productId, message };
}

function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
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
      contact: "POST /api/contact",
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

app.post("/api/contact", async (request, response, next) => {
  const contactMessage = parseContactMessage(request.body);
  if (!contactMessage) {
    response.status(400).json({
      success: false,
      message: "Please provide a valid name, email address, and message.",
    });
    return;
  }

  const gmailUser = process.env.GMAIL_USER?.trim();
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD?.replace(/\s/g, "");
  if (!gmailUser || !gmailAppPassword) {
    console.error("Contact form email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.");
    response.status(503).json({
      success: false,
      message: "Contact email is not configured.",
    });
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: { name: "Bharathi Prints Contact Form", address: gmailUser },
      to: contactRecipient,
      replyTo: contactMessage.email,
      subject: "New Bharathi Prints website inquiry",
      text: [
        "New message from the Bharathi Prints contact form",
        "",
        `Name: ${contactMessage.name}`,
        `Email: ${contactMessage.email}`,
        `Phone: ${contactMessage.phone || "Not provided"}`,
        `Product ID: ${contactMessage.productId || "Not provided"}`,
        "",
        "Message:",
        contactMessage.message,
      ].join("\n"),
    });
  } catch (error) {
    next(error);
    return;
  }

  response.json({ success: true });
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
