// utils/sanitizeHtml.ts
import DOMPurify from 'dompurify';

export function sanitizeHtml(dirty: string, options = {}) {
  return DOMPurify.sanitize(dirty, options);
}
