function ensureMeta(selector, createAttributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(createAttributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    document.head.appendChild(element);
  }
  return element;
}

export function applyPageMetadata({ title, description }) {
  const fullTitle = title ? `${title} | iLovePDF Workspace` : "iLovePDF Workspace";
  document.title = fullTitle;

  ensureMeta('meta[name="description"]', { name: "description" }).setAttribute("content", description);
  ensureMeta('meta[property="og:title"]', { property: "og:title" }).setAttribute("content", fullTitle);
  ensureMeta('meta[property="og:description"]', { property: "og:description" }).setAttribute("content", description);
  ensureMeta('meta[name="twitter:title"]', { name: "twitter:title" }).setAttribute("content", fullTitle);
  ensureMeta('meta[name="twitter:description"]', { name: "twitter:description" }).setAttribute("content", description);
}
