/**
 * Custom HTML sanitizer for kudo messages.
 * Zero dependencies, Cloudflare Workers compatible.
 *
 * Allowlist: b, i, s, ol, li, a, blockquote, p, br
 * Only `href` attribute preserved on <a> tags.
 * All other tags and attributes are stripped.
 */

const ALLOWED_TAGS = new Set(["b", "i", "s", "ol", "li", "a", "blockquote", "p", "br"]);

/**
 * Sanitize HTML by stripping disallowed tags and attributes.
 * Keeps only the 8 allowed formatting tags from TipTap output.
 */
export function sanitizeKudoHtml(html: string): string {
  // Replace all HTML tags — keep allowed, strip the rest
  return html.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*\/?>/gi, (match, tagName: string) => {
    const tag = tagName.toLowerCase();

    if (!ALLOWED_TAGS.has(tag)) {
      return "";
    }

    // Closing tags — keep as-is (no attributes)
    if (match.startsWith("</")) {
      return `</${tag}>`;
    }

    // Self-closing <br> or <br/>
    if (tag === "br") {
      return "<br>";
    }

    // For <a>, preserve only href attribute
    if (tag === "a") {
      const hrefMatch = match.match(/href="([^"]*?)"/i);
      if (hrefMatch) {
        const href = hrefMatch[1]
          .replace(/javascript:/gi, "")
          .replace(/data:/gi, "")
          .replace(/vbscript:/gi, "");
        return `<a href="${href}">`;
      }
      return "<a>";
    }

    // All other allowed tags — strip all attributes
    return `<${tag}>`;
  });
}
