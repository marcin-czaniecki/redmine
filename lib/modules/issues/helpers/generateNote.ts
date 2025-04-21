import { convertTextileToMarkdown } from "../../../common/convert_textile_to_md.js";
import { RedmineExtendedIssue } from "../../../types/RedmineExtendedIssue.js";

export function generateNote(journal: RedmineExtendedIssue["journals"][number]) {
  const createdDate = new Date(journal.created_on);
  const now = new Date(); // Użyj aktualnej daty
  createdDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  const diffTime = now.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let when = "";
  if (diffDays === 0) {
    when = "dzisiaj";
  } else if (diffDays === 1) {
    when = "wczoraj";
  } else {
    when = `${diffDays} dni temu`;
  }
  return `
  <h4 class="text-yellow-500">Uaktualnione przez ${journal.user.name} ${when}</h4>\n
  <div style="padding: 15px; border-radius: 15px; background-color: #ffffff11">${convertTextileToMarkdown(journal.notes)}</div>`;
}
