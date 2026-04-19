const navLinks = [
  { label: "Merge PDF", href: "/merge-pdf" },
  { label: "Split PDF", href: "/split-pdf" },
  { label: "Compress PDF", href: "/compress-pdf" },
  { label: "Convert PDF", href: "/" },
  { label: "All PDF Tools", href: "/" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a className="flex items-center gap-1 text-2xl font-black tracking-tight text-slate-950" href="/">
            <span>I</span>
            <span className="text-[#ef4335]">❤</span>
            <span>PDF</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className="text-sm font-semibold uppercase tracking-[0.04em] text-slate-700 transition hover:text-[#ef4335]"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a className="hidden text-sm font-semibold text-slate-700 hover:text-slate-950 sm:inline-flex" href="/">
            Login
          </a>
          <a
            className="inline-flex rounded-xl bg-[#ef4335] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#db2f21]"
            href="/"
          >
            Sign up
          </a>
          <button
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            type="button"
          >
            <span className="text-xl leading-none">⋮</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
