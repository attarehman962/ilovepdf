import { useI18n } from "../lib/i18n";

const badges = ["ISO 27001", "Secure SSL Encryption", "PDF Association"];

function TrustSection() {
  const { t } = useI18n();

  return (
    <section className="bg-white px-4 py-20 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("home.trustTitle", "The PDF software trusted by millions of users")}
        </h2>
        <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 text-slate-600 sm:text-xl">
          {t("home.trustDesc", "Enjoy all the tools you need to work efficiently with digital documents while keeping your data safe and secure.")}
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-5 sm:gap-8">
          {badges.map((badge) => (
            <div
              key={badge}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-500"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
