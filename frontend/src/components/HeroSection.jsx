import { useI18n } from "../lib/i18n";

function HeroSection({ activeFilter, onFilterChange }) {
  const { t } = useI18n();
  const filters = t("home.filters", []);

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(226,232,240,0.8),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.06),_transparent_22%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(90deg,rgba(15,23,42,0.04),transparent_40%,rgba(15,23,42,0.03))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          {t("home.heroTitle", "Every tool you need to work with PDFs in one place")}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
          {t("home.heroDesc", "Every tool you need to use PDFs, at your fingertips.")}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                aria-pressed={isActive}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"
                }`}
                onClick={() => onFilterChange(filter)}
                type="button"
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
