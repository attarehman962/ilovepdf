import { useI18n } from "../lib/i18n";

function PremiumSection() {
  const { t } = useI18n();
  const items = t("home.premiumList", []);

  return (
    <section className="bg-white py-8 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 overflow-hidden rounded-[36px] border border-slate-200 bg-slate-100 px-8 py-10 shadow-[0_18px_50px_rgba(15,23,42,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              {t("home.premiumTitle", "Get more with Premium")}
            </h2>
            <ul className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
              {items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-slate-700">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              className="mt-10 inline-flex rounded-2xl bg-slate-900 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800"
              href="/"
            >
              {t("home.premiumButton", "Get Premium")}
            </a>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white/50 shadow-[0_14px_40px_rgba(15,23,42,0.10)]">
            <img
              alt="Premium feature preview"
              className="h-full w-full object-cover object-center"
              src="/premium.webp"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default PremiumSection;
