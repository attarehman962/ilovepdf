import { useI18n } from "../lib/i18n";

const regions = [
  "North America",
  "South America",
  "Europe",
  "Middle East",
  "South Asia",
  "East Asia",
  "Southeast Asia",
  "Africa",
  "Oceania",
];

function LanguagePage() {
  const { t, language, languages, setLocale } = useI18n();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">
          {t("pages.languageEyebrow", "Language")}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("pages.languageTitle", "Built for a worldwide audience")}
        </h1>
        <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
          {t("pages.languageDesc", "Choose the language you want for the interface. Your preference is saved on this device.")}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {t("pages.languageSectionTitle", "Select app language")}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {languages.map((item) => (
                <button
                  key={item.code}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                    item.code === language.code
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
                  }`}
                  onClick={() => setLocale(item.code)}
                  type="button"
                >
                  <span className="block">{item.nativeLabel}</span>
                  <span className="mt-1 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                    {item.label}
                  </span>
                  {item.code === language.code ? (
                    <span className="mt-2 inline-flex rounded-full bg-white px-2 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-900">
                      {t("pages.selected", "Selected")}
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              {t("pages.languageRegionTitle", "Worldwide availability")}
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              {t("pages.languageRegionDesc", "The product experience is designed to be adaptable for many markets, teams, and regions with document workflows that work across borders.")}
            </p>
            <div className="mt-6 space-y-3">
              {regions.map((region) => (
                <div key={region} className="flex gap-3 text-sm font-semibold text-slate-700">
                  <span className="mt-0.5 text-slate-700">•</span>
                  <span>{region}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default LanguagePage;
