import { useI18n } from "../lib/i18n";

const values = [
  "Simple tools that reduce friction around documents",
  "Fast workflows for individuals, students, and teams",
  "A global-first product direction with language support and broad document compatibility",
];

function AboutPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">
          {t("pages.aboutEyebrow", "About us")}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("pages.aboutTitle", "A document workspace designed to feel straightforward")}
        </h1>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-lg leading-8 text-slate-600">
              This app brings together conversion, editing, protection,
              automation, and account-based workflows in one clean interface. It
              is meant to help people handle document work faster without
              bouncing between many separate tools.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              The product direction is simple: support real file tasks, keep the
              experience understandable, and make the workspace ready for people
              in many regions and languages.
            </p>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-7">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              What we focus on
            </h2>
            <div className="mt-6 space-y-4">
              {values.map((value) => (
                <div key={value} className="flex gap-3 text-base leading-7 text-slate-600">
                  <span className="mt-0.5 text-slate-700">•</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
