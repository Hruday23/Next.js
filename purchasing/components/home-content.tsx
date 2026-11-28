import Link from "next/link";
import type en from "../messages/en.json";
import SareeCard, { type SareeCardProduct } from "./saree-card";

type HomeContentProps = {
  about: typeof en.about;
  homePage: typeof en.homePage;
  navLinks: typeof en.header.navLinks;
  locale: "en" | "te" | "hi";
  sarees: SareeCardProduct[];
  shopMessages: typeof en.shop;
};

const uploadsPlaylistId = "UUQ3lv4ul4WmIWIdiY1txrnA";
const channelUrl = "https://www.youtube.com/@bharathiprints";

export default function HomeContent({
  about,
  homePage,
  navLinks,
  locale,
  sarees,
  shopMessages,
}: HomeContentProps) {
  const shopLink = navLinks.find((link) => link.href.endsWith("/shop"));
  const aboutLink = navLinks.find((link) => link.href.endsWith("/about"));

  return (
    <main className="flex-1 overflow-hidden text-[#1F2022]">
      <section className="relative isolate overflow-hidden border-b border-[#D6CEC0] bg-gradient-to-br from-[#FAF8F5] via-[#F5F0E8] to-[#EBE3D5]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12]">
          <svg className="h-full w-full" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid slice">
            <pattern id="block-print-motif" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="44" stroke="#1F2022" strokeWidth="1.3" strokeDasharray="4 4" />
              <path d="M60 22C70 40 80 50 98 60 80 70 70 80 60 98 50 80 40 70 22 60 40 50 50 40 60 22Z" stroke="#8C7A65" strokeWidth="1.3" />
              <circle cx="60" cy="60" r="5" fill="#2D2F33" />
            </pattern>
            <rect width="1200" height="700" fill="url(#block-print-motif)" />
          </svg>
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-24">
          <div className="space-y-7 lg:col-span-7">
            <p className="inline-flex items-center gap-2.5 rounded-full border border-[#D6CEC0] bg-[#FAF8F5]/90 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#6D5E4C] shadow-sm sm:text-xs">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#8C7A65]" />
              Hand-blocked in Telangana · Own dyeing unit
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
              {homePage.title}
              <span className="mt-2 block italic text-[#6D5E4C]">Dyed and hand-blocked to your wish.</span>
            </h1>

            <p className="max-w-2xl text-base leading-7 text-[#5E6064] sm:text-lg sm:leading-8">
              {homePage.description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              {shopLink && (
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#1F2022] bg-[#1F2022] px-6 py-3 text-sm font-bold text-[#FAF8F5] shadow-[0_14px_32px_-8px_rgba(31,32,34,0.26)] transition hover:bg-[#2D2F33]"
                  href={shopLink.href}
                >
                  {homePage.shopCta}
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
              {aboutLink && (
                <Link
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[#D6CEC0] bg-[#FAF8F5] px-6 py-3 text-sm font-bold text-[#1F2022] transition hover:bg-[#EBE3D5]"
                  href={aboutLink.href}
                >
                  {homePage.storyCta}
                </Link>
              )}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-[#D6CEC0] pt-6 sm:grid-cols-4">
              {about.craft.slice(0, 3).map((craft, index) => (
                <div className="space-y-1" key={craft.title}>
                  <p className="font-serif text-lg font-bold sm:text-xl">
                    {String(index + 1).padStart(2, "0")} · {craft.title}
                  </p>
                  <p className="text-xs leading-5 text-[#5E6064]">{homePage.detailOne}</p>
                </div>
              ))}
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold text-[#6D5E4C] sm:text-xl">One of one</p>
                <p className="text-xs leading-5 text-[#5E6064]">{homePage.detailTwo}</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 -rotate-2 rounded-[2rem] border border-[#BFB5A4]" />
            <div className="relative overflow-hidden rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5] p-3 shadow-[0_22px_48px_-16px_rgba(31,32,34,0.18)] sm:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-[#2D2F33] bg-[radial-gradient(circle_at_82%_18%,#2D2F33_0%,#1F2022_52%,#151618_100%)]">
                <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 480 600" fill="none">
                  <defs>
                    <linearGradient id="saree-base" x1="0" y1="0" x2="480" y2="600" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#36383D" />
                      <stop offset=".52" stopColor="#26282C" />
                      <stop offset="1" stopColor="#191A1D" />
                    </linearGradient>
                    <linearGradient id="saree-border" x1="0" y1="0" x2="480" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8C7A65" />
                      <stop offset=".5" stopColor="#C8B9A6" />
                      <stop offset="1" stopColor="#8C7A65" />
                    </linearGradient>
                    <pattern id="saree-buta" width="64" height="64" patternUnits="userSpaceOnUse">
                      <path d="M32 14C38 24 44 28 44 36c0 7-5.5 12-12 12s-12-5-12-12c0-8 6-12 12-22Z" fill="none" stroke="#EBE3D5" strokeOpacity=".48" strokeWidth="1.3" />
                      <circle cx="32" cy="35" r="3" fill="#A89680" fillOpacity=".8" />
                    </pattern>
                  </defs>
                  <rect width="480" height="600" fill="url(#saree-base)" />
                  <path d="M0 0 130 600H0Z" fill="#101113" fillOpacity=".5" />
                  <path d="m160 0 110 600h-80Z" fill="#FAF8F5" fillOpacity=".06" />
                  <path d="m310 0 100 600h-70Z" fill="#101113" fillOpacity=".4" />
                  <rect x="24" y="24" width="432" height="406" fill="url(#saree-buta)" />
                  <rect y="426" width="480" height="174" fill="#D6CEC0" />
                  <path d="M0 431h480M0 585h480" stroke="url(#saree-border)" strokeWidth="10" />
                  <g stroke="#1F2022" strokeWidth="1.6">
                    {[96, 240, 384].map((x) => (
                      <g key={x}>
                        <circle cx={x} cy="510" r="44" />
                        <circle cx={x} cy="510" r="28" strokeDasharray="3 3" />
                        <circle cx={x} cy="510" r="9" fill="#8C7A65" />
                      </g>
                    ))}
                  </g>
                </svg>
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#151618]/70 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-[#FAF8F5] backdrop-blur-sm">
                  Hand-finished · One of one
                </div>
                <div className="absolute bottom-4 right-4 rounded-2xl border border-white/15 bg-[#151618]/75 px-4 py-3 text-right text-[#FAF8F5] backdrop-blur-sm">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#C8B9A6]">
                    {homePage.videoEyebrow}
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold">{homePage.videoTitle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
                <p className="text-xs font-medium uppercase tracking-[0.13em] text-[#5E6064]">
                  Pure weaves · Custom dye vats
                </p>
                <a
                  aria-label={homePage.channelCta}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#D6CEC0] text-[#1F2022] transition hover:bg-[#EBE3D5]"
                  href={channelUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#6D5E4C]">
              {homePage.craftEyebrow} · Telangana
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              {about.craftTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#5E6064] sm:text-lg sm:leading-8">
              {about.craftIntroduction}
            </p>
          </div>
          {shopLink && (
            <Link
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#1F2022] underline decoration-[#8C7A65] underline-offset-4 transition-colors hover:text-[#6D5E4C]"
              href={shopLink.href}
            >
              {homePage.exploreCta}
              <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {about.craft.map((craft, index) => (
            <article
              className="group rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5] p-7 shadow-[0_22px_48px_-30px_rgba(31,32,34,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#8C7A65] sm:p-8"
              key={craft.title}
            >
              <p className="grid h-11 w-11 place-items-center rounded-2xl bg-[#1F2022] font-serif text-xl font-bold text-[#FAF8F5]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-6 font-serif text-2xl font-semibold leading-snug">{craft.title}</h3>
              <p className="mt-4 leading-7 text-[#5E6064]">{craft.description}</p>
              <span
                aria-hidden="true"
                className="mt-7 block h-px w-10 bg-[#8C7A65] transition-all group-hover:w-16"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#D6CEC0] bg-[#EBE3D5]/55">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#6D5E4C]">
                Fresh from our drying racks
              </p>
              <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
                {shopMessages.title}
              </h2>
            </div>
            {shopLink && (
              <Link
                className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-[#1F2022] px-5 py-3 text-sm font-bold text-[#1F2022] transition hover:bg-[#1F2022] hover:text-[#FAF8F5] sm:self-auto"
                href={shopLink.href}
              >
                {homePage.exploreCta} <span aria-hidden="true">↗</span>
              </Link>
            )}
          </div>
          {sarees.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {sarees.slice(0, 4).map((saree) => (
                <SareeCard
                  key={saree.id}
                  product={saree}
                  locale={locale}
                  addToCartLabel={shopMessages.addToCart}
                  addedToCartLabel={shopMessages.addedToCart}
                  buyNowLabel={shopMessages.buyNow}
                />
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-[#D6CEC0] bg-[#FAF8F5]/80 p-6 text-[#5E6064]">
              {shopMessages.empty}
            </p>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[#2D2F33] bg-[radial-gradient(circle_at_82%_18%,#2D2F33_0%,#1F2022_52%,#151618_100%)] text-[#F5F0E8]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-28 -top-36 h-[28rem] w-[28rem] rounded-full border border-[#A89680]/30" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#A89680]">
              {homePage.videoEyebrow} · @bharathiprints
            </p>
            <h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {homePage.videoTitle}
            </h2>
            <p className="mt-4 leading-7 text-[#F5F0E8]/75">
              See the hand-dyeing and block-printing process, from the raw weave to the finished drape.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.7fr_0.8fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-[#A89680]/40 bg-[#151618] p-2 shadow-2xl sm:p-3">
              <iframe
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full rounded-2xl"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsPlaylistId}&rel=0`}
                title={homePage.videoTitle}
              />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A89680]">
                {homePage.closingEyebrow}
              </p>
              <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight">
                {about.philosophyTitle}
              </h3>
              <p className="mt-4 leading-7 text-[#F5F0E8]/75">{about.philosophy}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#F5F0E8] px-5 py-3 text-sm font-bold text-[#1F2022] transition hover:bg-white"
                  href={channelUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {homePage.channelCta} ↗
                </a>
                {shopLink && (
                  <Link
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-[#F5F0E8] transition hover:bg-white/10"
                    href={shopLink.href}
                  >
                    {homePage.shopCta}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
