import { useI18n } from "../lib/i18n";

const helpSteps = [
  "Create an account or log in if you want to keep a persistent workspace session.",
  "Choose a tool from the homepage grid or the top navigation.",
  "Upload one or more files depending on the tool you selected.",
  "Fill in the tool options when needed, such as pages, password, rotation, or workflow steps.",
  "Run the process and download the generated file when it is ready.",
];

const tips = [
  "Use `Merge PDF` when you want one file from several PDFs.",
  "Use `Split PDF` when you need specific pages as separate outputs.",
  "Use `Protect PDF` to add a password and `Unlock PDF` to remove one.",
  "Use `Create a workflow` to chain several operations in sequence.",
  "Use `Pricing` if you want to compare plan tiers and team capabilities.",
];

function HelpPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">
          {t("pages.helpEyebrow", "Help")}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("pages.helpTitle", "How to use the app")}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {t("pages.helpDesc", "The workflow is simple: choose a tool, upload your file, configure the options, and download the result.")}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Step-by-step guide
            </h2>
            <div className="mt-6 space-y-5">
              {helpSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-black text-white">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-base leading-7 text-slate-600">{step}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-7">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              Quick tips
            </h2>
            <div className="mt-6 space-y-4">
              {tips.map((tip) => (
                <div key={tip} className="flex gap-3 text-base leading-7 text-slate-600">
                  <span className="mt-0.5 text-slate-700">✓</span>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default HelpPage;
