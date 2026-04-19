import { useI18n } from "../lib/i18n";

function Footer() {
  const { t, language } = useI18n();
  const footerGroups = t("footer.groups", []);
  const stores = t("footer.stores", []);

  return (
    <footer className="bg-[#2b2a33] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-extrabold uppercase tracking-[0.08em] text-white">
                  {group.title}
                </h3>
                <div className="mt-5 space-y-4">
                  {group.links.map((link) => (
                    <a
                      key={link}
                      className="block text-[15px] text-slate-300 transition hover:text-white"
                      href="/"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 lg:justify-self-end">
            {stores.map((store) => (
              <a
                key={store}
                className="flex w-full items-center justify-center rounded-xl border border-slate-500 px-4 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
                href="/"
              >
                {store}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-slate-600 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <a
              className="inline-flex w-fit items-center rounded-xl border border-slate-500 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-300"
              href="/language"
            >
              {language.nativeLabel}
            </a>

            <div className="flex flex-wrap items-center gap-5 text-slate-300">
              <span className="text-xl">𝕏</span>
              <span className="text-xl">f</span>
              <span className="text-xl">in</span>
              <span className="text-xl">◎</span>
              <span className="text-xl">♪</span>
              <span className="text-sm text-slate-400">© iLovePDF 2026 • {t("footer.copyright", "Your PDF Editor")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
