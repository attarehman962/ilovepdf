import { useInView } from "../hooks/useInView";

const highlights = [
  "Consistent upload, processing, and download flow",
  "Homepage search that filters the real tool catalog",
  "Visual hierarchy tuned for project demo quality",
];

function ImageEditorSection() {
  const [sectionRef, inView] = useInView();

  return (
    <section className="bg-[var(--app-bg)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div
        ref={sectionRef}
        className="mx-auto max-w-[1400px] rounded-[36px] bg-[#1d1b22] px-6 py-8 text-white shadow-[0_26px_60px_rgba(29,27,34,0.24)] lg:px-10 lg:py-10"
      >
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left — copy */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "none" : "translateY(28px)",
              transition: "opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/70">
              Project polish
            </span>
            <h2 className="mt-5 max-w-2xl text-4xl font-extrabold tracking-[-0.05em] sm:text-5xl">
              A homepage that feels ready for presentation, not just functionality
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/72">
              The landing experience now carries the same tone as your tool modules: clean, intentional, fast to scan, and strong enough for FYP demos or portfolio reviews.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-[#ff2b63] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_28px_rgba(248,43,96,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(248,43,96,0.35)]"
                href="/merge-pdf"
              >
                <span>Open a tool</span>
                <span aria-hidden="true">→</span>
              </a>
              <a
                className="inline-flex rounded-full border border-white/16 px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-white/6 hover:border-white/30"
                href="/features"
              >
                Browse features
              </a>
            </div>
          </div>

          {/* Right — highlight cards */}
          <div className="grid gap-3">
            {highlights.map((highlight, index) => (
              <div
                key={highlight}
                className="flex items-start gap-4 rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 transition-all duration-200 hover:bg-white/8 hover:border-white/16"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "none" : "translateX(20px)",
                  transition: `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${100 + index * 100}ms, transform 0.55s cubic-bezier(0.22,1,0.36,1) ${100 + index * 100}ms, background-color 0.2s ease`,
                }}
              >
                <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-[14px] bg-white text-sm font-black text-[#1d1b22]">
                  0{index + 1}
                </span>
                <p className="text-sm font-medium leading-6 text-white/78">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ImageEditorSection;
