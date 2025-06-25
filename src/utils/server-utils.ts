import { convert } from 'html-to-text';

export const stripHtmlOnServer = (html: string) => {
  if (!html) {
    return "";
  }
  return convert(html, {
    wordwrap: false, // Optional: prevents line breaks
    selectors: [
      { selector: 'a', options: { ignoreHref: true } }, // Optional: ignores links
      { selector: 'img', format: 'skip' } // Optional: removes images completely
    ]
  });
};