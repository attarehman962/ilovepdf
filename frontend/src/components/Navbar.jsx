import { useEffect, useMemo, useRef, useState } from "react";

import LogoBrand from "./LogoBrand";
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
    items: ["ai-summarizer", "translate-pdf", "create-workflow"],
  },
];

function Logo() {
  return (
    <a
      aria-label="DocMate home"
      className="flex shrink-0 items-center transition-opacity hover:opacity-90"
      href="/"
    >
      <LogoBrand className="h-[2.6rem] w-auto sm:h-[2.75rem] xl:h-[2.9rem]" />
    </a>
  );
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4 text-slate-500" viewBox="0 0 20 20" fill="none">
      <path d="M14 14L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MenuToolLink({ slug, onNavigate }) {
  const tool = toolBySlug[slug];
  if (!tool) return null;

  return (
    <a
      className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-[#f8f1e4] hover:text-slate-950 hover:translate-x-0.5"
      href={`/${tool.slug}`}
      onClick={onNavigate}
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] bg-[#1d1b22] text-xs font-black text-white">
        {String(tool.symbol).slice(0, 3)}
      </span>
      <span className="leading-tight">{tool.title}</span>
    </a>
  );
}

function AllToolsMenu() {
  const { t } = useI18n();
  const titles = {
    "Organize PDF": t("home.filters.organize", "Organize PDF"),
    "Optimize PDF": t("home.filters.optimize", "Optimize PDF"),
    "Convert to PDF": "Convert to PDF",
    "Convert from PDF": "Convert from PDF",
    "Edit PDF": t("home.filters.edit", "Edit PDF"),
    "PDF Security": t("home.filters.security", "PDF Security"),
    "PDF Intelligence": t("home.filters.intelligence", "PDF Intelligence"),
  };

  return (
    <div className="pointer-events-none absolute left-1/2 top-full hidden w-[min(76rem,calc(100vw-2rem))] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 lg:block group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0 translate-y-1">
      <div className="rounded-[30px] border border-[#eadcc0] bg-white p-6 shadow-[0_28px_60px_rgba(39,27,12,0.13)] xl:p-7">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
          {allToolsColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                {titles[column.title] || column.title}
              </h3>
              <div className="mt-4 space-y-1.5">
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

function SearchBox({ className = "w-full", inputRef, onChange, query, toolCount }) {
  return (
    <label
      className={`flex h-11 min-w-0 items-center gap-3 rounded-full border border-[#deceb2] bg-white px-4 shadow-[0_6px_20px_rgba(31,24,42,0.05)] transition-all duration-200 focus-within:border-[#cbb792] focus-within:shadow-[0_12px_30px_rgba(31,24,42,0.09)] ${className}`}
    >
      <SearchIcon />
      <input
        ref={inputRef}
        aria-label="Search tools"
        className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
        onChange={(event) => onChange(event.target.value)}
        placeholder={`Search ${toolCount} tools...`}
        type="search"
        value={query}
      />
      <span className="hidden rounded-full border border-[#eadcc0] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:inline-flex">
        ⌘K
      </span>
    </label>
  );
}

function MobileMenu({ authLoading, onClose, onLogout, onSearchChange, searchQuery, showSearch, user }) {
  const { t } = useI18n();
  const toolCount = Object.keys(toolBySlug).length;
  const primaryLinks = [
    { key: "merge", label: t("nav.merge", "Merge PDF"), href: "/merge-pdf" },
    { key: "split", label: t("nav.split", "Split PDF"), href: "/split-pdf" },
    { key: "compress", label: t("nav.compress", "Compress PDF"), href: "/compress-pdf" },
    { key: "convert", label: t("nav.convert", "Convert"), href: "/features" },
  ];

  return (
    <div className="border-t border-[#eadcc0] bg-[rgba(248,242,228,0.98)] px-4 py-5 lg:hidden animate-[navSlideDown_0.22s_ease_both]">
      <div className="mx-auto max-w-7xl space-y-5">
        {showSearch ? (
          <SearchBox onChange={onSearchChange} query={searchQuery} toolCount={toolCount} />
        ) : null}

        <div className="grid gap-2 sm:grid-cols-2">
          {primaryLinks.map((link) => (
            <a
              key={link.key}
              className="rounded-2xl border border-[#deceb2] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-[#cbb792] hover:text-slate-950 hover:shadow-[0_6px_16px_rgba(31,24,42,0.06)]"
              href={link.href}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="rounded-[28px] border border-[#deceb2] bg-white p-4 shadow-[0_16px_35px_rgba(31,24,42,0.06)]">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
            {t("nav.allTools", "All tools")}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {allToolsColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  {column.title}
                </h3>
                <div className="mt-2 space-y-1">
                  {column.items.map((slug) => (
                    <MenuToolLink key={slug} onNavigate={onClose} slug={slug} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {!authLoading && !user ? (
          <div className="grid gap-2 sm:grid-cols-2">
            <a
              className="inline-flex items-center justify-center rounded-full border border-[#deceb2] bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#cbb792]"
              href="/login"
              onClick={onClose}
            >
              {t("nav.login", "Login")}
            </a>
            <a
              className="inline-flex items-center justify-center rounded-full bg-[#1d1b22] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#111015]"
              href="/signup"
              onClick={onClose}
            >
              {t("nav.signup", "Sign up")}
            </a>
          </div>
        ) : null}

        {!authLoading && user ? (
          <div className="flex items-center justify-between rounded-[24px] border border-[#deceb2] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(31,24,42,0.04)]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                {t("nav.signedIn", "Signed in")}
              </p>
              <p className="mt-1 text-sm font-bold text-slate-900">{user.name}</p>
            </div>
            <button
              className="rounded-full border border-[#deceb2] px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#cbb792]"
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

function Navbar({ user, onLogout, authLoading, searchQuery, onSearchChange, showSearch }) {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const inputRef = useRef(null);
  const toolCount = Object.keys(toolBySlug).length;
  const primaryLinks = useMemo(
    () => [
      { key: "merge", label: t("nav.merge", "Merge PDF"), href: "/merge-pdf" },
      { key: "split", label: t("nav.split", "Split PDF"), href: "/split-pdf" },
      { key: "compress", label: t("nav.compress", "Compress"), href: "/compress-pdf" },
      { key: "convert", label: "Convert", href: "/features" },
    ],
    [t],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!showSearch) return undefined;

    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearch]);

  return (
    <header
      className={`navbar-shell sticky top-0 z-50 border-b border-[#eadcc0]/80 bg-[rgba(248,242,228,0.94)] backdrop-blur-md ${scrolled ? "navbar-elevated" : ""}`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-6 lg:gap-4 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-6 xl:gap-8">
          <Logo />

          <nav className="hidden min-w-0 flex-1 items-center gap-4 lg:flex xl:gap-5 2xl:gap-6">
            {primaryLinks.map((link) => (
              <a
                key={link.key}
                className="relative whitespace-nowrap text-[0.94rem] font-medium text-slate-700 transition-colors duration-150 hover:text-slate-950 xl:text-[0.98rem] after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#ff2b63] after:transition-all after:duration-200 hover:after:w-full"
                href={link.href}
              >
                {link.label}
              </a>
            ))}

            <div className="group relative">
              <button
                className="inline-flex items-center gap-2 whitespace-nowrap text-[0.94rem] font-medium text-slate-700 transition-colors duration-150 hover:text-slate-950 xl:text-[0.98rem]"
                type="button"
              >
                <span>{t("nav.allTools", "All tools")}</span>
                <span className="text-xs transition-transform duration-200 group-hover:rotate-180">▾</span>
              </button>
              <AllToolsMenu />
            </div>
          </nav>
        </div>

        {showSearch ? (
          <div className="hidden shrink-0 xl:block">
            <SearchBox
              className="w-[15rem] 2xl:w-[17rem]"
              inputRef={inputRef}
              onChange={onSearchChange}
              query={searchQuery}
              toolCount={toolCount}
            />
          </div>
        ) : null}

        <div className="ml-auto flex shrink-0 items-center gap-2 xl:gap-3">
          {!authLoading && !user ? (
            <>
              <a
                className="hidden whitespace-nowrap text-[0.94rem] font-semibold text-slate-800 transition-colors duration-150 hover:text-slate-950 lg:inline-flex xl:text-[0.98rem]"
                href="/login"
              >
                {t("nav.login", "Login")}
              </a>
              <a
                className="hidden whitespace-nowrap rounded-full bg-[#1d1b22] px-5 py-2.5 text-[0.94rem] font-semibold text-white shadow-[0_10px_22px_rgba(29,27,34,0.16)] transition-all duration-200 hover:-translate-y-px hover:bg-[#111015] hover:shadow-[0_14px_28px_rgba(29,27,34,0.22)] lg:inline-flex xl:px-6 xl:text-[0.98rem]"
                href="/signup"
              >
                {t("nav.signup", "Sign up")}
              </a>
            </>
          ) : null}

          {!authLoading && user ? (
            <>
              <div className="hidden items-center gap-3 rounded-full border border-[#deceb2] bg-white px-3 py-2 shadow-[0_8px_20px_rgba(31,24,42,0.05)] lg:flex">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1d1b22] text-xs font-black text-white">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
                <span className="max-w-[7.5rem] truncate whitespace-nowrap text-sm font-bold text-slate-900 xl:max-w-[9rem]">
                  {user.name}
                </span>
              </div>
              <button
                className="hidden whitespace-nowrap rounded-full border border-[#deceb2] bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-[#cbb792] hover:shadow-[0_4px_12px_rgba(31,24,42,0.06)] lg:inline-flex"
                onClick={onLogout}
                type="button"
              >
                {t("nav.logout", "Logout")}
              </button>
            </>
          ) : null}

          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#deceb2] bg-white text-slate-800 shadow-[0_8px_20px_rgba(31,24,42,0.05)] transition-all duration-200 hover:border-[#cbb792] hover:shadow-[0_10px_24px_rgba(31,24,42,0.08)] lg:hidden"
            onClick={() => setMobileOpen((current) => !current)}
            type="button"
          >
            <span
              className="text-base leading-none transition-transform duration-200"
              style={{ transform: mobileOpen ? "rotate(90deg)" : "none" }}
            >
              {mobileOpen ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <MobileMenu
          authLoading={authLoading}
          onClose={() => setMobileOpen(false)}
          onLogout={onLogout}
          onSearchChange={onSearchChange}
          searchQuery={searchQuery}
          showSearch={showSearch}
          user={user}
        />
      ) : null}
    </header>
  );
}

export default Navbar;
