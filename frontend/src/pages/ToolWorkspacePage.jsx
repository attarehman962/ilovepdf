import { useMemo, useRef, useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function ToolWorkspacePage({ tool }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    password: "",
    pages: "",
    order: "",
    text: "",
    degrees: "90",
    quality: "/ebook",
    startAt: "1",
    margin: "24",
    boxHeight: "28",
  });

  const formHints = useMemo(() => {
    const map = {
      "split-pdf": "Optional page ranges: 1-3,5,8",
      "organize-pdf": "Page order: 1,3,2,4",
      "watermark": "Watermark text",
      "sign-pdf": "Signature text",
      "edit-pdf": "Overlay text",
      "protect-pdf": "Password required",
      "unlock-pdf": "Password required for locked PDFs",
      "rotate-pdf": "Choose rotation degrees",
      "compress-pdf": "Choose compression quality",
      "page-numbers": "Start page number",
      "crop-pdf": "Crop margin in points",
      "redact-pdf": "Redaction band height",
    };
    return map[tool.slug] || "";
  }, [tool.slug]);

  const showField = (field) => {
    const fieldMap = {
      pages: ["split-pdf"],
      order: ["organize-pdf"],
      text: ["watermark", "sign-pdf", "edit-pdf"],
      password: ["protect-pdf", "unlock-pdf"],
      degrees: ["rotate-pdf"],
      quality: ["compress-pdf"],
      startAt: ["page-numbers"],
      margin: ["crop-pdf"],
      boxHeight: ["redact-pdf"],
    };
    return fieldMap[field]?.includes(tool.slug);
  };

  const onFilesChange = (event) => {
    const nextFiles = Array.from(event.target.files || []);
    setFiles(nextFiles);
    setError("");
    setSuccess("");
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!tool.supported) {
      setError("This tool page is ready, but the backend still needs extra local support for this action.");
      return;
    }

    if (files.length === 0) {
      setError("Please choose file first.");
      return;
    }

    setStatus("processing");

    try {
      const payload = new FormData();
      files.forEach((file) => payload.append("files", file));
      payload.append("options", JSON.stringify(form));

      const response = await fetch(`${apiBase}/api/tools/${tool.slug}/process`, {
        method: "POST",
        body: payload,
      });

      if (!response.ok) {
        let detail = "Processing failed.";
        try {
          const data = await response.json();
          detail = data.detail || detail;
        } catch {
          detail = await response.text();
        }
        throw new Error(detail);
      }

      const blob = await response.blob();
      const disposition = response.headers.get("content-disposition") || "";
      const match = disposition.match(/filename="?([^"]+)"?/i);
      const filename = match?.[1] || `${tool.slug}-result`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setSuccess("Your file is ready and the download has started.");
    } catch (submitError) {
      setError(submitError.message || "Something went wrong.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-[calc(100vh-81px)] bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.55),rgba(248,250,252,1)_55%)]">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
        <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-6xl">
          {tool.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 sm:text-2xl">
          {tool.description}
        </p>

        <form className="mt-10 w-full max-w-3xl" onSubmit={handleSubmit}>
          <div className="rounded-[32px] border border-slate-200 bg-white/70 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-col items-center gap-5">
              <input
                accept={tool.accept}
                className="hidden"
                multiple={tool.multiple}
                onChange={onFilesChange}
                ref={fileInputRef}
                type="file"
              />
              <button
                className="min-w-[300px] rounded-2xl bg-[#ef4335] px-10 py-6 text-2xl font-bold text-white shadow-[0_16px_40px_rgba(239,67,53,0.25)] transition hover:bg-[#de3022]"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                Select {tool.multiple ? "files" : "file"}
              </button>
              <p className="text-base text-slate-500">or drop files here</p>

              {files.length > 0 ? (
                <div className="w-full rounded-2xl bg-slate-50 p-4 text-left">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                    Selected Files
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    {files.map((file) => (
                      <div
                        key={`${file.name}-${file.size}`}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                      >
                        {file.name}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {formHints ? (
                <p className="text-sm font-medium text-slate-500">{formHints}</p>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {showField("pages") ? (
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  name="pages"
                  onChange={onFormChange}
                  placeholder="Pages like 1-3,5"
                  value={form.pages}
                />
              ) : null}

              {showField("order") ? (
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  name="order"
                  onChange={onFormChange}
                  placeholder="Order like 1,3,2,4"
                  value={form.order}
                />
              ) : null}

              {showField("text") ? (
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335] sm:col-span-2"
                  name="text"
                  onChange={onFormChange}
                  placeholder="Enter text"
                  value={form.text}
                />
              ) : null}

              {showField("password") ? (
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  name="password"
                  onChange={onFormChange}
                  placeholder="Password"
                  type="password"
                  value={form.password}
                />
              ) : null}

              {showField("degrees") ? (
                <select
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  name="degrees"
                  onChange={onFormChange}
                  value={form.degrees}
                >
                  <option value="90">90 degrees</option>
                  <option value="180">180 degrees</option>
                  <option value="270">270 degrees</option>
                </select>
              ) : null}

              {showField("quality") ? (
                <select
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  name="quality"
                  onChange={onFormChange}
                  value={form.quality}
                >
                  <option value="/screen">Screen</option>
                  <option value="/ebook">Ebook</option>
                  <option value="/printer">Printer</option>
                  <option value="/prepress">Prepress</option>
                </select>
              ) : null}

              {showField("startAt") ? (
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  min="1"
                  name="startAt"
                  onChange={onFormChange}
                  type="number"
                  value={form.startAt}
                />
              ) : null}

              {showField("margin") ? (
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  min="0"
                  name="margin"
                  onChange={onFormChange}
                  type="number"
                  value={form.margin}
                />
              ) : null}

              {showField("boxHeight") ? (
                <input
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#ef4335]"
                  min="1"
                  name="boxHeight"
                  onChange={onFormChange}
                  type="number"
                  value={form.boxHeight}
                />
              ) : null}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                className="rounded-2xl border border-slate-900 bg-slate-900 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={status === "processing"}
                type="submit"
              >
                {status === "processing" ? "Processing..." : `Process ${tool.title}`}
              </button>

              {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
              {success ? <p className="text-sm font-medium text-emerald-600">{success}</p> : null}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ToolWorkspacePage;

