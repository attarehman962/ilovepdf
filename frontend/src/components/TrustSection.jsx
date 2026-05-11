import { toolCatalog } from "../lib/toolCatalog";
import { useI18n } from "../lib/i18n";
import { useInView } from "../hooks/useInView";

const trustBadges = ["Responsive layout", "OCR-ready", "Workflow presets", "Secure processing"];

function TrustSection() {
  const { t } = useI18n();
  const [sectionRef, inView] = useInView();

  const metrics = [
    { label: "Tools", value: `${toolCatalog.length}+` },
    { label: "Languages", value: "6" },
    { label: "Core flows", value: "Upload → Process → Download" },
    { label: "Project focus", value: "Demo-ready UX" },
  ];

  const revealStyle = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : "translateY(24px)",
    transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
  });

  return (
    <section className="bg-[var(--app-bg)] px-4 py-6 sm:px-6 lg:px-8 lg:pb-14">
      <div
        ref={sectionRef}
        className="mx-auto max-w-[1400px] rounded-[36px] border border-[#eadcc0] bg-white px-6 py-8 shadow-[0_14px_30px_rgba(31,24,42,0.05)] lg:px-10 lg:py-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Left column */}
          <div style={revealStyle(0)}>
            <span className="inline-flex rounded-full bg-[#f8f1e4] px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
              Why it works
            </span>
            <h2 className="mt-5 text-4xl font-extrabold tracking-[-0.05em] text-[#1d1b22] sm:text-5xl">
              {t("home.trustTitle", "The PDF software trusted by millions of users")}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {t(
                "home.trustDesc",
                "Enjoy all the tools you need to work efficiently with digital documents while keeping your data safe and secure.",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {trustBadges.map((badge, i) => (
                <span
                  key={badge}
                  className="rounded-full border border-[#eadcc0] bg-[#fff9ef] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-600"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : "translateY(12px) scale(0.96)",
                    transition: `opacity 0.5s ease ${160 + i * 60}ms, transform 0.5s ease ${160 + i * 60}ms`,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right column — metric cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {metrics.map((metric, i) => (
              <article
                key={metric.label}
                className="rounded-[24px] border border-[#eadcc0] bg-[#fffdf8] px-5 py-5 shadow-[0_8px_20px_rgba(31,24,42,0.03)] transition-all duration-250 hover:shadow-[0_14px_30px_rgba(31,24,42,0.07)] hover:-translate-y-0.5"
                style={revealStyle(120 + i * 70)}
              >
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">{metric.label}</p>
                <p className="mt-3 text-2xl font-extrabold tracking-[-0.04em] text-[#1d1b22]">{metric.value}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
