import { useMemo, useState } from "react";

import LogoBrand from "../components/LogoBrand";
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

function AuthField({
  autoComplete,
  minLength,
  name,
  onChange,
  placeholder,
  required = false,
  type = "text",
  value,
  label,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        autoComplete={autoComplete}
        className="w-full rounded-[14px] border border-[#deceb2] bg-[#fffdf9] px-4 py-3.5 text-base text-slate-900 outline-none placeholder:text-slate-400 transition-all duration-200 focus:border-[#1d1b22] focus:bg-white focus:shadow-[0_0_0_3px_rgba(29,27,34,0.06)]"
        minLength={minLength}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
      />
    </label>
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
          rightText: t("auth.signupRightText", "Join your DocMate workspace with a secure account."),
        }
      : {
          title: t("auth.loginTitle", "Login to your account"),
          submit: t("auth.loginSubmit", "Log in"),
          switchText: t("auth.loginSwitchText", "Don't have an account?"),
          switchLabel: t("auth.loginSwitchLabel", "Create an account"),
          switchHref: "/signup",
          image: "/home6.png",
          rightTitle: t("auth.loginRightTitle", "Log in to your workspace"),
          rightText: t("auth.loginRightText", "Enter your email and password to access your DocMate account."),
        };

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const socialButtons = useMemo(
    () => [
      { label: "Facebook", className: "bg-[#4267B2] text-white opacity-40 cursor-not-allowed" },
      { label: "Google", className: "border border-[#deceb2] bg-white text-slate-700 opacity-40 cursor-not-allowed" },
      { label: "SSO", className: "border border-[#deceb2] bg-white text-slate-700 opacity-40 cursor-not-allowed" },
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
          ? { name: form.name.trim(), email: form.email.trim(), password: form.password }
          : { email: form.email.trim(), password: form.password };

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
    <main className="grid min-h-screen bg-[#faf8f3] lg:grid-cols-[1.1fr_0.9fr]">
      {/* ── Left — form panel ── */}
      <section className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-[440px]">
          {/* Logo */}
          <a href="/" className="inline-flex items-center">
            <LogoBrand className="h-10 w-auto" />
          </a>

          <h1 className="mt-10 text-[2.2rem] font-extrabold tracking-[-0.04em] text-[#1d1b22]">
            {content.title}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {mode === "login"
              ? "Welcome back — enter your credentials to continue."
              : "Start your PDF workspace journey today."}
          </p>

          {/* Social buttons (disabled) */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {socialButtons.map((button) => (
              <button
                key={button.label}
                className={`inline-flex min-w-[110px] items-center justify-center rounded-[14px] px-4 py-2.5 text-sm font-semibold ${button.className}`}
                disabled
                title="Social login is not available yet"
                type="button"
              >
                {button.label}
              </button>
            ))}
          </div>

          <div className="my-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#eadcc0]" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">or continue with email</span>
            <span className="h-px flex-1 bg-[#eadcc0]" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {mode === "signup" ? (
              <AuthField
                autoComplete="name"
                label={t("auth.labels.name", "Full name")}
                minLength={2}
                name="name"
                onChange={onChange}
                placeholder={t("auth.placeholders.name", "Enter your name")}
                required
                value={form.name}
              />
            ) : null}

            <AuthField
              autoComplete="email"
              label={t("auth.labels.email", "Email address")}
              name="email"
              onChange={onChange}
              placeholder={t("auth.placeholders.email", "Enter your email")}
              required
              type="email"
              value={form.email}
            />
            <AuthField
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              label={t("auth.labels.password", "Password")}
              minLength={8}
              name="password"
              onChange={onChange}
              placeholder={t("auth.placeholders.password", "Password")}
              required
              type="password"
              value={form.password}
            />

            {mode === "login" ? (
              <p className="pt-1 text-right text-sm font-semibold text-slate-400 hover:text-slate-600 cursor-pointer transition-colors">
                {t("auth.forgotPassword", "Forgot your password?")}
              </p>
            ) : null}

            <div className="pt-2">
              <button
                className="w-full rounded-[14px] bg-[#1d1b22] px-6 py-3.5 text-base font-bold text-white shadow-[0_12px_24px_rgba(29,27,34,0.18)] transition-all duration-200 hover:-translate-y-px hover:bg-[#111015] hover:shadow-[0_16px_30px_rgba(29,27,34,0.24)] disabled:opacity-60 disabled:translate-y-0"
                disabled={status === "loading"}
                type="submit"
              >
                {status === "loading" ? t("auth.validation.loading", "Please wait...") : content.submit}
              </button>
            </div>

            {error ? (
              <p aria-live="polite" role="alert" className="rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-600">
                {error}
              </p>
            ) : null}
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            {content.switchText}{" "}
            <a className="font-bold text-[#1d1b22] underline underline-offset-2 transition-colors hover:text-[#ff2b63]" href={content.switchHref}>
              {content.switchLabel}
            </a>
          </p>
        </div>
      </section>

      {/* ── Right — visual panel ── */}
      <aside className="hidden bg-[#1d1b22] px-10 py-14 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <div className="max-w-[420px]">
          {/* Logo inverted */}
          <LogoBrand className="h-9 w-auto" inverted />

          <div className="mt-10 overflow-hidden rounded-[28px] bg-white/5 border border-white/10 px-7 py-8">
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-white leading-tight">
              {content.rightTitle}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/65">{content.rightText}</p>

            <div className="mt-8 space-y-3">
              {["30+ PDF tools in one workspace", "OCR, translate, summarize with AI", "Secure — files never stored permanently"].map((feat) => (
                <div key={feat} className="flex items-center gap-3 text-sm text-white/75">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff2b63]/20 text-[#ff2b63] text-xs font-black">✓</span>
                  {feat}
                </div>
              ))}
            </div>
          </div>

          <a
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/55 transition-colors hover:text-white/90"
            href="/"
          >
            {t("auth.allTools", "See all tools")} →
          </a>
        </div>
      </aside>
    </main>
  );
}

export default AuthPage;
