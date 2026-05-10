import { useI18n } from "../lib/i18n";

const LINK_HREF_MAP = {
  Home: "/",
  Features: "/features",
  Pricing: "/pricing",
  Security: "/security",
  "About us": "/about",
  Help: "/help",
  Language: "/language",
  Tools: "/features",
  FAQ: "/help",
  "Privacy policy": "/security",
  "Terms & conditions": "/security",
  Cookies: "/security",
  "Contact us": "/about",
  Blog: "/about",
  Press: "/about",
  Business: "/pricing",
  Education: "/features",
  "iLovePDF Desktop": "/features",
  "iLovePDF Mobile": "/features",
  iLoveSign: "/sign-pdf",
  iLoveAPI: "/features",
  iLoveIMG: "/features",
  Inicio: "/",
  Funciones: "/features",
  Precios: "/pricing",
  Seguridad: "/security",
  "Sobre nosotros": "/about",
  Ayuda: "/help",
  Herramientas: "/features",
  Privacidad: "/security",
  Terminos: "/security",
  Contacto: "/about",
  Prensa: "/about",
  Negocios: "/pricing",
  Educacion: "/features",
  Accueil: "/",
  Fonctionnalités: "/features",
  Tarifs: "/pricing",
  Sécurité: "/security",
  "À propos": "/about",
  Aide: "/help",
  "Politique de confidentialité": "/security",
  "Conditions générales": "/security",
  Outils: "/features",
};

function linkHref(label) {
  return LINK_HREF_MAP[label] || "/";
}

function Footer() {
  const { t, language } = useI18n();
  const footerGroups = t("footer.groups", []);
  const stores = t("footer.stores", []);
  const storeLinks = [
    { label: stores[0], href: "/features" },
    { label: stores[1], href: "/features" },
    { label: stores[2], href: "/features" },
    { label: stores[3], href: "/pricing" },
  ].filter((item) => item.label);

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
                      href={linkHref(link)}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 lg:justify-self-end">
            {storeLinks.map((store) => (
              <a
                key={store.label}
                className="flex w-full items-center justify-center rounded-xl border border-slate-500 px-4 py-3 text-sm font-semibold text-white transition hover:border-slate-300"
                href={store.href}
              >
                {store.label}
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
              <a className="text-xl transition hover:text-white" aria-label="Project updates" href="/about">𝕏</a>
              <a className="text-xl transition hover:text-white" aria-label="Security details" href="/security">f</a>
              <a className="text-xl transition hover:text-white" aria-label="Business plan details" href="/pricing">in</a>
              <a className="text-xl transition hover:text-white" aria-label="Feature overview" href="/features">◎</a>
              <a className="text-xl transition hover:text-white" aria-label="Help and guidance" href="/help">♪</a>
              <span className="text-sm text-slate-400">© iLovePDF 2026 • {t("footer.copyright", "Your PDF Editor")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
