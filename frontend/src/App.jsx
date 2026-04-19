import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import ImageEditorSection from "./components/ImageEditorSection";
import Navbar from "./components/Navbar";
import PremiumSection from "./components/PremiumSection";
import ToolsSection from "./components/ToolsSection";
import TrustSection from "./components/TrustSection";
import WorkSection from "./components/WorkSection";
import { toolBySlug } from "./lib/toolCatalog";
import ToolWorkspacePage from "./pages/ToolWorkspacePage";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <WorkSection />
      <PremiumSection />
      <ImageEditorSection />
      <TrustSection />
    </>
  );
}

function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const slug = pathname === "/" ? null : pathname.slice(1);
  const activeTool = slug ? toolBySlug[slug] : null;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      {activeTool ? <ToolWorkspacePage tool={activeTool} /> : <HomePage />}
      <Footer />
    </div>
  );
}

export default App;
