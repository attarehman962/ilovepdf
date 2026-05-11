import { useI18n } from "../lib/i18n";
import { useInView } from "../hooks/useInView";

const workflowSteps = [
  {
    title: "Upload once",
    description: "Start with a single drag-and-drop zone that feeds every module.",
    color: "#2d7ff9",
  },
  {
    title: "Chain actions",
    description: "Merge, OCR, convert, protect, and reuse the same workflow setup.",
    color: "#ff6f2c",
  },
  {
    title: "Deliver results",
    description: "Download polished output fast for demos, reviews, and final submission.",
    color: "#20c933",
  },
];

function PremiumSection() {
  const { t } = useI18n();
  const [sectionRef, inView] = useInView();

  return (
    <section className="bg-[var(--app-bg)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div
        ref={sectionRef}
        className="mx-auto max-w-[1400px] overflow-hidden rounded-[36px] border border-[#f1c6a3] bg-[linear-gradient(135deg,#fff4ea_0%,#fffaf4_100%)] px-6 py-8 shadow-[0_24px_48px_rgba(255,111,44,0.1)] lg:px-10 lg:py-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          {/* Left — copy */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(28px)",
              transition: "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#ff6f2c]">
              Workflow-ready
            </span>
            <h2 className="mt-5 max-w-xl text-4xl font-extrabold tracking-[-0.05em] text-[#1d1b22] sm:text-5xl">
              Chain tools into one smooth document flow
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
              {t(
                "home.premiumTitle",
                "Move from upload to result without making the interface feel crowded. The workflow module now looks like a natural extension of the homepage.",
              )}
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#1d1b22] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(29,27,34,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#111015] hover:shadow-[0_18px_34px_rgba(29,27,34,0.24)]"
              href="/create-workflow"
            >
              <span>Create a workflow</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Right — step cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {workflowSteps.map((step, index) => (
              <article
                key={step.title}
                className="relative rounded-[26px] border border-white/90 bg-white p-5 shadow-[0_14px_32px_rgba(31,24,42,0.06)] transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(31,24,42,0.1)]"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateY(32px)",
                  transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${120 + index * 90}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${120 + index * 90}ms, box-shadow 0.25s ease`,
                }}
              >
                <span
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] text-sm font-black text-white"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl font-extrabold tracking-[-0.03em] text-[#1d1b22]">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PremiumSection;
