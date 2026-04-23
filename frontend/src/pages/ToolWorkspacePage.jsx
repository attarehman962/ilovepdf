import { useCallback, useMemo, useRef, useState } from "react";
import ProcessingOverlay from "../components/ProcessingOverlay";

const apiBase = import.meta.env.VITE_API_BASE_URL || "";
const MAX_CLIENT_FILE_SIZE = 25 * 1024 * 1024;
const MAX_CLIENT_FILES = 5;

// ─── shared option lists ──────────────────────────────────────────────────────

const FONT_OPTIONS = [
  { value: "helvetica", label: "Helvetica" },
  { value: "times",     label: "Times New Roman" },
  { value: "courier",   label: "Courier" },
];

const WATERMARK_POSITIONS = [
  { value: "diagonal",      label: "Diagonal (across page)" },
  { value: "center",        label: "Center" },
  { value: "top",           label: "Top Center" },
  { value: "bottom",        label: "Bottom Center" },
  { value: "top-left",      label: "Top Left" },
  { value: "top-right",     label: "Top Right" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "bottom-right",  label: "Bottom Right" },
];

const SIGN_POSITIONS = [
  { value: "bottom-right",  label: "Bottom Right" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "top-right",     label: "Top Right" },
  { value: "top-center",    label: "Top Center" },
  { value: "top-left",      label: "Top Left" },
];

const PAGE_NUMBER_POSITIONS = [
  { value: "bottom-right",  label: "Bottom Right" },
  { value: "bottom-center", label: "Bottom Center" },
  { value: "bottom-left",   label: "Bottom Left" },
  { value: "top-right",     label: "Top Right" },
  { value: "top-center",    label: "Top Center" },
  { value: "top-left",      label: "Top Left" },
];

const COMPRESS_QUALITIES = [
  { value: "/screen",   label: "Screen — smallest file (72 dpi)" },
  { value: "/ebook",    label: "Ebook — balanced (150 dpi)" },
  { value: "/printer",  label: "Printer — high quality (300 dpi)" },
  { value: "/prepress", label: "Prepress — maximum quality" },
];

const ROTATE_DEGREES = [
  { value: "90",  label: "90° clockwise" },
  { value: "180", label: "180° (flip)" },
  { value: "270", label: "270° (90° counter-clockwise)" },
];

const LANG_OPTIONS = [
  { value: "auto", label: "Auto detect" },
  { value: "en",   label: "English" },
  { value: "es",   label: "Spanish" },
  { value: "fr",   label: "French" },
  { value: "de",   label: "German" },
  { value: "it",   label: "Italian" },
  { value: "pt",   label: "Portuguese" },
  { value: "ar",   label: "Arabic" },
  { value: "zh",   label: "Chinese (Simplified)" },
  { value: "ja",   label: "Japanese" },
  { value: "ko",   label: "Korean" },
  { value: "ru",   label: "Russian" },
  { value: "hi",   label: "Hindi" },
  { value: "ur",   label: "Urdu" },
  { value: "nl",   label: "Dutch" },
  { value: "pl",   label: "Polish" },
  { value: "tr",   label: "Turkish" },
  { value: "vi",   label: "Vietnamese" },
  { value: "th",   label: "Thai" },
  { value: "id",   label: "Indonesian" },
];

// ─── per-tool form schema ─────────────────────────────────────────────────────
// Each field: { name, label, type, placeholder, options, min, max, step,
//               defaultValue, required, maxLength, hint, fullWidth, condition }
// condition(form) → bool: show this field only when true

const TOOL_CONFIG = {
  "merge-pdf": {
    hint: "Upload multiple PDFs. They will be merged in the order you select them.",
    fields: [],
  },
  "split-pdf": {
    hint: "Leave the page range blank to extract every page as its own file.",
    fields: [
      {
        name: "pages",
        label: "Page range (optional)",
        type: "text",
        placeholder: "e.g. 1-3,5,8  — leave blank to split all",
        hint: "Use commas and hyphens: 1-3,5,8",
        maxLength: 200,
      },
    ],
  },
  "compress-pdf": {
    hint: "Ebook is the best balance between quality and file size.",
    fields: [
      {
        name: "quality",
        label: "Compression level",
        type: "select",
        options: COMPRESS_QUALITIES,
        defaultValue: "/ebook",
      },
    ],
  },
  "pdf-to-word":       { hint: "Text and structure will be extracted from each page.", fields: [] },
  "pdf-to-powerpoint": { hint: "Each PDF page becomes a slide.", fields: [] },
  "pdf-to-excel":      { hint: "Each line of text becomes a row in the spreadsheet.", fields: [] },
  "word-to-pdf":       { hint: "DOC and DOCX are both accepted.", fields: [] },
  "powerpoint-to-pdf": { hint: "PPT and PPTX are both accepted.", fields: [] },
  "excel-to-pdf":      { hint: "XLS and XLSX are both accepted.", fields: [] },
  "pdf-to-jpg":        {
    hint: "Every page will be exported as a JPG image inside a ZIP archive.",
    fields: [
      {
        name: "dpi",
        label: "Image quality (DPI)",
        type: "select",
        options: [
          { value: "72",  label: "72 dpi — screen / web" },
          { value: "144", label: "144 dpi — balanced (default)" },
          { value: "200", label: "200 dpi — good quality" },
          { value: "300", label: "300 dpi — print quality" },
        ],
        defaultValue: "144",
      },
    ],
  },
  "jpg-to-pdf": { hint: "Upload multiple images to combine them into one PDF.", fields: [] },
  "scan-to-pdf": { hint: "Upload scanned image files to create a searchable PDF.", fields: [] },
  "html-to-pdf": { hint: "Upload an .html or .htm file to convert it to PDF.", fields: [] },
  "pdf-to-pdfa": { hint: "Produces an archival-compliant PDF/A format.", fields: [] },
  "repair-pdf":  { hint: "Attempts to recover pages from a damaged PDF.", fields: [] },
  "ai-summarizer": { hint: "Extracts and scores the most relevant sentences from your document.", fields: [] },

  "edit-pdf": {
    hint: "Overlay any text anywhere on every page of the PDF.",
    fields: [
      {
        name: "text",
        label: "Overlay text",
        type: "text",
        placeholder: "Text to stamp on the PDF",
        required: true,
        maxLength: 300,
        fullWidth: true,
      },
      { name: "font",     label: "Font",      type: "select", options: FONT_OPTIONS,  defaultValue: "helvetica" },
      { name: "fontSize", label: "Font size", type: "number", min: 6, max: 72,        defaultValue: "14" },
      { name: "color",    label: "Color",     type: "color",                          defaultValue: "#111111" },
      {
        name: "position",
        label: "Position",
        type: "select",
        options: [
          { value: "bottom-right",  label: "Bottom Right" },
          { value: "bottom-center", label: "Bottom Center" },
          { value: "bottom-left",   label: "Bottom Left" },
          { value: "center",        label: "Center" },
          { value: "top",           label: "Top Center" },
          { value: "top-right",     label: "Top Right" },
          { value: "top-left",      label: "Top Left" },
        ],
        defaultValue: "bottom-right",
      },
      {
        name: "opacity",
        label: "Opacity (0.1 – 1.0)",
        type: "range",
        min: 0.1,
        max: 1.0,
        step: 0.05,
        defaultValue: "1.0",
        displayPercent: true,
      },
    ],
  },

  "watermark": {
    hint: "Stamp text across every page. Adjust color, font, size, transparency, and placement.",
    fields: [
      {
        name: "text",
        label: "Watermark text",
        type: "text",
        placeholder: "e.g. CONFIDENTIAL",
        required: true,
        maxLength: 200,
        fullWidth: true,
      },
      { name: "font",     label: "Font",       type: "select", options: FONT_OPTIONS,        defaultValue: "helvetica" },
      { name: "fontSize", label: "Font size",  type: "number", min: 8, max: 120,             defaultValue: "42" },
      { name: "color",    label: "Text color", type: "color",                                defaultValue: "#CC0000" },
      {
        name: "opacity",
        label: "Opacity (0.05 – 1.0)",
        type: "range",
        min: 0.05,
        max: 1.0,
        step: 0.05,
        defaultValue: "0.25",
        displayPercent: true,
      },
      { name: "position", label: "Position",   type: "select", options: WATERMARK_POSITIONS, defaultValue: "diagonal" },
      {
        name: "rotation",
        label: "Rotation angle (°)",
        type: "number",
        min: -360,
        max: 360,
        defaultValue: "35",
        hint: "Applies when position is diagonal or center.",
      },
    ],
  },

  "sign-pdf": {
    hint: "Place your signature text on every page of the document.",
    fields: [
      {
        name: "text",
        label: "Signature text",
        type: "text",
        placeholder: "e.g. John Doe",
        required: true,
        maxLength: 120,
        fullWidth: true,
      },
      { name: "font",     label: "Font",       type: "select", options: FONT_OPTIONS, defaultValue: "helvetica" },
      { name: "fontSize", label: "Font size",  type: "number", min: 6, max: 72,       defaultValue: "18" },
      { name: "color",    label: "Ink color",  type: "color",                         defaultValue: "#1a1aff" },
      { name: "position", label: "Position",   type: "select", options: SIGN_POSITIONS, defaultValue: "bottom-right" },
    ],
  },

  "rotate-pdf": {
    hint: "Optionally restrict rotation to specific pages only.",
    fields: [
      { name: "degrees", label: "Rotation", type: "select", options: ROTATE_DEGREES, defaultValue: "90" },
      {
        name: "pages",
        label: "Pages to rotate (optional)",
        type: "text",
        placeholder: "e.g. 1-3,5  — leave blank for all pages",
        maxLength: 200,
        hint: "Leave blank to rotate every page.",
      },
    ],
  },

  "protect-pdf": {
    hint: "The PDF will be encrypted with AES-256. Keep your password safe — it cannot be recovered.",
    fields: [
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "At least 4 characters",
        required: true,
        maxLength: 128,
      },
      {
        name: "confirmPassword",
        label: "Confirm password",
        type: "password",
        placeholder: "Re-enter password",
        required: true,
        maxLength: 128,
        frontendOnly: true,
      },
    ],
  },

  "unlock-pdf": {
    hint: "Enter the current password to remove PDF protection.",
    fields: [
      {
        name: "password",
        label: "Current PDF password",
        type: "password",
        placeholder: "Enter the PDF password",
        required: true,
        maxLength: 128,
      },
    ],
  },

  "organize-pdf": {
    hint: "Reorder pages by specifying each page number separated by commas.",
    fields: [
      {
        name: "order",
        label: "New page order",
        type: "text",
        placeholder: "e.g. 3,1,2,4",
        required: true,
        maxLength: 500,
        fullWidth: true,
        hint: "List every page number in the order you want them to appear.",
      },
    ],
  },

  "page-numbers": {
    hint: "Page numbers are stamped on every page. Start at any number.",
    fields: [
      {
        name: "startAt",
        label: "Start numbering at",
        type: "number",
        min: 1,
        max: 9999,
        defaultValue: "1",
      },
      { name: "position", label: "Position",  type: "select", options: PAGE_NUMBER_POSITIONS, defaultValue: "bottom-right" },
      { name: "font",     label: "Font",       type: "select", options: FONT_OPTIONS,          defaultValue: "helvetica" },
      { name: "fontSize", label: "Font size",  type: "number", min: 6, max: 36,                defaultValue: "12" },
      { name: "color",    label: "Number color", type: "color",                                defaultValue: "#222222" },
    ],
  },

  "crop-pdf": {
    hint: "Removes equal margins from all four sides of every page.",
    fields: [
      {
        name: "margin",
        label: "Crop margin (pt)",
        type: "number",
        min: 0,
        max: 200,
        defaultValue: "24",
        hint: "1 pt ≈ 0.35 mm. A4 pages are 595 × 842 pt.",
      },
    ],
  },

  "redact-pdf": {
    hint: "Applies a solid black box at a fixed position on each page to hide sensitive content.",
    fields: [
      {
        name: "boxHeight",
        label: "Box height (pt)",
        type: "number",
        min: 4,
        max: 400,
        defaultValue: "28",
      },
      {
        name: "yPosition",
        label: "Distance from top (pt)",
        type: "number",
        min: 0,
        max: 2000,
        defaultValue: "80",
        hint: "0 = top edge of page.",
      },
      {
        name: "xMargin",
        label: "Side margin (pt)",
        type: "number",
        min: 0,
        max: 200,
        defaultValue: "40",
        hint: "Left and right padding for the redaction box.",
      },
      {
        name: "pages",
        label: "Pages to redact (optional)",
        type: "text",
        placeholder: "e.g. 1,3-5  — leave blank for all",
        maxLength: 200,
      },
    ],
  },

  "compare-pdf": {
    hint: "Upload exactly two PDFs. The output is a unified text diff.",
    fields: [],
  },

  "ocr-pdf": {
    hint: "Extracts text using OCR and embeds it as a hidden text layer in the output PDF.",
    fields: [],
  },

  "translate-pdf": {
    hint: "Extracts page text and translates it. Best with text-based (non-scanned) PDFs.",
    fields: [
      {
        name: "sourceLang",
        label: "Source language",
        type: "select",
        options: LANG_OPTIONS,
        defaultValue: "auto",
      },
      {
        name: "targetLang",
        label: "Target language",
        type: "select",
        options: LANG_OPTIONS.filter((l) => l.value !== "auto"),
        defaultValue: "en",
      },
    ],
  },

  "create-workflow": {
    hint: "Chain multiple tools in sequence. Each step receives the output of the previous one.",
    fields: [
      {
        name: "workflowJson",
        label: "Workflow steps (JSON)",
        type: "textarea",
        placeholder: '[{"tool":"merge-pdf"},{"tool":"compress-pdf","options":{"quality":"/ebook"}}]',
        required: true,
        fullWidth: true,
        hint: 'Array of objects with "tool" and optional "options" keys.',
      },
    ],
  },
};

// ─── build initial form state from config ────────────────────────────────────

function buildInitialForm(slug) {
  const config = TOOL_CONFIG[slug] || { fields: [] };
  const state = {
    password: "",
    confirmPassword: "",
    pages: "",
    order: "",
    text: "",
    sourceLang: "auto",
    targetLang: "en",
    workflowJson: '[{"tool":"merge-pdf"},{"tool":"compress-pdf","options":{"quality":"/ebook"}}]',
    degrees: "90",
    quality: "/ebook",
    startAt: "1",
    margin: "24",
    boxHeight: "28",
    yPosition: "80",
    xMargin: "40",
    dpi: "144",
    font: "helvetica",
    fontSize: "14",
    color: "#111111",
    opacity: "1.0",
    position: "bottom-right",
    rotation: "35",
  };
  for (const field of config.fields) {
    if (field.defaultValue !== undefined) {
      state[field.name] = field.defaultValue;
    }
  }
  return state;
}

// ─── per-tool validation ──────────────────────────────────────────────────────

function validateToolForm(slug, form) {
  const config = TOOL_CONFIG[slug];
  if (!config) return null;

  for (const field of config.fields) {
    if (field.frontendOnly && field.name === "confirmPassword") continue;
    if (field.required && !(form[field.name] || "").toString().trim()) {
      return `${field.label} is required.`;
    }
    if (field.maxLength && (form[field.name] || "").length > field.maxLength) {
      return `${field.label} must be ${field.maxLength} characters or fewer.`;
    }
  }

  if (slug === "protect-pdf") {
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match.";
    }
    if (form.password.length < 4) {
      return "Password must be at least 4 characters.";
    }
  }

  if (slug === "create-workflow") {
    try {
      const parsed = JSON.parse(form.workflowJson);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return "Workflow must be a non-empty JSON array.";
      }
      if (parsed.length > 10) {
        return "A workflow can contain at most 10 steps.";
      }
      for (const step of parsed) {
        if (!step.tool) return 'Each step must have a "tool" key.';
        if (step.tool === "create-workflow") return "Nested workflows are not allowed.";
      }
    } catch {
      return "Workflow JSON is invalid. Check your syntax.";
    }
  }

  if (slug === "compare-pdf") {
    return null;
  }

  return null;
}

// ─── file helpers ─────────────────────────────────────────────────────────────

function matchesAccept(file, acceptList) {
  if (!acceptList.length) return true;
  return acceptList.some((ext) => file.name.toLowerCase().endsWith(ext));
}

function validateFiles(files, tool) {
  if (!files.length) throw new Error("Please choose at least one file.");
  if (files.length > MAX_CLIENT_FILES)
    throw new Error(`You can upload up to ${MAX_CLIENT_FILES} files.`);
  if (!tool.multiple && files.length > 1)
    throw new Error(`${tool.title} accepts only one file at a time.`);
  if (tool.slug === "compare-pdf" && files.length !== 2)
    throw new Error("Compare PDF requires exactly 2 files.");

  const acceptList = Array.isArray(tool.accept)
    ? tool.accept.map((e) => e.toLowerCase())
    : String(tool.accept || "")
        .split(",")
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);

  for (const file of files) {
    if (file.size <= 0) throw new Error(`${file.name} is empty.`);
    if (file.size > MAX_CLIENT_FILE_SIZE)
      throw new Error(`${file.name} exceeds the 25 MB limit.`);
    if (!matchesAccept(file, acceptList))
      throw new Error(`${file.name} is not an accepted file type for ${tool.title}.`);
  }
}

// ─── sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ label, hint }) {
  return (
    <div className="mb-1">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      {hint && <span className="ml-2 text-xs text-slate-400">{hint}</span>}
    </div>
  );
}

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-800 focus:ring-1 focus:ring-slate-200";

function FormField({ field, value, onChange }) {
  const handleChange = (e) =>
    onChange({ target: { name: field.name, value: e.target.value } });

  if (field.type === "select") {
    return (
      <div className={field.fullWidth ? "sm:col-span-2" : ""}>
        <FieldLabel label={field.label} />
        <select className={inputClass} name={field.name} value={value} onChange={onChange}>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "range") {
    const pct = field.displayPercent
      ? ` (${Math.round(parseFloat(value || field.defaultValue || 0) * 100)}%)`
      : "";
    return (
      <div className={field.fullWidth ? "sm:col-span-2" : ""}>
        <FieldLabel label={`${field.label}${pct}`} />
        <input
          className="mt-1 w-full accent-slate-900"
          max={field.max}
          min={field.min}
          name={field.name}
          step={field.step || 0.01}
          type="range"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  if (field.type === "color") {
    return (
      <div>
        <FieldLabel label={field.label} />
        <div className="flex items-center gap-3">
          <input
            className="h-10 w-14 cursor-pointer rounded-xl border border-slate-200 p-0.5"
            name={field.name}
            type="color"
            value={value}
            onChange={onChange}
          />
          <span className="text-sm font-mono text-slate-600">{value}</span>
        </div>
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={field.fullWidth ? "sm:col-span-2" : ""}>
        <FieldLabel label={field.label} hint={field.hint} />
        <textarea
          className={`${inputClass} min-h-36 font-mono text-xs`}
          name={field.name}
          placeholder={field.placeholder || ""}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  if (field.type === "password") {
    return (
      <div className={field.fullWidth ? "sm:col-span-2" : ""}>
        <FieldLabel label={field.label} />
        <input
          autoComplete={field.name === "confirmPassword" ? "new-password" : "current-password"}
          className={inputClass}
          maxLength={field.maxLength}
          name={field.name}
          placeholder={field.placeholder || ""}
          required={field.required}
          type="password"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div className={field.fullWidth ? "sm:col-span-2" : ""}>
      <FieldLabel label={field.label} hint={field.hint} />
      <input
        className={inputClass}
        maxLength={field.maxLength}
        min={field.min}
        max={field.max}
        name={field.name}
        placeholder={field.placeholder || ""}
        required={field.required}
        step={field.step}
        type={field.type || "text"}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

function ToolWorkspacePage({ tool }) {
  const fileInputRef = useRef(null);
  const abortRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | processing | done | error
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState(() => buildInitialForm(tool.slug));

  const config = useMemo(() => TOOL_CONFIG[tool.slug] || { hint: "", fields: [] }, [tool.slug]);

  const acceptList = useMemo(() => {
    return Array.isArray(tool.accept)
      ? tool.accept.map((e) => e.toLowerCase())
      : String(tool.accept || "")
          .split(",")
          .map((e) => e.trim().toLowerCase())
          .filter(Boolean);
  }, [tool.accept]);

  const applyFiles = useCallback(
    (nextFiles) => {
      validateFiles(nextFiles, tool);
      setFiles(nextFiles);
      setError("");
      setSuccess("");
    },
    [tool],
  );

  const onFilesChange = (event) => {
    try {
      applyFiles(Array.from(event.target.files || []));
    } catch (err) {
      setError(err.message);
      setFiles([]);
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    try {
      applyFiles(Array.from(event.dataTransfer.files || []));
    } catch (err) {
      setError(err.message);
      setFiles([]);
    }
  };

  const removeFile = (index) => {
    setFiles((current) => current.filter((_, i) => i !== index));
    setError("");
    setSuccess("");
  };

  const onFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleCancel = () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setStatus("idle");
    setError("Processing was cancelled.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!tool.supported) {
      setError("Backend support for this tool is not yet available.");
      return;
    }

    try {
      validateFiles(files, tool);
    } catch (err) {
      setError(err.message);
      return;
    }

    const formError = validateToolForm(tool.slug, form);
    if (formError) {
      setError(formError);
      return;
    }

    setStatus("processing");
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const payload = new FormData();
      files.forEach((file) => payload.append("files", file));

      const requestOptions = { ...form };
      delete requestOptions.confirmPassword;
      delete requestOptions.workflowJson;
      if (tool.slug === "create-workflow") {
        requestOptions.workflow = form.workflowJson;
      }
      payload.append("options", JSON.stringify(requestOptions));

      const response = await fetch(`${apiBase}/api/tools/${tool.slug}/process`, {
        method: "POST",
        body: payload,
        signal: controller.signal,
      });

      if (!response.ok) {
        let detail = `Server error ${response.status}`;
        try {
          const data = await response.json();
          detail = data.detail || detail;
        } catch {
          detail = (await response.text()) || detail;
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

      setStatus("done");
      setSuccess(`Done! ${filename} has been downloaded.`);
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }
      const message =
        err instanceof TypeError
          ? "Could not reach the backend. Make sure the Python API is running on port 8000."
          : err.message || "Something went wrong.";
      setError(message);
      setStatus("error");
    }
  };

  const isProcessing = status === "processing";

  return (
    <>
      {isProcessing && <ProcessingOverlay tool={tool} onCancel={handleCancel} />}

      <main className="min-h-[calc(100vh-81px)] bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.55),rgba(248,250,252,1)_55%)]">
        <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">

          {/* Tool header */}
          <div className="flex flex-col items-center gap-3">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${tool.color || "bg-slate-800"} text-xl font-black text-white shadow-lg`}
            >
              {String(tool.symbol || "").slice(0, 3)}
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              {tool.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              {tool.description}
            </p>
          </div>


          <form className="mt-10 w-full" onSubmit={handleSubmit}>
            <div className="rounded-[32px] border border-slate-200 bg-white/70 p-5 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">

              {/* Upload area */}
              <input
                accept={tool.accept}
                className="hidden"
                multiple={tool.multiple}
                onChange={onFilesChange}
                ref={fileInputRef}
                type="file"
              />

              <div
                className={`rounded-[24px] border-2 border-dashed px-4 py-8 text-center transition sm:px-6 ${
                  dragActive ? "border-slate-900 bg-slate-100" : "border-slate-200 bg-slate-50/80"
                }`}
                onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={(e) => { e.preventDefault(); if (!e.currentTarget.contains(e.relatedTarget)) setDragActive(false); }}
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDrop={onDrop}
              >
                <button
                  className="mx-auto block rounded-2xl bg-slate-900 px-8 py-4 text-lg font-bold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:bg-slate-800 sm:text-xl"
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                >
                  Select {tool.multiple ? "files" : "file"}
                </button>
                <p className="mt-3 text-sm text-slate-500">or drag and drop here</p>
                <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                  {acceptList.join(", ")} · up to {MAX_CLIENT_FILES} files · 25 MB each
                  {tool.slug === "compare-pdf" ? " · exactly 2 files" : ""}
                </p>
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-left">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-400">
                    {files.length} file{files.length > 1 ? "s" : ""} selected
                  </p>
                  <div className="mt-3 space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={`${file.name}-${file.size}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5"
                      >
                        <span className="truncate text-sm font-semibold text-slate-700">
                          {file.name}
                        </span>
                        <div className="flex shrink-0 items-center gap-3">
                          <span className="text-xs text-slate-400">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </span>
                          <button
                            aria-label={`Remove ${file.name}`}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-xs text-slate-400 transition hover:bg-slate-100 hover:text-red-600"
                            onClick={() => removeFile(index)}
                            type="button"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tool hint */}
              {config.hint && (
                <p className="mt-4 text-center text-sm text-slate-500">{config.hint}</p>
              )}

              {/* Tool-specific form fields */}
              {config.fields.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {config.fields.map((field) => (
                    <FormField
                      key={field.name}
                      field={field}
                      value={form[field.name] ?? field.defaultValue ?? ""}
                      onChange={onFormChange}
                    />
                  ))}
                </div>
              )}

              {/* Submit */}
              <div className="mt-6 flex flex-col items-center gap-3">
                <button
                  className={`rounded-2xl px-8 py-3 text-base font-bold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    status === "done"
                      ? "bg-green-700 hover:bg-green-800"
                      : "bg-slate-900 hover:bg-slate-800"
                  }`}
                  disabled={isProcessing || files.length === 0}
                  type="submit"
                >
                  {status === "done"
                    ? "Process again"
                    : isProcessing
                    ? "Processing…"
                    : `Process ${tool.title}`}
                </button>

                {error && (
                  <div
                    aria-live="polite"
                    role="alert"
                    className="flex max-w-md items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <span className="mt-0.5 shrink-0 text-base">⚠</span>
                    <span className="font-medium">{error}</span>
                  </div>
                )}

                {success && !error && (
                  <div
                    aria-live="polite"
                    className="flex max-w-md items-start gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
                  >
                    <span className="mt-0.5 shrink-0 text-base">✓</span>
                    <span className="font-medium">{success}</span>
                  </div>
                )}
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default ToolWorkspacePage;
