import { useI18n } from "../lib/i18n";

function ImageEditorSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white py-6 sm:py-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <img
            alt="Image editing preview"
            className="h-full w-full object-cover"
            src="/iloveimg.webp"
          />
        </div>

        <div className="max-w-xl">
          <span className="inline-flex rounded-full border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-700">
            iLoveIMG
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            {t("home.imageTitle", "Image editing made simple")}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            {t("home.imageDesc", "Experience the speed, simplicity, and security you expect from your PDF workflow.")}
          </p>
          <a
            className="mt-8 inline-flex rounded-2xl border-2 border-slate-900 px-6 py-3 text-base font-bold text-slate-900 transition hover:bg-slate-900 hover:text-white"
            href="/"
          >
            {t("home.imageButton", "Go to iLoveIMG")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default ImageEditorSection;
