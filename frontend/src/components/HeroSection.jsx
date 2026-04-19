const filters = [
  "All",
  "Workflows",
  "Organize PDF",
  "Optimize PDF",
  "Convert PDF",
  "Edit PDF",
  "PDF Security",
  "PDF Intelligence",
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(255,232,232,0.9),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(239,68,68,0.08),_transparent_22%),linear-gradient(180deg,#ffffff_0%,#fff8f8_100%)]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(90deg,rgba(239,68,68,0.03),transparent_40%,rgba(15,23,42,0.03))]" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Every tool you need to work with PDFs in one place
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
          Every tool you need to use PDFs, at your fingertips. Merge, split,
          compress, convert, rotate, unlock and watermark files with just a few
          clicks.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                index === 0
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-950"
              }`}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

