"use client";

import { useState, type FormEvent } from "react";
import type en from "../messages/en.json";

type ContactMessages = typeof en.contact;

export default function ContactForm({
  apiUrl,
  messages,
}: {
  apiUrl: string;
  messages: ContactMessages;
}) {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    const form = event.currentTarget;
    const configuredApiUrl = apiUrl.replace(/\/$/, "");
    if (!configuredApiUrl) {
      setStatus("error");
      return;
    }

    setIsSending(true);
    try {
      const response = await fetch(`${configuredApiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });

      const result: { success?: boolean } = await response.json();
      if (!response.ok || !result.success) {
        throw new Error("Contact request failed");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  }

  const inputClassName =
    "mt-2 w-full rounded-xl border border-[#D6CEC0] bg-[#FAF8F5] px-4 py-3 text-[#1F2022] outline-none transition focus:border-[#8C7A65] focus:ring-2 focus:ring-[#8C7A65]/20";

  return (
    <section
      aria-labelledby="contact-form-title"
      className="h-fit rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5] p-6 shadow-[0_22px_48px_-30px_rgba(31,32,34,0.2)] sm:p-8"
    >
      <h2 id="contact-form-title" className="font-serif text-3xl">
        {messages.formTitle}
      </h2>
      <p className="mt-3 leading-7 text-[#5E6064]">{messages.formDescription}</p>

      <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#1F2022]">
            {messages.nameLabel}
            <input
              autoComplete="name"
              className={inputClassName}
              maxLength={100}
              name="name"
              placeholder={messages.namePlaceholder}
              required
            />
          </label>
          <label className="block text-sm font-medium text-[#1F2022]">
            {messages.emailLabel}
            <input
              autoComplete="email"
              className={inputClassName}
              maxLength={254}
              name="email"
              placeholder={messages.emailPlaceholder}
              required
              type="email"
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-medium text-[#1F2022]">
            {messages.phoneLabel}
            <input
              autoComplete="tel"
              className={inputClassName}
              maxLength={40}
              name="phone"
              placeholder={messages.phonePlaceholder}
              type="tel"
            />
          </label>
          <label className="block text-sm font-medium text-[#1F2022]">
            {messages.productIdLabel}
            <input
              className={inputClassName}
              maxLength={40}
              name="productId"
              placeholder={messages.productIdPlaceholder}
            />
          </label>
        </div>

        <label className="block text-sm font-medium text-[#1F2022]">
          {messages.messageLabel}
          <textarea
            className={`${inputClassName} min-h-36 resize-y`}
            maxLength={5000}
            name="message"
            placeholder={messages.messagePlaceholder}
            required
            rows={5}
          />
        </label>

        {status !== "idle" && (
          <p
            className={`text-sm leading-6 ${status === "success" ? "text-emerald-800" : "text-red-700"}`}
            role={status === "success" ? "status" : "alert"}
          >
            {status === "success" ? messages.successMessage : messages.errorMessage}
          </p>
        )}

        <button
          className="w-full rounded-full bg-[#1F2022] px-6 py-3.5 text-sm font-semibold text-[#F5F0E8] transition hover:bg-[#2D2F33] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          disabled={isSending}
          type="submit"
        >
          {isSending ? messages.sendingLabel : messages.submitLabel}
        </button>
      </form>
    </section>
  );
}
