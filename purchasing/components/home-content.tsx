import Link from "next/link";
import type en from "../messages/en.json";

type HomeContentProps = {
  about: typeof en.about;
  homePage: typeof en.homePage;
  navLinks: typeof en.header.navLinks;
};

const uploadsPlaylistId = "UUQ3lv4ul4WmIWIdiY1txrnA";
const channelUrl = "https://www.youtube.com/@bharathiprints";

export default function HomeContent({ about, homePage, navLinks }: HomeContentProps) {
  const shopLink = navLinks.find((link) => link.href.endsWith("/shop"));
  const aboutLink = navLinks.find((link) => link.href.endsWith("/about"));

  return (
    <main className="flex-1 overflow-hidden bg-[#fbf8f4] text-[#342a24]">
      <section className="relative isolate border-b border-[#e9dfd4]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-32 -z-10 h-[34rem] w-[34rem] rounded-full border border-[#e5d6c7] sm:right-[-8rem]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-16 -z-10 h-[27rem] w-[27rem] rounded-full border border-[#eee4da]"
        />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-28">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#9b6848]">
              <span aria-hidden="true" className="h-px w-8 bg-[#cbb19d]" />
              {homePage.eyebrow}
            </p>
            <h1 className="font-serif text-5xl leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              {homePage.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-[#6b5b50] sm:text-lg sm:leading-8">
              {homePage.description}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {shopLink && (
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#46372e] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a4639]"
                  href={shopLink.href}
                >
                  {homePage.shopCta}
                  <span aria-hidden="true" className="ml-2">↗</span>
                </Link>
              )}
              {aboutLink && (
                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#cbb19d] px-6 py-3 text-sm font-semibold text-[#46372e] transition-colors hover:bg-[#f6eee6]"
                  href={aboutLink.href}
                >
                  {homePage.storyCta}
                </Link>
              )}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.12em] text-[#817166]">
              <span>{homePage.detailOne}</span>
              <span aria-hidden="true" className="text-[#cbb19d]">✳</span>
              <span>{homePage.detailTwo}</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div
              aria-hidden="true"
              className="absolute -inset-3 -rotate-2 rounded-[2rem] border border-[#e5d6c7]"
            />
            <div className="relative overflow-hidden rounded-3xl border border-[#e9dfd4] bg-[#46372e] p-2 shadow-[0_30px_80px_-40px_rgba(52,42,36,0.55)] sm:p-3">
              <div className="overflow-hidden rounded-2xl bg-[#342a24]">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=${uploadsPlaylistId}&rel=0`}
                  title={homePage.videoTitle}
                />
              </div>
              <div className="flex items-center justify-between gap-4 px-3 py-4 sm:px-4">
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#d9b79e]">
                    {homePage.videoEyebrow}
                  </p>
                  <p className="mt-1 font-serif text-lg text-[#fffdfa]">{homePage.videoTitle}</p>
                </div>
                <a
                  aria-label={homePage.channelCta}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#8f7664] text-[#fffdfa] transition-colors hover:bg-[#5a4639]"
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

      <section className="mx-auto w-full max-w-7xl px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#9b6848]">
              {homePage.craftEyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {about.craftTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#6b5b50] sm:text-lg sm:leading-8">
              {about.craftIntroduction}
            </p>
          </div>
          {shopLink && (
            <Link
              className="mb-1 inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#9b6848] underline decoration-[#cbb19d] underline-offset-4 transition-colors hover:text-[#46372e]"
              href={shopLink.href}
            >
              {homePage.exploreCta}
              <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {about.craft.map((craft, index) => (
            <article
              className="group rounded-2xl border border-[#e9dfd4] bg-white/70 p-7 transition-colors hover:bg-[#fffdfa] sm:p-8"
              key={craft.title}
            >
              <p className="text-sm font-medium tracking-[0.16em] text-[#a8795b]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-7 font-serif text-2xl leading-snug">{craft.title}</h3>
              <p className="mt-4 leading-7 text-[#6b5b50]">{craft.description}</p>
              <span
                aria-hidden="true"
                className="mt-7 block h-px w-10 bg-[#cbb19d] transition-all group-hover:w-16"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#46372e] text-[#fbf8f4]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 -top-36 h-[28rem] w-[28rem] rounded-full border border-[#8f7664]/50"
        />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-16 sm:py-20 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#d9b79e]">
              {homePage.closingEyebrow}
            </p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {about.philosophyTitle}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#eee3d9] sm:text-lg sm:leading-8">
              {about.philosophy}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#fbf8f4] px-6 py-3 text-sm font-semibold text-[#46372e] transition-colors hover:bg-[#eee3d9]"
              href={channelUrl}
              rel="noreferrer"
              target="_blank"
            >
              {homePage.channelCta}
              <span aria-hidden="true" className="ml-2">↗</span>
            </a>
            {shopLink && (
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#8f7664] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a4639]"
                href={shopLink.href}
              >
                {homePage.shopCta}
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
