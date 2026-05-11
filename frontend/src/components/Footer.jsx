import LogoBrand from "./LogoBrand";
import { useI18n } from "../lib/i18n";
import { useInView } from "../hooks/useInView";

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
  "DocMate Desktop": "/features",
  "DocMate Mobile": "/features",
  "DocMate Sign": "/sign-pdf",
  "DocMate API": "/features",
  "DocMate Images": "/features",
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
  const [footerRef, inView] = useInView({ threshold: 0.04 });
  const footerGroups = t("footer.groups", []);
  const stores = t("footer.stores", []);
  const storeLinks = [
    { label: stores[0], href: "/features" },
    { label: stores[1], href: "/features" },
    { label: stores[2], href: "/features" },
    { label: stores[3], href: "/pricing" },
  ].filter((item) => item.label);

  return (
    <footer className="bg-[#1d1b22] text-white">
      <div
        ref={footerRef}
        className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14"
      >
        {/* CTA banner */}
        <div
          className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_48px_rgba(0,0,0,0.16)] lg:flex lg:items-center lg:justify-between lg:gap-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(24px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">Stay in flow</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.05em] text-white sm:text-4xl">
              Keep the project polished across browser, desktop, and demo screens
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/65">
              Use the same clear structure for feature pages, account flows, and future modules while keeping the landing page visually distinctive.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 lg:mt-0 lg:max-w-md lg:justify-end">
            {storeLinks.map((store) => (
              <a
                key={store.label}
                className="inline-flex rounded-full border border-white/14 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/8 hover:border-white/28"
                href={store.href}
              >
                {store.label}
              </a>
            ))}
          </div>
        </div>

        {/* Main footer grid */}
        <div
          className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(20px)",
            transition: "opacity 0.65s ease 0.15s, transform 0.65s ease 0.15s",
          }}
        >
          {/* Brand column */}
          <div>
            <a className="inline-flex items-center" href="/">
              <LogoBrand className="h-9 w-auto" inverted />
            </a>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/58">
              Your PDF workspace for conversion, organization, protection, OCR, and polished final-year project presentations.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {footerGroups.map((group, groupIndex) => (
              <div
                key={group.title}
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${200 + groupIndex * 60}ms`,
                }}
              >
                <h3 className="text-sm font-extrabold uppercase tracking-[0.16em] text-white/80">
                  {group.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <a
                      key={link}
                      className="block text-sm text-white/58 transition-all duration-150 hover:text-white hover:translate-x-0.5"
                      href={linkHref(link)}
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 border-t border-white/10 pt-6"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.35s",
          }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <a
                className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/72 transition-all duration-200 hover:bg-white/6 hover:text-white"
                href="/language"
              >
                {language.nativeLabel}
              </a>
              <a className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/72 transition-all duration-200 hover:bg-white/6 hover:text-white" href="/features">
                Features
              </a>
              <a className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-white/72 transition-all duration-200 hover:bg-white/6 hover:text-white" href="/security">
                Security
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-white/52">
              <a className="inline-flex rounded-full border border-white/12 px-4 py-2 transition-all duration-200 hover:bg-white/6 hover:text-white" href="/about">
                X / Updates
              </a>
              <a className="inline-flex rounded-full border border-white/12 px-4 py-2 transition-all duration-200 hover:bg-white/6 hover:text-white" href="/pricing">
                LinkedIn
              </a>
              <a className="inline-flex rounded-full border border-white/12 px-4 py-2 transition-all duration-200 hover:bg-white/6 hover:text-white" href="/help">
                Support
              </a>
              <span>© DocMate 2026 • {t("footer.copyright", "Your PDF Editor")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
