import { HOME_FILTERS } from "../lib/toolCatalog";
import { useI18n } from "../lib/i18n";

const filterMeta = {
  all: { color: "#1d1b22", dot: "#ffffff" },
  workflow: { color: "#ff6f2c", dot: "#ff6f2c" },
  organize: { color: "#2d7ff9", dot: "#2d7ff9" },
  optimize: { color: "#ffb400", dot: "#ffb400" },
  convert: { color: "#f82b60", dot: "#f82b60" },
  edit: { color: "#8b46ff", dot: "#8b46ff" },
  security: { color: "#20c933", dot: "#20c933" },
  intelligence: { color: "#18bfff", dot: "#18bfff" },
};

const floatingTiles = [
  { symbol: "⌁", color: "#ff2b63", className: "left-6 top-16 xl:left-10", style: { "--tile-rot": "-12deg" }, delay: "0s" },
  { symbol: "↗", color: "#2d7ff9", className: "left-0 top-52 xl:left-4", style: { "--tile-rot": "6deg" }, delay: "1.2s" },
  { symbol: "▭", color: "#ffb400", className: "right-6 top-20 xl:right-10", style: { "--tile-rot": "12deg" }, delay: "0.6s" },
  { symbol: "⌂", color: "#20c933", className: "right-0 top-64 xl:right-4", style: { "--tile-rot": "-12deg" }, delay: "1.8s" },
];

function EnglishHeadline() {
  return (
    <h1
      className="mx-auto max-w-5xl text-balance text-[4.1rem] font-normal leading-[0.92] tracking-[-0.06em] text-[#1d1b22] sm:text-[5.4rem] lg:text-[6.6rem] xl:text-[7.3rem]"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span className="block">Every tool you need</span>
      <span className="block">
        to work with{" "}
        <span className="relative inline-block italic text-[#ff2b63]">
          PDFs
          <span className="absolute inset-x-1 -bottom-2 h-[6px] rounded-full bg-[#ffb400]" />
        </span>
      </span>
      <span className="block">in one place</span>
    </h1>
  );
}

function HeroSection({ activeFilter, onFilterChange, toolCount, user }) {
  const { locale, t } = useI18n();

  return (
    <section className="relative overflow-hidden border-b border-[#eadcc0] bg-[var(--app-bg)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.85),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,214,107,0.22),transparent_22%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/70" />

      <div className="relative mx-auto max-w-[1400px] px-4 pb-12 pt-10 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        {/* Floating decorative tiles */}
        {floatingTiles.map((tile) => (
          <div
            key={`${tile.symbol}-${tile.className}`}
            className={`floating-tile absolute hidden h-16 w-16 items-center justify-center rounded-[22px] text-2xl font-black text-white shadow-[0_22px_42px_rgba(31,24,42,0.16)] lg:flex xl:h-20 xl:w-20 xl:text-3xl ${tile.className}`}
            style={{ animationDelay: tile.delay, backgroundColor: tile.color, ...tile.style }}
          >
            {tile.symbol}
          </div>
        ))}

        <div className="mx-auto max-w-5xl text-center">
          {/* Announcement badge */}
          <div className="hero-badge">
            <a
              className="inline-flex items-center gap-3 rounded-full border border-[#deceb2] bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_10px_26px_rgba(31,24,42,0.06)] transition-all duration-250 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(31,24,42,0.1)]"
              href="/ai-summarizer"
            >
              <span className="rounded-full bg-[#8b46ff] px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white">
                New
              </span>
              <span>Chat with PDF – ask any document anything</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {user ? (
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 hero-subline">
              Signed in as {user.name}
            </p>
          ) : null}

          {/* Main headline */}
          <div className="mt-7 hero-headline">
            {locale === "en" ? (
              <EnglishHeadline />
            ) : (
              <h1
                className="mx-auto max-w-5xl text-balance text-5xl font-normal leading-[0.95] tracking-[-0.06em] text-[#1d1b22] sm:text-6xl lg:text-7xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t("home.heroTitle", "Every tool you need to work with PDFs in one place")}
              </h1>
            )}
          </div>

          <p className="hero-subline mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            {t(
              "home.heroDesc",
              "Merge, split, compress, convert, rotate, unlock and watermark in seconds. A polished toolset for students, demos, and complete project presentations.",
            )}
          </p>

          {/* CTA buttons */}
          <div className="hero-cta mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-[#ff2b63] px-7 py-4 text-base font-bold text-white shadow-[0_18px_34px_rgba(248,43,96,0.28)] transition-all duration-250 hover:-translate-y-0.5 hover:bg-[#ef1f57] hover:shadow-[0_22px_40px_rgba(248,43,96,0.35)]"
              href={user ? "/merge-pdf" : "/signup"}
            >
              <span>{user ? "Open workspace" : "Start for free"}</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="inline-flex items-center rounded-full border border-[#deceb2] bg-white px-7 py-4 text-base font-bold text-slate-800 shadow-[0_10px_24px_rgba(31,24,42,0.06)] transition-all duration-250 hover:-translate-y-0.5 hover:border-[#cbb792] hover:shadow-[0_14px_30px_rgba(31,24,42,0.1)]"
              href="/pricing"
            >
              See pricing
            </a>
          </div>
        </div>

        {/* Filter pills */}
        <div className="hero-filters mt-16 overflow-x-auto pb-2">
          <div className="flex min-w-max items-center justify-center gap-3 px-1">
            {HOME_FILTERS.map((filter) => {
              const isActive = filter.key === activeFilter;
              const meta = filterMeta[filter.key] || filterMeta.all;

              return (
                <button
                  key={filter.key}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-[#1d1b22] bg-[#1d1b22] text-white shadow-[0_12px_24px_rgba(29,27,34,0.16)]"
                      : "border-[#deceb2] bg-white text-slate-700 shadow-[0_8px_20px_rgba(31,24,42,0.04)] hover:border-[#cbb792] hover:text-slate-950 hover:-translate-y-px hover:shadow-[0_10px_24px_rgba(31,24,42,0.08)]"
                  }`}
                  onClick={() => onFilterChange(filter.key)}
                  type="button"
                >
                  <span
                    className={`inline-flex h-2.5 w-2.5 rounded-full ${isActive && filter.key === "all" ? "bg-white" : ""}`}
                    style={
                      isActive && filter.key === "all"
                        ? undefined
                        : { backgroundColor: isActive ? "#ffffff" : meta.dot }
                    }
                  />
                  <span>{t(filter.labelPath, filter.fallback)}</span>
                  {filter.key === "all" ? (
                    <span
                      className={`inline-flex min-w-[1.8rem] items-center justify-center rounded-full px-2 py-1 text-[11px] font-black ${
                        isActive ? "bg-white/14 text-white" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {toolCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
