function LogoBrand({ className = "h-9 w-auto", inverted = false }) {
  const textPrimary = inverted ? "#ffffff" : "#1d1b22";
  const textMuted = inverted ? "rgba(255,255,255,0.65)" : "#57525f";
  const iconBg = inverted ? "#ffffff" : "#1d1b22";
  const pageFill = inverted ? "#1d1b22" : "#ffffff";
  const lineFill = inverted ? "#ffffff" : "#1d1b22";

  return (
    <svg
      aria-label="DocMate"
      className={className}
      fill="none"
      overflow="visible"
      viewBox="0 0 152 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── Icon badge ── */}
      <rect height="40" rx="11" width="40" fill={iconBg} />

      {/* Page with dog-ear fold */}
      <polygon fill={pageFill} points="9,6 19,6 25,12 25,30 9,30" />

      {/* Red fold triangle */}
      <polygon fill="#ff2b63" opacity="0.92" points="19,6 25,12 19,12" />

      {/* Content lines */}
      <rect fill={lineFill} height="1.5" opacity="0.22" rx="0.75" width="8" x="12" y="17" />
      <rect fill={lineFill} height="1.5" opacity="0.16" rx="0.75" width="11.5" x="12" y="21" />
      <rect fill={lineFill} height="1.5" opacity="0.16" rx="0.75" width="9.5" x="12" y="25" />

      {/* Mate dot — red companion accent */}
      <circle cx="31" cy="33.5" fill="#ff2b63" r="3.2" />

      {/* ── Wordmark ── */}
      <text
        fill={textPrimary}
        style={{
          fontFamily: "'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif",
          fontSize: "20px",
          fontWeight: "800",
          letterSpacing: "-0.5px",
        }}
        x="50"
        y="26"
      >
        Doc
      </text>
      <text
        fill={textMuted}
        style={{
          fontFamily: "'Plus Jakarta Sans','Segoe UI',system-ui,sans-serif",
          fontSize: "20px",
          fontWeight: "400",
          letterSpacing: "-0.3px",
        }}
        x="91"
        y="26"
      >
        Mate
      </text>
    </svg>
  );
}

export default LogoBrand;
