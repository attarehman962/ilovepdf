function PremiumSection() {
  return (
    <section className="bg-white py-8 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[36px] bg-[#fff2c6] px-8 py-10 shadow-[0_18px_50px_rgba(251,191,36,0.14)] lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Get more with Premium
            </h2>
            <ul className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
              <li className="flex gap-3">
                <span className="mt-1 text-emerald-500">✓</span>
                <span>Get full access to iLovePDF and work offline with Desktop.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-emerald-500">✓</span>
                <span>Edit PDFs, get advanced OCR, and request secure e-signatures.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-emerald-500">✓</span>
                <span>Connect tools and create custom workflows for your team.</span>
              </li>
            </ul>
            <a
              className="mt-10 inline-flex rounded-2xl bg-[#ffbf2f] px-6 py-3 text-base font-bold text-slate-900 transition hover:bg-[#f2b31d]"
              href="/"
            >
              Get Premium
            </a>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white/50 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
            <img
              alt="Premium feature preview"
              className="h-full w-full object-cover object-center"
              src="/home4.png"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PremiumSection;

