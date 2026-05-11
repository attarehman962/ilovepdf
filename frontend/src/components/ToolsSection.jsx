import { useEffect, useMemo, useRef, useState } from "react";

import { HOME_FILTER_CATEGORY_MAP, HOME_FILTERS, toolCatalog } from "../lib/toolCatalog";
import { useI18n } from "../lib/i18n";

const categoryMeta = {
  workflow: { label: "Workflow", color: "#ff6f2c", surface: "#fff1e8" },
  organize: { label: "Organize", color: "#2d7ff9", surface: "#eef5ff" },
  optimize: { label: "Optimize", color: "#ffb400", surface: "#fff8e4" },
  convert: { label: "Convert", color: "#f82b60", surface: "#fff0f4" },
  edit: { label: "Edit", color: "#8b46ff", surface: "#f3ecff" },
  security: { label: "Security", color: "#20c933", surface: "#eefdec" },
  intelligence: { label: "Intelligence", color: "#18bfff", surface: "#ebf9ff" },
};

function ToolCard({ tool, animDelay, visible }) {
  const meta = categoryMeta[tool.category] || categoryMeta.organize;

  return (
    <a
      className="group flex h-full flex-col rounded-[28px] border border-[#eadcc0] bg-white p-5 shadow-[0_10px_24px_rgba(31,24,42,0.04)]"
      href={`/${tool.slug}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms, box-shadow 0.25s ease, border-color 0.2s ease`,
        willChange: "opacity, transform",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="inline-flex h-14 w-14 items-center justify-center rounded-[20px] text-lg font-black text-white shadow-[0_14px_28px_rgba(31,24,42,0.12)] transition-transform duration-250 group-hover:scale-105"
          style={{ backgroundColor: meta.color }}
        >
          {tool.symbol}
        </span>

        {tool.badge ? (
          <span className="rounded-full bg-[#1d1b22] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-white">
            {tool.badge}
          </span>
        ) : null}
      </div>

      <h3 className="mt-6 text-[1.28rem] font-extrabold tracking-[-0.03em] text-[#1d1b22] transition-colors duration-150 group-hover:text-black">
        {tool.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-600">{tool.description}</p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-[0.14em]"
          style={{ backgroundColor: meta.surface, color: meta.color }}
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} />
          {meta.label}
        </span>
        <span className="text-sm font-bold text-slate-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-slate-900">
          Open →
        </span>
      </div>
    </a>
  );
}

function WorkflowCard({ tool, animDelay, visible }) {
  return (
    <a
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#f2c39d] bg-[linear-gradient(135deg,#fff3eb_0%,#fff8f1_100%)] p-5 shadow-[0_14px_28px_rgba(255,111,44,0.12)]"
      href={`/${tool.slug}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${animDelay}ms, box-shadow 0.25s ease`,
        willChange: "opacity, transform",
      }}
    >
      <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f2c]">
        Workflow Builder
      </span>
      <h3 className="mt-5 text-[1.4rem] font-extrabold tracking-[-0.04em] text-[#1d1b22] transition-colors duration-150 group-hover:text-black">
        {tool.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-slate-700">
        Chain multiple tools together, save your favorite setup locally, and run polished end-to-end demos without repeating the same steps.
      </p>

      <div className="mt-8 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-[0.14em] text-slate-600">
        <span className="rounded-full border border-white/80 bg-white px-3 py-2">Merge</span>
        <span className="rounded-full border border-white/80 bg-white px-3 py-2">OCR</span>
        <span className="rounded-full border border-white/80 bg-white px-3 py-2">Protect</span>
      </div>

      <div className="mt-auto pt-6 text-sm font-black text-[#ff6f2c] transition-all duration-200 group-hover:translate-x-0.5">
        Create workflow →
      </div>
    </a>
  );
}

function ToolsSection({ activeFilter = "all", searchQuery = "" }) {
  const { t } = useI18n();
  const gridRef = useRef(null);
  const [gridInView, setGridInView] = useState(false);
  const headerRef = useRef(null);
  const [headerInView, setHeaderInView] = useState(false);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const activeFilterLabel = HOME_FILTERS.find((filter) => filter.key === activeFilter)?.fallback || "All";

  const visibleTools = useMemo(() => {
    return toolCatalog.filter((tool) => {
      const category = HOME_FILTER_CATEGORY_MAP[activeFilter];
      if (category && tool.category !== category) return false;
      if (!normalizedQuery) return true;
      const haystack = `${tool.title} ${tool.description} ${tool.category} ${tool.slug}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeFilter, normalizedQuery]);

  useEffect(() => {
    const observers = [];

    const observe = (el, setter) => {
      if (!el || typeof IntersectionObserver === "undefined") {
        setter(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true);
            observer.disconnect();
          }
        },
        { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    };

    observe(headerRef.current, setHeaderInView);
    observe(gridRef.current, setGridInView);
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Re-trigger animation when filter/search changes
  useEffect(() => {
    setGridInView(false);
    const t = setTimeout(() => setGridInView(true), 30);
    return () => clearTimeout(t);
  }, [activeFilter, normalizedQuery]);

  return (
    <section className="bg-[var(--app-bg)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1400px]">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Tool library</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-[#1d1b22] sm:text-4xl">
              {activeFilter === "all" ? "Explore every PDF tool" : `${activeFilterLabel} tools`}
            </h2>
          </div>
          <p className="text-sm font-semibold text-slate-500 sm:text-right">
            {normalizedQuery
              ? `Showing ${visibleTools.length} result${visibleTools.length === 1 ? "" : "s"} for "${searchQuery.trim()}"`
              : `${visibleTools.length} tools ready to use`}
          </p>
        </div>

        {visibleTools.length === 0 ? (
          <div className="rounded-[30px] border border-dashed border-[#d8c8ab] bg-white/70 px-6 py-14 text-center shadow-[0_10px_24px_rgba(31,24,42,0.03)]">
            <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#1d1b22]">No tools match that search yet</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Try a different keyword, clear the search, or switch back to another category to see more modules.
            </p>
          </div>
        ) : (
          <div ref={gridRef} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {visibleTools.map((tool, index) => {
              const delay = Math.min(index * 55, 360);
              return tool.special === "workflow" ? (
                <WorkflowCard
                  key={tool.slug}
                  animDelay={delay}
                  tool={tool}
                  visible={gridInView}
                />
              ) : (
                <ToolCard
                  key={tool.slug}
                  animDelay={delay}
                  tool={tool}
                  visible={gridInView}
                />
              );
            })}
          </div>
        )}

        <div
          className="mt-8 rounded-[28px] border border-[#eadcc0] bg-white px-5 py-4 text-sm text-slate-600 shadow-[0_8px_20px_rgba(31,24,42,0.04)] sm:flex sm:items-center sm:justify-between sm:px-6"
          style={{
            opacity: gridInView ? 1 : 0,
            transition: "opacity 0.6s ease 0.4s",
          }}
        >
          <span>{t("home.trustDesc", "Enjoy all the tools you need to work efficiently with digital documents while keeping your data safe and secure.")}</span>
          <a className="mt-3 inline-flex font-bold text-[#1d1b22] transition-all duration-200 hover:translate-x-0.5 sm:mt-0" href="/features">
            See complete feature list →
          </a>
        </div>
      </div>
    </section>
  );
}

export default ToolsSection;
