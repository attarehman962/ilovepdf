import { useI18n } from "../lib/i18n";

const featureGroups = [
  {
    title: "PDF editing",
    items: [
      "Merge, split, rotate, crop, redact, and repair PDF documents.",
      "Add page numbers, signatures, and watermark layers in a few clicks.",
      "Use OCR, summarization, and translation tools from the same workspace.",
    ],
  },
  {
    title: "Conversion tools",
    items: [
      "Convert PDF to Word, PowerPoint, Excel, and JPG.",
      "Create PDF files from Word, PowerPoint, Excel, HTML, and scanned images.",
      "Compress and optimize files for sharing, storage, or printing.",
    ],
  },
  {
    title: "Workflow features",
    items: [
      "Chain multiple processors into one reusable workflow.",
      "Keep files organized in one interface across desktop and mobile.",
      "Prepare documents for teams, clients, and internal operations.",
    ],
  },
];

function FeaturesPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">
          {t("pages.featuresEyebrow", "Features")}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("pages.featuresTitle", "Everything you need to work with documents")}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {t("pages.featuresDesc", "The app is built to cover everyday PDF work, team collaboration, conversion, protection, automation, and document intelligence from a single workspace.")}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featureGroups.map((group) => (
            <article
              key={group.title}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                {group.title}
              </h2>
              <div className="mt-6 space-y-4">
                {group.items.map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <span className="mt-0.5 text-slate-700">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default FeaturesPage;
