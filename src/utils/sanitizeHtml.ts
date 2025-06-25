// utils/sanitizeHtml.ts
import DOMPurify from 'dompurify';

export function sanitizeHtml(dirty: string) {
  return DOMPurify.sanitize(dirty);
}
