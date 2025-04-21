/**
 * Convert basic Redmine Textile formatting to Markdown.
 * Handles headings, bold, links, images, inline code, code blocks, lists, blockquotes, and horizontal rules.
 */
export function convertTextileToMarkdown(text: string): string {
  let result = text;

  // Headings: h1. Heading -> # Heading, h2. -> ##, etc.
  for (let i = 6; i >= 1; i--) {
    const pattern = new RegExp(`^h${i}\\.\\s*(.*)$`, "gm");
    result = result.replace(pattern, (_, content) => "#".repeat(i) + " " + content);
  }

  // Bold: *bold* -> **bold**
  result = result.replace(/\*(?!\*)([^*]+)\*(?!\*)/g, "**$1**");

  // Inline code: @code@ -> `code`
  result = result.replace(/@([^@]+)@/g, "`$1`");

  // Zamiana {color:red}tekst{color} na <span style="color:red">tekst</span>
  result = result.replace(/\{color:([#\w]+)\}([\s\S]*?)\{color\}/g, (_m, color, content) => `<span style="color:${color}">${content}</span>`);

  // Zamiana {background-color:yellow}tekst{background-color} na <span style="background-color:yellow">tekst</span>
  result = result.replace(/\{background-color:([#\w]+)\}([\s\S]*?)\{background-color\}/g, (_m, color, content) => `<span style="background-color:${color}">${content}</span>`);

  // Remove unsupported Textile tags (e.g. {color}, {background-color})
  result = result.replace(/\{[^}]+\}/g, "");

  // Code blocks: bc. -> ``` (handle multi-line blocks)
  const lines = result.split(/\r?\n/);
  let inBlock = false;
  let newLines: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    const bcMatch = lines[i].match(/^bc\.\s*(.*)/);
    if (bcMatch) {
      newLines.push("```");
      if (bcMatch[1]) newLines.push(bcMatch[1]);
      inBlock = true;
      continue;
    }
    if (inBlock && (/^h[1-6]\.|^bq\.|^[-*#] |^$/.test(lines[i]) || i === lines.length - 1)) {
      newLines.push("```");
      inBlock = false;
    }
    newLines.push(lines[i]);
  }
  if (inBlock) newLines.push("```");
  result = newLines.join("\n");

  // Links: "text":url -> [text](url)
  result = result.replace(/"([^"]+)":(\S+)/g, "[$1]($2)");

  // Images: !url! or !alt!:url! -> ![alt](url)
  result = result.replace(/!(?:([^!:]+)!:)?(\S+)!/g, (_match, alt, url) => {
    const altText = alt?.trim() || "";
    return `![${altText}](${url})`;
  });

  // Nested lists: handle * and # at start of line, preserve indentation
  result = result.replace(/^(\s*)\*\s+/gm, "$1- ");
  result = result.replace(/^(\s*)#\s+/gm, "$11. ");

  // Blockquotes: bq. -> > (multi-line)
  result = result.replace(/^bq\.\s*(.*)$/gm, "> $1");

  // Horizontal rule: ---- -> ---
  result = result.replace(/^----+$/gm, "---");

  return result;
}
