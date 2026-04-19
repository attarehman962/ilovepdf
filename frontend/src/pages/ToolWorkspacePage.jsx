import { useMemo, useRef, useState } from "react";

const apiBase = import.meta.env.VITE_API_BASE_URL || "";
const MAX_CLIENT_FILE_SIZE = 25 * 1024 * 1024;
const MAX_CLIENT_FILES = 5;

function tooManyFilesMessage() {
  return `You can process up to ${MAX_CLIENT_FILES} files only. Uploading more than ${MAX_CLIENT_FILES} files is forbidden.`;
}

function matchesAcceptedType(file, acceptedExtensions) {
  if (!acceptedExtensions.length) {
    return true;
  }

  const lowerName = file.name.toLowerCase();
  return acceptedExtensions.some((extension) => lowerName.endsWith(extension));
}

function ToolWorkspacePage({ tool }) {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState({
    password: "",
    pages: "",
    order: "",
    text: "",
    sourceLang: "auto",
    targetLang: "en",
    workflowJson:
      '[{"tool":"merge-pdf"},{"tool":"compress-pdf","options":{"quality":"/ebook"}}]',
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
      "translate-pdf": "Choose source and target languages",
      "create-workflow": "Use a JSON steps array to chain multiple processors",
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
      sourceLang: ["translate-pdf"],
      targetLang: ["translate-pdf"],
      workflowJson: ["create-workflow"],
    };
    return fieldMap[field]?.includes(tool.slug);
  };

  const acceptList = Array.isArray(tool.accept)
    ? tool.accept.map((item) => item.toLowerCase())
    : String(tool.accept || "")
        .split(",")
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean);

  const validateFiles = (nextFiles) => {
    if (!nextFiles.length) {
      throw new Error("Please choose at least one file.");
    }

    if (nextFiles.length > MAX_CLIENT_FILES) {
      throw new Error(tooManyFilesMessage());
    }

    if (!tool.multiple && nextFiles.length > 1) {
      throw new Error(`${tool.title} accepts only one file at a time.`);
    }

    for (const file of nextFiles) {
      if (file.size <= 0) {
        throw new Error(`${file.name} is empty.`);
      }
      if (file.size > MAX_CLIENT_FILE_SIZE) {
        throw new Error(`${file.name} is larger than 25 MB.`);
      }
      if (!matchesAcceptedType(file, acceptList)) {
        throw new Error(`${file.name} is not an accepted file type for ${tool.title}.`);
      }
    }
  };

  const applySelectedFiles = (nextFiles) => {
    validateFiles(nextFiles);
    setFiles(nextFiles);
    setError("");
    setSuccess("");
  };

  const onFilesChange = (event) => {
    const nextFiles = Array.from(event.target.files || []);

    try {
      applySelectedFiles(nextFiles);
    } catch (selectionError) {
      const message = selectionError.message || "Invalid files selected.";
      setError(message);
      if (message.includes("forbidden")) {
        window.alert(message);
      }
      setFiles([]);
    }
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    try {
      applySelectedFiles(Array.from(event.dataTransfer.files || []));
    } catch (selectionError) {
      const message = selectionError.message || "Invalid files selected.";
      setError(message);
      if (message.includes("forbidden")) {
        window.alert(message);
      }
      setFiles([]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!tool.supported) {
      setError("This tool page is ready, but the backend still needs extra local support for this action.");
      return;
    }

    try {
      validateFiles(files);
    } catch (validationError) {
      setError(validationError.message || "Please choose valid files.");
      return;
    }

    if (tool.slug === "create-workflow") {
      try {
        JSON.parse(form.workflowJson);
      } catch {
        setError("Workflow JSON must be valid before running the workflow.");
        return;
      }
    }

    setStatus("processing");

    try {
      const payload = new FormData();
      files.forEach((file) => payload.append("files", file));
      const requestOptions = { ...form };

      if (tool.slug === "create-workflow") {
        requestOptions.workflow = form.workflowJson;
      }

      payload.append("options", JSON.stringify(requestOptions));

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
      const message =
        submitError instanceof TypeError
          ? "Request could not reach the backend. Make sure the Python API is running on port 8000."
          : submitError.message || "Something went wrong.";
      setError(message);
    } finally {
      setStatus("idle");
    }
  };

  return (
    <main className="min-h-[calc(100vh-81px)] bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.55),rgba(248,250,252,1)_55%)]">
      <section className="mx-auto flex max-w-5xl flex-col items-center px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">
        <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
          {tool.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 sm:text-xl">
          {tool.description}
        </p>

        <form className="mt-10 w-full max-w-3xl" onSubmit={handleSubmit}>
          <div className="rounded-[32px] border border-slate-200 bg-white/70 p-4 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
            <div className="flex flex-col items-center gap-5">
              <input
                accept={tool.accept}
                className="hidden"
                multiple={tool.multiple}
                onChange={onFilesChange}
                ref={fileInputRef}
                type="file"
              />
              <div
                className={`w-full rounded-[28px] border-2 border-dashed px-4 py-8 transition sm:px-6 ${
                  dragActive
                    ? "border-slate-900 bg-slate-100"
                    : "border-slate-200 bg-slate-50/80"
                }`}
                onDragEnter={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(event) => {
                  event.preventDefault();
                  if (event.currentTarget.contains(event.relatedTarget)) {
                    return;
                  }
                  setDragActive(false);
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragActive(true);
                }}
                onDrop={onDrop}
              >
                <button
                  className="w-full rounded-2xl bg-slate-900 px-6 py-5 text-xl font-bold text-white shadow-[0_16px_40px_rgba(15,23,42,0.18)] transition hover:bg-slate-800 sm:min-w-[300px] sm:text-2xl"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  Select {tool.multiple ? "files" : "file"}
                </button>
                <p className="mt-4 text-sm text-slate-500 sm:text-base">or drop files here</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  Up to {MAX_CLIENT_FILES} files only • 25 MB each
                </p>
              </div>

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
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <span className="truncate font-semibold">{file.name}</span>
                          <span className="text-xs text-slate-500">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                        </div>
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
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  name="pages"
                  onChange={onFormChange}
                  placeholder="Pages like 1-3,5"
                  value={form.pages}
                />
              ) : null}

              {showField("order") ? (
                <input
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  name="order"
                  onChange={onFormChange}
                  placeholder="Order like 1,3,2,4"
                  value={form.order}
                />
              ) : null}

              {showField("text") ? (
                <input
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 sm:col-span-2"
                  name="text"
                  onChange={onFormChange}
                  placeholder="Enter text"
                  value={form.text}
                />
              ) : null}

              {showField("password") ? (
                <input
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  name="password"
                  onChange={onFormChange}
                  placeholder="Password"
                  type="password"
                  value={form.password}
                />
              ) : null}

              {showField("sourceLang") ? (
                <input
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  name="sourceLang"
                  onChange={onFormChange}
                  placeholder="Source language like auto or es"
                  value={form.sourceLang}
                />
              ) : null}

              {showField("targetLang") ? (
                <input
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  name="targetLang"
                  onChange={onFormChange}
                  placeholder="Target language like en or fr"
                  value={form.targetLang}
                />
              ) : null}

              {showField("degrees") ? (
                <select
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
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
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
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
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  min="1"
                  name="startAt"
                  onChange={onFormChange}
                  type="number"
                  value={form.startAt}
                />
              ) : null}

              {showField("margin") ? (
                <input
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  min="0"
                  name="margin"
                  onChange={onFormChange}
                  type="number"
                  value={form.margin}
                />
              ) : null}

              {showField("boxHeight") ? (
                <input
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                  min="1"
                  name="boxHeight"
                  onChange={onFormChange}
                  type="number"
                  value={form.boxHeight}
                />
              ) : null}

              {showField("workflowJson") ? (
                <textarea
                  className="min-h-40 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900 sm:col-span-2"
                  name="workflowJson"
                  onChange={onFormChange}
                  value={form.workflowJson}
                />
              ) : null}
            </div>

            <div className="mt-6 flex flex-col items-center gap-3">
              <button
                className="w-full rounded-2xl border border-slate-900 bg-slate-900 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                disabled={status === "processing"}
                type="submit"
              >
                {status === "processing" ? "Processing..." : `Process ${tool.title}`}
              </button>

              {error ? <p className="text-sm font-medium text-slate-700">{error}</p> : null}
              {success ? <p className="text-sm font-medium text-slate-900">{success}</p> : null}
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ToolWorkspacePage;
