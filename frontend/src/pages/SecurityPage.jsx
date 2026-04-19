import { useI18n } from "../lib/i18n";

const securityItems = [
  {
    title: "Protected accounts",
    description:
      "Passwords are not stored as plain text. The backend hashes them before saving user credentials.",
  },
  {
    title: "Session control",
    description:
      "Login sessions are stored separately from users and can be invalidated with logout.",
  },
  {
    title: "Document privacy",
    description:
      "Files are processed in temporary workspaces and are cleaned up after the response is returned.",
  },
  {
    title: "Access restrictions",
    description:
      "The API only accepts the expected file types per tool and validates request data before processing.",
  },
];

function SecurityPage() {
  const { t } = useI18n();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-700">
          {t("pages.securityEyebrow", "Security")}
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          {t("pages.securityTitle", "Built with safer document handling in mind")}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          {t("pages.securityDesc", "This workspace protects accounts, limits unsafe input, and processes documents in isolated temporary folders so your data flow stays predictable and easier to manage.")}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {securityItems.map((item) => (
            <article
              key={item.title}
              className="rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]"
            >
              <h2 className="text-2xl font-black tracking-tight text-slate-900">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default SecurityPage;
