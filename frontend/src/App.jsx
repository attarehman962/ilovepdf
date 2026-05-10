import { useEffect, useMemo, useState, useCallback } from "react";

import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import ImageEditorSection from "./components/ImageEditorSection";
import Navbar from "./components/Navbar";
import PremiumSection from "./components/PremiumSection";
import ToolsSection from "./components/ToolsSection";
import TrustSection from "./components/TrustSection";
import { toolBySlug } from "./lib/toolCatalog";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import FeaturesPage from "./pages/FeaturesPage";
import HelpPage from "./pages/HelpPage";
import LanguagePage from "./pages/LanguagePage";
import PricingPage from "./pages/PricingPage";
import SecurityPage from "./pages/SecurityPage";
import ToolWorkspacePage from "./pages/ToolWorkspacePage";
import { applyPageMetadata } from "./lib/seo";
import { clearToken, fetchMe, getStoredToken, logout } from "./services/auth";

function HomePage({ user }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const handleFilterChange = useCallback((filter) => setActiveFilter(filter), []);

  return (
    <>
      <HeroSection activeFilter={activeFilter} onFilterChange={handleFilterChange} user={user} />
      <ToolsSection activeFilter={activeFilter} />
      <PremiumSection />
      <ImageEditorSection />
      <TrustSection />
    </>
  );
}

function NotFoundPage() {
  return (
    <main className="min-h-[60vh] bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-500">404</p>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          The page you requested is not available. Head back to the workspace and choose one of the PDF tools.
        </p>
        <a
          className="mt-8 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          href="/"
        >
          Go to homepage
        </a>
      </section>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const slug = pathname === "/" ? null : pathname.slice(1);
  const activeTool = slug ? toolBySlug[slug] : null;
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const isPricingPage = pathname === "/pricing";
  const isSecurityPage = pathname === "/security";
  const isFeaturesPage = pathname === "/features";
  const isAboutPage = pathname === "/about";
  const isHelpPage = pathname === "/help";
  const isLanguagePage = pathname === "/language";
  const isKnownStaticPage =
    pathname === "/" ||
    isAuthPage ||
    isPricingPage ||
    isSecurityPage ||
    isFeaturesPage ||
    isAboutPage ||
    isHelpPage ||
    isLanguagePage;
  const isNotFound = !isKnownStaticPage && !activeTool;
  const pageMetadata = useMemo(() => {
    if (activeTool) {
      return {
        title: activeTool.title,
        description: activeTool.description,
      };
    }

    if (pathname === "/login") {
      return {
        title: "Login",
        description: "Sign in to your PDF workspace to manage files, workflows, and secure document sessions.",
      };
    }

    if (pathname === "/signup") {
      return {
        title: "Create Account",
        description: "Create a secure account to save your PDF workflow preferences and manage document tools.",
      };
    }

    const routeMeta = {
      "/": {
        title: "Home",
        description:
          "Merge, split, compress, convert, protect, and edit PDF files in a responsive multilingual workspace.",
      },
      "/pricing": {
        title: "Pricing",
        description: "Compare Basic, Premium, and Business plans for document workflows and team productivity.",
      },
      "/security": {
        title: "Security",
        description: "Learn how the app protects accounts, sessions, uploads, and document processing flows.",
      },
      "/features": {
        title: "Features",
        description: "Explore PDF editing, conversion, workflow automation, OCR, summarization, and protection features.",
      },
      "/about": {
        title: "About",
        description: "See the product direction behind this PDF workspace and its global-first document experience.",
      },
      "/help": {
        title: "Help",
        description: "Follow a step-by-step guide for uploading files, configuring tools, and downloading results.",
      },
      "/language": {
        title: "Language",
        description: "Switch the interface language and use the workspace in a multilingual experience.",
      },
    };

    if (isNotFound) {
      return {
        title: "Page Not Found",
        description: "The page you requested could not be found in the PDF workspace.",
      };
    }

    return routeMeta[pathname] || routeMeta["/"];
  }, [activeTool, isNotFound, pathname]);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setAuthLoading(false);
      return;
    }

    let isActive = true;
    fetchMe(token)
      .then((me) => {
        if (isActive) {
          setUser(me);
        }
      })
      .catch(() => {
        clearToken();
        if (isActive) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isActive) {
          setAuthLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    applyPageMetadata(pageMetadata);
  }, [pageMetadata]);

  const handleLogout = async () => {
    const token = getStoredToken();
    try {
      await logout(token);
    } catch {
      // Ignore logout request failures and clear local session anyway.
    }
    clearToken();
    setUser(null);
    window.location.href = "/";
  };

  if (isAuthPage) {
    return (
      <AuthPage
        mode={pathname === "/signup" ? "signup" : "login"}
        onAuthSuccess={setUser}
      />
    );
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar authLoading={authLoading} onLogout={handleLogout} user={user} />
      <div className="page-shell" id="main-content">
        {isPricingPage ? (
          <PricingPage />
        ) : isSecurityPage ? (
          <SecurityPage />
        ) : isFeaturesPage ? (
          <FeaturesPage />
        ) : isAboutPage ? (
          <AboutPage />
        ) : isHelpPage ? (
          <HelpPage />
        ) : isLanguagePage ? (
          <LanguagePage />
        ) : isNotFound ? (
          <NotFoundPage />
        ) : activeTool ? (
          <ToolWorkspacePage tool={activeTool} />
        ) : (
          <HomePage user={user} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
