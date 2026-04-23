import { useEffect, useState } from "react";

const STATUS_MESSAGES = [
  "Reading your file…",
  "Validating content…",
  "Applying changes…",
  "Rendering pages…",
  "Optimizing output…",
  "Almost done…",
  "Finalizing result…",
];

function SpinnerRing({ color = "bg-slate-900" }) {
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <div className="absolute h-20 w-20 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      <div className={`h-8 w-8 rounded-full ${color} opacity-90`} />
    </div>
  );
}

function ProcessingOverlay({ tool, onCancel }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    const msgTimer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 2200);
    const elapsedTimer = setInterval(() => {
      setElapsed((s) => s + 1);
    }, 1000);
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 88) return p;
        const step = p < 40 ? 6 : p < 70 ? 3 : 1;
        return Math.min(88, p + step);
      });
    }, 400);
    return () => {
      clearInterval(msgTimer);
      clearInterval(elapsedTimer);
      clearInterval(progressTimer);
    };
  }, []);

  const toolColor = tool?.color || "bg-slate-800";

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/96 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label={`Processing ${tool?.title ?? "file"}`}
    >
      <div className="flex w-full max-w-md flex-col items-center gap-8 px-6 text-center">
        <SpinnerRing color={toolColor} />

        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
            Processing
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
            {tool?.title ?? "Your file"}
          </h2>
        </div>

        <div className="w-full">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 min-h-[1.5rem] text-sm font-medium text-slate-500">
            {STATUS_MESSAGES[messageIndex]}
          </p>
        </div>

        <p className="text-xs text-slate-400">
          {elapsed < 5
            ? "This usually takes a few seconds"
            : elapsed < 30
            ? `${elapsed}s elapsed — still working…`
            : `${elapsed}s elapsed — large files take longer`}
        </p>

        {onCancel && (
          <button
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}

export default ProcessingOverlay;
