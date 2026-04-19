function ImageEditorSection() {
  return (
    <section className="bg-white py-6 sm:py-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-[#eef6ff] shadow-[0_18px_50px_rgba(59,130,246,0.08)]">
          <img
            alt="Image editing preview"
            className="h-full w-full object-cover"
            src="/home6.png"
          />
        </div>

        <div className="max-w-xl">
          <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#ef4335]">
            iLoveIMG
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Image editing made simple
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Experience the speed, simplicity, and security you expect from your
            PDF workflow, tailored for image editing too. Compress, resize, and
            enhance visuals with an interface that stays familiar.
          </p>
          <a
            className="mt-8 inline-flex rounded-2xl border-2 border-[#ef4335] px-6 py-3 text-base font-bold text-[#ef4335] transition hover:bg-[#ef4335] hover:text-white"
            href="/"
          >
            Go to iLoveIMG
          </a>
        </div>
      </div>
    </section>
  );
}

export default ImageEditorSection;

