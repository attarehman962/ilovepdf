import { useI18n } from "../lib/i18n";

const cardImages = ["/desktop.webp", "/mobile.webp", "/business.webp"];

function WorkSection() {
  const { t } = useI18n();
  const translatedCards = t("home.workCards", []);
  const workCards = cardImages.map((image, index) => ({
    image,
    ...(translatedCards[index] || {}),
  }));

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("home.workTitle", "Work your way")}
        </h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {workCards.map((card, index) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)]"
            >
              <div className="relative h-60 overflow-hidden bg-[#ffe6de]">
                <img
                  alt={card.title}
                  className={`h-full w-full object-cover ${
                    index === 1 ? "object-center" : "object-top"
                  }`}
                  src={card.image}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.28))]" />
              </div>
              <div className="p-7">
                <h3 className="text-3xl font-bold tracking-tight text-slate-800">
                  {card.title}
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-500">
                  {card.description}
                </p>
                <div className="mt-8 text-right text-4xl text-slate-600">↗</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
