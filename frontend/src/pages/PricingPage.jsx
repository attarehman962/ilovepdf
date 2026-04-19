import { useI18n } from "../lib/i18n";

const planCards = [
  {
    name: "Basic",
    price: "Free",
    subtitle: "Best for trying our PDF tools",
    cta: "Start for free",
    accent: "border-slate-300 bg-white",
    buttonClass:
      "border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white",
    features: [
      "Process files with core PDF tools",
      "Limited access per task",
      "No account required to start",
    ],
  },
  {
    name: "Premium",
    price: "$4",
    subtitle: "Billed monthly",
    cta: "Go Premium",
    accent: "border-slate-300 bg-slate-100",
    buttonClass: "bg-slate-900 text-white hover:bg-slate-800",
    features: [
      "Unlimited document processing",
      "Desktop and mobile access",
      "Advanced OCR and e-signature tools",
      "Batch processing and priority support",
    ],
    highlight: true,
  },
  {
    name: "Business",
    price: "Let's talk",
    subtitle: "Scalable workflows for teams",
    cta: "Contact sales",
    accent: "border-slate-300 bg-white",
    buttonClass:
      "border border-slate-300 text-slate-800 hover:border-slate-400 hover:bg-slate-50",
    features: [
      "Shared seats and admin controls",
      "Dedicated account management",
      "SSO, integrations, and API options",
    ],
  },
];

const comparisonRows = [
  ["Tasks", "Limited", "All tools included", "All tools included"],
  ["Batch processing", "Limited", "Unlimited", "Unlimited"],
  ["Desktop access", "-", "Included", "Included"],
  ["Mobile app", "-", "Included", "Included"],
  ["OCR PDF", "-", "Included", "Included"],
  ["E-signatures", "-", "Included", "Included"],
  ["API access", "-", "2000 API credits", "Custom"],
  ["SSO", "-", "-", "Included"],
  ["Admin controls", "-", "-", "Included"],
  ["Priority support", "-", "1 day", "1 hour"],
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
          {t("pricing.title", "Choose the plan that suits you")}
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
          {t("pricing.note", "Premium saves more with annual billing. Business pricing depends on seats and workflow needs.")}
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
                  <th className="px-4 py-4 text-sm font-black text-slate-800">Premium</th>
                  <th className="px-4 py-4 text-sm font-black text-slate-800">Business</th>
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
              {t("pricing.apiEyebrow", "API for teams")}
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              {t("pricing.apiTitle", "Automate document processes with iLovePDF API")}
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-300">
              {t("pricing.apiText", "Build your own workflows for compressing, converting, protecting, and editing PDF files across your product stack.")}
            </p>
            <a
              className="mt-8 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              href="/signup"
            >
              {t("pricing.apiButton", "Start with API access")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PricingPage;
