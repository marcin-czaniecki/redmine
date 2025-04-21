import { convertTextileToMarkdown } from "../../../common/convert_textile_to_md.js";
import { RedmineExtendedIssue } from "../../../types/RedmineExtendedIssue.js";

export function generateNote(journal: RedmineExtendedIssue["journals"][number]) {
  const createdDate = new Date(journal.created_on);
  const now = new Date("2025-04-20T00:00:00Z");
  const diffTime = now.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return `
  <h4 class="text-yellow-500">Uaktualnione przez ${journal.user.name} ${diffDays} dni temu</h4>\n
  <div style="padding: 15px; border-radius: 15px; background-color: #ffffff11">${convertTextileToMarkdown(journal.notes)}</div>`;
}
