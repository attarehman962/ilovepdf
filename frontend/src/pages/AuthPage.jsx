import { useMemo, useState } from "react";

import { useI18n } from "../lib/i18n";
import { login, signup, storeToken } from "../services/auth";

function isStrongPassword(password) {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  );
}

function AuthPage({ mode = "login", onAuthSuccess }) {
  const { t } = useI18n();
  const content =
    mode === "signup"
      ? {
          title: t("auth.signupTitle", "Create your account"),
          submit: t("auth.signupSubmit", "Sign up"),
          switchText: t("auth.signupSwitchText", "Already have an account?"),
          switchLabel: t("auth.signupSwitchLabel", "Log in"),
          switchHref: "/login",
          image: "/premium.webp",
          rightTitle: t("auth.signupRightTitle", "Create your workspace"),
          rightText: t("auth.signupRightText", "Join your PDF workspace with a secure account."),
        }
      : {
          title: t("auth.loginTitle", "Login to your account"),
          submit: t("auth.loginSubmit", "Log in"),
          switchText: t("auth.loginSwitchText", "Don't have an account?"),
          switchLabel: t("auth.loginSwitchLabel", "Create an account"),
          switchHref: "/signup",
          image: "/home6.png",
          rightTitle: t("auth.loginRightTitle", "Log in to your workspace"),
          rightText: t("auth.loginRightText", "Enter your email and password to access your iLovePDF account."),
        };
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const socialButtons = useMemo(
    () => [
      { label: "Facebook", className: "bg-[#4267B2] text-white" },
      { label: "Google", className: "border border-slate-300 bg-white text-slate-700" },
      { label: "SSO", className: "border border-slate-300 bg-white text-slate-700" },
    ],
    [],
  );

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    if (mode === "signup" && form.name.trim().length < 2) {
      setError(t("auth.validation.name", "Name must be at least 2 characters."));
      setStatus("idle");
      return;
    }

    if (!form.email.trim()) {
      setError(t("auth.validation.email", "Email is required."));
      setStatus("idle");
      return;
    }

    if (mode === "signup" && !isStrongPassword(form.password)) {
      setError("Password must include uppercase, lowercase, number, and special character.");
      setStatus("idle");
      return;
    }

    if (mode === "login" && form.password.length < 8) {
      setError(t("auth.validation.password", "Password must be at least 8 characters."));
      setStatus("idle");
      return;
    }

    try {
      const payload =
        mode === "signup"
          ? {
              name: form.name.trim(),
              email: form.email.trim(),
              password: form.password,
            }
          : {
              email: form.email.trim(),
              password: form.password,
            };

      const response = mode === "signup" ? await signup(payload) : await login(payload);
      storeToken(response.token);
      onAuthSuccess?.(response.user);
      window.location.href = "/";
    } catch (submitError) {
      setError(submitError.message || "Authentication failed.");
      setStatus("idle");
      return;
    }

    setStatus("idle");
  };

  return (
    <main className="grid min-h-screen bg-white lg:grid-cols-[1.15fr_0.85fr]">
      <section className="flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[474px]">
          <a className="inline-flex items-center gap-1 text-5xl font-black tracking-tight text-slate-950" href="/">
            <span>I</span>
            <span className="text-slate-950">❤</span>
            <span>PDF</span>
          </a>

          <h1 className="mt-8 text-[2.55rem] font-black tracking-tight text-slate-800">
            {content.title}
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            {socialButtons.map((button) => (
              <button
                key={button.label}
                className={`inline-flex min-w-[136px] items-center justify-center rounded-xl px-5 py-3 text-lg font-bold transition hover:scale-[1.02] ${button.className}`}
                type="button"
              >
                {button.label}
              </button>
            ))}
          </div>

          <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <input
                className="w-full rounded-md border border-slate-400 px-4 py-4 text-lg outline-none transition focus:border-slate-900"
                minLength={2}
                name="name"
                onChange={onChange}
                autoComplete="name"
                placeholder={t("auth.placeholders.name", "Enter your name")}
                required
                value={form.name}
              />
            ) : null}

            <input
              className="w-full rounded-md border border-slate-400 px-4 py-4 text-lg outline-none transition focus:border-slate-900"
              name="email"
              onChange={onChange}
              autoComplete="email"
              placeholder={t("auth.placeholders.email", "Enter your email")}
              required
              type="email"
              value={form.email}
            />
            <input
              className="w-full rounded-md border border-slate-400 px-4 py-4 text-lg outline-none transition focus:border-slate-900"
              minLength={8}
              name="password"
              onChange={onChange}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              placeholder={t("auth.placeholders.password", "Password")}
              required
              type="password"
              value={form.password}
            />

            {mode === "login" ? (
              <a className="block pt-1 text-center text-lg font-semibold text-slate-900 underline" href="/login">
                {t("auth.forgotPassword", "Forgot your password?")}
              </a>
            ) : null}

            <div className="pt-4 text-center">
              <button
                className="inline-flex rounded-xl bg-slate-900 px-8 py-4 text-xl font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                disabled={status === "loading"}
                type="submit"
              >
                {status === "loading" ? t("auth.validation.loading", "Please wait...") : content.submit}
              </button>
            </div>

            {error ? (
              <p className="pt-2 text-center text-sm font-semibold text-slate-700">{error}</p>
            ) : null}
          </form>

          <p className="mt-6 text-center text-[1.1rem] text-slate-600">
            {content.switchText}{" "}
            <a className="font-semibold text-slate-900 underline" href={content.switchHref}>
              {content.switchLabel}
            </a>
          </p>
        </div>
      </section>

      <aside className="hidden bg-[#f4f5fc] px-10 py-16 lg:flex lg:items-center lg:justify-center">
        <div className="max-w-[500px]">
          <div className="overflow-hidden rounded-[32px]">
            <img
              alt={content.rightTitle}
              className="h-auto w-full object-cover"
              src={content.image}
            />
          </div>
          <h2 className="mt-10 text-5xl font-black tracking-tight text-slate-800">
            {content.rightTitle}
          </h2>
          <p className="mt-5 text-2xl leading-10 text-slate-600">{content.rightText}</p>
          <a className="mt-8 inline-flex text-xl font-bold text-slate-700" href="/">
            {t("auth.allTools", "See all tools")} ↓
          </a>
        </div>
      </aside>
    </main>
  );
}

export default AuthPage;
