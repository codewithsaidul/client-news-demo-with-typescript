import sanitizeHtmlRaw from "sanitize-html";
import DOMPurify from "dompurify";

// 1️⃣ Step 1: Transform <a> tags using sanitize-html
function transformHtmlWithTargetBlank(html: string) {
  return sanitizeHtmlRaw(html, {
    allowedTags: false, // allow all tags at this point
    allowedAttributes: false,
    transformTags: {
      a: (tagName: string, attribs: Record<string, string>) => {
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            target: "_blank",
            rel: "noopener noreferrer",
          },
        };
      },
    },
  });
}

// 2️⃣ Step 2: Sanitize with DOMPurify for extra security
export function sanitizeHtml(html: string) {
  const transformed = transformHtmlWithTargetBlank(html);
  return DOMPurify.sanitize(transformed, {
    ALLOWED_TAGS: ["a", "p", "b", "i", "ul", "ol", "li", "strong", "em", "img", "h1", "h2", "h3", "br", "table", "thead", "tbody", "th", "tr", "td"],
    ALLOWED_ATTR: ["href", "src", "alt", "width", "height", "style", "target", "rel"],
  });
}
