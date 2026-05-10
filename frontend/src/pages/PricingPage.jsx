import { useI18n } from "../lib/i18n";

const planCards = [
  {
    name: "Basic",
    price: "Free",
    subtitle: "Best for everyday PDF tasks",
    cta: "Use the workspace",
    accent: "border-slate-300 bg-white",
    buttonClass:
      "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white",
    features: [
      "Process files with core PDF tools",
      "No account required to start",
      "Great for merge, split, compress, convert, and page utilities",
    ],
  },
  {
    name: "Enhanced",
    price: "Demo",
    subtitle: "Advanced features highlighted in this project",
    cta: "Explore advanced tools",
    accent: "border-slate-300 bg-slate-100",
    buttonClass: "bg-slate-900 text-white hover:bg-slate-800",
    features: [
      "Searchable scan-to-PDF and OCR workflows",
      "Translated PDF reports and extractive summaries",
      "Workflow presets saved in your browser",
      "AES-256 PDF protection and stronger validation",
    ],
    highlight: true,
  },
  {
    name: "Roadmap",
    price: "Next",
    subtitle: "High-value expansion ideas for future work",
    cta: "See project scope",
    accent: "border-slate-300 bg-white",
    buttonClass:
      "border border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50",
    features: [
      "Visual page organization and richer signing",
      "Persistent accounts, history, and saved workflows",
      "Team collaboration, roles, and API integration",
    ],
  },
];

const comparisonRows = [
  ["Core PDF tools", "Included", "Included", "Included"],
  ["OCR and searchable scans", "-", "Included", "Planned"],
  ["Translated PDF reports", "-", "Included", "Planned"],
  ["Workflow presets", "-", "Included", "Planned"],
  ["AES-256 protection", "Included", "Included", "Included"],
  ["Team collaboration", "-", "-", "Planned"],
  ["Saved processing history", "-", "-", "Planned"],
  ["API integrations", "-", "-", "Planned"],
  ["Visual page organizer", "-", "-", "Planned"],
];

function PricingPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_25%,#ffffff_100%)]">
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">
          {t("pricing.eyebrow", "Pricing plans")}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("pricing.title", "Choose the setup that suits your workflow")}
        </h1>

        <div className="mt-5 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
          <span className="rounded-full px-4 py-2 text-sm font-semibold text-slate-500">
            {t("pricing.monthly", "Monthly Billing")}
          </span>
          <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
            {t("pricing.yearly", "Yearly Billing")}
          </span>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {planCards.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[28px] border p-7 text-left shadow-[0_16px_40px_rgba(15,23,42,0.06)] ${plan.accent} ${
                plan.highlight ? "scale-[1.02]" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-black text-slate-800">{plan.name}</h2>
                {plan.highlight ? (
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                    Best value
                  </span>
                ) : null}
              </div>

              <p className="mt-6 text-4xl font-black tracking-tight text-slate-900">
                {plan.price}
              </p>
              <p className="mt-2 text-sm text-slate-500">{plan.subtitle}</p>

              <button
                className={`mt-7 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition ${plan.buttonClass}`}
                type="button"
              >
                {plan.cta}
              </button>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                  What is included
                </p>
                <div className="mt-4 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 text-slate-700">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-500">
          {t("pricing.note", "This page presents the current feature depth of the project and the most valuable next improvements.")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              {t("pricing.compare", "Compare the plans")}
            </h2>
            <span className="text-sm font-semibold text-slate-500">{t("pricing.yearlyShown", "Yearly billing shown")}</span>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-4 text-sm font-black uppercase tracking-[0.12em] text-slate-500">
                    Feature
                  </th>
                  <th className="px-4 py-4 text-sm font-black text-slate-800">Basic</th>
                  <th className="px-4 py-4 text-sm font-black text-slate-800">Enhanced</th>
                  <th className="px-4 py-4 text-sm font-black text-slate-800">Roadmap</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row[0]}
                    className={index % 2 === 0 ? "bg-slate-50" : "bg-white"}
                  >
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">
                      {row[0]}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row[1]}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row[2]}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-[0_20px_50px_rgba(15,23,42,0.16)] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="overflow-hidden rounded-[24px] border border-slate-700 bg-black p-5">
            <pre className="overflow-x-auto text-sm leading-7 text-slate-300">
{`compress_pdf(
  "invoice.pdf",
  output="invoice-small.pdf",
  quality="ebook"
)`}
            </pre>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-300">
              {t("pricing.apiEyebrow", "Project direction")}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              {t("pricing.apiTitle", "Turn this project into a stronger final-year showcase")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {t("pricing.apiText", "The architecture is ready for deeper workflow automation, saved history, team features, and integration layers once you decide which direction your project should grow next.")}
            </p>
            <a
              className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              href="/features"
            >
              {t("pricing.apiButton", "See feature roadmap")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PricingPage;
