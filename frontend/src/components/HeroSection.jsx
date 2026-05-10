import { useEffect, useState } from "react";

import { useI18n } from "../lib/i18n";
import { HOME_FILTERS } from "../lib/toolCatalog";

function HeroSection({ activeFilter, onFilterChange, user }) {
  const { t } = useI18n();
  const [toastMounted, setToastMounted] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (!user?.name) {
      setToastVisible(false);
      setToastMounted(false);
      return undefined;
    }

    setToastMounted(true);
    const enterTimer = window.setTimeout(() => setToastVisible(true), 20);
    const exitTimer = window.setTimeout(() => setToastVisible(false), 1500);
    const unmountTimer = window.setTimeout(() => setToastMounted(false), 1850);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(unmountTimer);
    };
  }, [user?.name]);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(226,232,240,0.8),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.06),_transparent_22%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(90deg,rgba(15,23,42,0.04),transparent_40%,rgba(15,23,42,0.03))]" />
      {toastMounted ? (
        <div className="pointer-events-none absolute inset-x-0 top-5 z-20 flex justify-center px-4 sm:top-6">
          <div
            className={`inline-flex max-w-full items-center gap-3 rounded-full border border-emerald-200 bg-white/95 px-4 py-3 text-sm font-bold text-slate-800 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-emerald-100 backdrop-blur transition-all duration-300 ease-out ${
              toastVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
            }`}
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-black text-white shadow-sm">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
            <span className="truncate text-left">{`${t("home.welcomeBack", "Welcome")}, ${user?.name}`}</span>
          </div>
        </div>
      ) : null}
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {t("home.heroTitle", "Every tool you need to work with PDFs in one place")}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
          {t("home.heroDesc", "Every tool you need to use PDFs, at your fingertips.")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {HOME_FILTERS.map((filter) => {
            const isActive = filter.key === activeFilter;
            return (
              <button
                key={filter.key}
                aria-pressed={isActive}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"
                }`}
                onClick={() => onFilterChange(filter.key)}
                type="button"
              >
                {t(filter.labelPath, filter.fallback)}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
