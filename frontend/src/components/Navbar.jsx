import { useState } from "react";

import { toolBySlug } from "../lib/toolCatalog";
import { useI18n } from "../lib/i18n";

const allToolsColumns = [
  {
    title: "Organize PDF",
    items: ["merge-pdf", "split-pdf", "organize-pdf", "scan-to-pdf"],
  },
  {
    title: "Optimize PDF",
    items: ["compress-pdf", "repair-pdf", "ocr-pdf"],
  },
  {
    title: "Convert to PDF",
    items: ["jpg-to-pdf", "word-to-pdf", "powerpoint-to-pdf", "excel-to-pdf", "html-to-pdf"],
  },
  {
    title: "Convert from PDF",
    items: ["pdf-to-jpg", "pdf-to-word", "pdf-to-powerpoint", "pdf-to-excel", "pdf-to-pdfa"],
  },
  {
    title: "Edit PDF",
    items: ["rotate-pdf", "page-numbers", "watermark", "crop-pdf", "edit-pdf"],
  },
  {
    title: "PDF Security",
    items: ["unlock-pdf", "protect-pdf", "sign-pdf", "redact-pdf", "compare-pdf"],
  },
  {
    title: "PDF Intelligence",
    items: ["ai-summarizer", "translate-pdf"],
  },
];

const rightMenu = {
  otherProducts: [
    { name: "iLoveIMG", description: "Effortless image editing", accent: "bg-slate-100 text-slate-700" },
    { name: "iLoveSign", description: "e-Signing made simple", accent: "bg-slate-100 text-slate-700" },
    { name: "iLoveAPI", description: "Document automation for developers", accent: "bg-slate-100 text-slate-700" },
  ],
  solutions: [
    { name: "Business", description: "PDF editing and workflows for teams", accent: "bg-slate-100 text-slate-700" },
  ],
  applications: [
    { name: "Desktop App", description: "Available for Mac and Windows", accent: "bg-slate-100 text-slate-700" },
    { name: "Mobile App", description: "Available for iOS and Android", accent: "bg-slate-100 text-slate-700" },
  ],
};

function MenuToolLink({ slug, onNavigate }) {
  const tool = toolBySlug[slug];
  if (!tool) {
    return null;
  }

  return (
    <a
      className="flex items-center gap-2 text-[13px] font-semibold text-slate-700 transition hover:text-slate-950"
      href={`/${tool.slug}`}
      onClick={onNavigate}
    >
      <span className={`inline-flex h-4 w-4 items-center justify-center rounded-[4px] ${tool.color} text-[8px] font-black text-white`}>
        {String(tool.symbol).slice(0, 2)}
      </span>
      <span>{tool.title}</span>
    </a>
  );
}

function AllToolsMenu() {
  const { t } = useI18n();
  const titles = {
    "Organize PDF": t("home.filters.2", "Organize PDF"),
    "Optimize PDF": t("home.filters.3", "Optimize PDF"),
    "Convert to PDF": "Convert to PDF",
    "Convert from PDF": "Convert from PDF",
    "Edit PDF": t("home.filters.5", "Edit PDF"),
    "PDF Security": t("home.filters.6", "PDF Security"),
    "PDF Intelligence": t("home.filters.7", "PDF Intelligence"),
  };

  return (
    <div className="pointer-events-none absolute left-0 top-full z-50 hidden w-[1380px] max-w-[calc(100vw-28px)] pt-3 opacity-0 transition duration-150 lg:block group-hover:pointer-events-auto group-hover:opacity-100">
      <div className="rounded-[22px] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div className="grid gap-8 lg:grid-cols-7">
          {allToolsColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-black uppercase tracking-[0.1em] text-slate-500">
                {titles[column.title] || column.title}
              </h3>
              <div className="mt-5 space-y-4">
                {column.items.map((slug) => (
                  <MenuToolLink key={slug} slug={slug} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LanguageMenuItem() {
  const { t, language, languages, setLocale } = useI18n();

  return (
    <div className="group/language relative">
      <button
        className="flex w-full items-center justify-between gap-4 text-left text-sm font-bold text-slate-700 transition hover:text-slate-950"
        type="button"
      >
        <span>{t("nav.language", "Language")}</span>
        <span className="text-xs font-semibold text-slate-400">{language.nativeLabel}</span>
      </button>

      <div className="pointer-events-none absolute right-full top-1/2 z-10 hidden w-60 -translate-y-1/2 pr-3 opacity-0 transition duration-150 lg:block group-hover/language:pointer-events-auto group-hover/language:opacity-100">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          <div className="space-y-1">
            {languages.map((item) => (
              <button
                key={item.code}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                  item.code === language.code
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                }`}
                onClick={() => setLocale(item.code)}
                type="button"
              >
                <span>{item.nativeLabel}</span>
                <span className="text-xs uppercase tracking-[0.08em] text-slate-400">
                  {item.code === language.code ? t("pages.selected", "Selected") : item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RightHoverMenu({ links = [] }) {
  const { t } = useI18n();
  const topLinks = links.slice(0, 4);
  const bottomLinks = links.slice(4);

  return (
    <div className="pointer-events-none absolute right-0 top-full z-50 hidden w-[830px] max-w-[calc(100vw-24px)] pt-3 opacity-0 transition duration-150 lg:block group-hover:pointer-events-auto group-hover:opacity-100">
      <div className="rounded-[22px] border border-slate-200 bg-white p-7 shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_0.6fr]">
          <div className="grid gap-7 lg:grid-cols-2">
            <div>
              <h3 className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                {t("nav.otherProducts", "Other Products")}
              </h3>
              <div className="mt-5 space-y-4">
                {rightMenu.otherProducts.map((item) => (
                  <a key={item.name} className="flex gap-3" href="/">
                    <span className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.accent}`}>
                      ◆
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-800">{item.name}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </a>
                ))}
              </div>

              <a className="mt-5 block rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-600" href="/">
                <span className="block font-bold text-slate-700">{t("nav.integrations", "Integrations")}</span>
                <span className="mt-1 block text-xs">Zapier, Make, Wordpress...</span>
              </a>
            </div>

            <div className="border-l border-slate-200 pl-7">
              <h3 className="text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                {t("nav.solutions", "Solutions")}
              </h3>
              <div className="mt-5 space-y-4">
                {rightMenu.solutions.map((item) => (
                  <a key={item.name} className="flex gap-3" href="/">
                    <span className={`mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.accent}`}>
                      ▮
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-800">{item.name}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </a>
                ))}
              </div>

              <h3 className="mt-8 text-xs font-black uppercase tracking-[0.08em] text-slate-500">
                {t("nav.applications", "Applications")}
              </h3>
              <div className="mt-5 space-y-4">
                {rightMenu.applications.map((item) => (
                  <a key={item.name} className="flex gap-3" href="/">
                    <span className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl ${item.accent}`}>
                      □
                    </span>
                    <span>
                      <span className="block text-sm font-bold text-slate-800">{item.name}</span>
                      <span className="block text-xs text-slate-500">{item.description}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-l border-slate-200 pl-7">
            <div className="space-y-5">
              {topLinks.map((link) => (
                <a
                  key={link.key}
                  className="block text-sm font-bold text-slate-700 transition hover:text-slate-950"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="mt-10 space-y-5 border-t border-slate-200 pt-6">
              {bottomLinks.map((link) => (
                <a
                  key={link.key}
                  className="block text-sm font-bold text-slate-700 transition hover:text-slate-950"
                  href={link.href}
                >
                  {link.label}
                </a>
              ))}
              <LanguageMenuItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu({ links, user, onLogout, authLoading, onClose }) {
  const { t, language, languages, setLocale } = useI18n();

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
      <div className="grid gap-4">
        <div className="grid gap-2">
          {links.map((link) => (
            <a
              key={link.key}
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              href={link.href}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-500">
            {t("nav.language", "Language")}
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {languages.map((item) => (
              <button
                key={item.code}
                className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition ${
                  item.code === language.code
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700"
                }`}
                onClick={() => {
                  setLocale(item.code);
                  onClose();
                }}
                type="button"
              >
                {item.nativeLabel}
              </button>
            ))}
          </div>
        </div>

        {!authLoading && !user ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
              href="/login"
              onClick={onClose}
            >
              {t("nav.login", "Login")}
            </a>
            <a
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              href="/signup"
              onClick={onClose}
            >
              {t("nav.signup", "Sign up")}
            </a>
          </div>
        ) : null}

        {!authLoading && user ? (
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">
                {t("nav.signedIn", "Signed in")}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-800">{user.name}</p>
            </div>
            <button
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              onClick={onLogout}
              type="button"
            >
              {t("nav.logout", "Logout")}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Navbar({ user, onLogout, authLoading }) {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const primaryLinks = [
    { key: "merge", label: t("nav.merge", "Merge PDF"), href: "/merge-pdf" },
    { key: "split", label: t("nav.split", "Split PDF"), href: "/split-pdf" },
    { key: "compress", label: t("nav.compress", "Compress PDF"), href: "/compress-pdf" },
    { key: "convert", label: t("nav.convert", "Convert PDF"), href: "/" },
  ];
  const utilityLinks = [
    { key: "pricing", label: t("nav.pricing", "Pricing"), href: "/pricing" },
    { key: "security", label: t("nav.security", "Security"), href: "/security" },
    { key: "features", label: t("nav.features", "Features"), href: "/features" },
    { key: "about", label: t("nav.about", "About us"), href: "/about" },
    { key: "help", label: t("nav.help", "Help"), href: "/help" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-5">
        <div className="flex items-center gap-4 lg:gap-6">
          <a className="flex items-center gap-1 text-2xl font-black tracking-tight text-slate-950" href="/">
            <span>I</span>
            <span className="text-slate-950">❤</span>
            <span>PDF</span>
          </a>

          <nav className="hidden items-center gap-6 xl:flex">
            {primaryLinks.map((link) => (
              <a
                key={link.key}
                className="text-sm font-semibold uppercase tracking-[0.04em] text-slate-700 transition hover:text-slate-950"
                href={link.href}
              >
                {link.label}
              </a>
            ))}

            <div className="group relative">
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.04em] text-slate-700 transition hover:text-slate-950"
                type="button"
              >
                <span>{t("nav.allTools", "All PDF Tools")}</span>
                <span className="text-xs">▾</span>
              </button>
              <AllToolsMenu />
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!authLoading && !user ? (
            <>
              <a className="hidden text-sm font-semibold text-slate-700 hover:text-slate-950 sm:inline-flex" href="/login">
                {t("nav.login", "Login")}
              </a>
              <a
                className="hidden rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 sm:inline-flex"
                href="/signup"
              >
                {t("nav.signup", "Sign up")}
              </a>
            </>
          ) : null}

          {!authLoading && user ? (
            <>
              <div className="hidden rounded-xl border border-slate-200 px-4 py-2 text-right lg:block">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t("nav.signedIn", "Signed in")}
                </p>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
              </div>
              <button
                className="hidden rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 lg:inline-flex"
                onClick={onLogout}
                type="button"
              >
                {t("nav.logout", "Logout")}
              </button>
            </>
          ) : null}

          <div className="group relative hidden lg:block">
            <button
              aria-label="Open menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
              type="button"
            >
              <span className="text-xl leading-none">⋮</span>
            </button>
            <RightHoverMenu links={utilityLinks} />
          </div>

          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:text-slate-950 lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            type="button"
          >
            <span className="text-lg leading-none">{mobileOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <MobileMenu
          authLoading={authLoading}
          links={[...primaryLinks, ...utilityLinks]}
          onClose={() => setMobileOpen(false)}
          onLogout={onLogout}
          user={user}
        />
      ) : null}
    </header>
  );
}

export default Navbar;
