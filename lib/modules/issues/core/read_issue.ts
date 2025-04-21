import "@johnlindquist/kit";

import { convertTextileToMarkdown } from "../../../common/convert_textile_to_md.js";
import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { getIssue } from "../../../utils/getIssue.js";
import { getIssues } from "../../../utils/getIssues.js";
import { chooseIssue } from "../helpers/chooseIssue.js";
import { RedmineExtendedIssue } from "../../../types/RedmineExtendedIssue.js";

const issues = await getIssues();

const id = await chooseIssue(issues);
const issue = await getIssue(id);

await editor(JSON.stringify(issue));

// Generowanie wierszy dla custom_fields
const customFieldsRows =
  issue.custom_fields && issue.custom_fields.length ? issue.custom_fields.map((field) => `| **${field.name}:** | ${Array.isArray(field.value) ? field.value.join(", ") : field.value || "brak"} |  |  |`).join("\n") : "";

function generateNote(journal: RedmineExtendedIssue["journals"][number]) {
  const createdDate = new Date(journal.created_on);
  const now = new Date("2025-04-20T00:00:00Z");
  const diffTime = now.getTime() - createdDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return `
<h4 class="text-yellow-500">Uaktualnione przez ${journal.user.name} ${diffDays} dni temu</h4>\n
<div style="padding: 15px; border-radius: 15px; background-color: #ffffff11">${convertTextileToMarkdown(journal.notes)}</div>`;
}

const notes =
  issue.journals &&
  issue.journals
    .filter((journal) => journal.notes && journal.notes.at(0) != "!")
    .map(generateNote)
    .join("\n\n---\n");

const result = md(`
# [#${issue.id}](${await getRedmineUrl()}/issues/${issue.id}) ${issue.subject}\n\n

|                 |                        |                         |                                       |
|-----------------|------------------------|-------------------------|---------------------------------------|
| **Status:**     | ${issue.status.name}   | **Przepracowany czas:** | ${issue.spent_hours ?? "brak"}h       |
| **Priorytet:**  | ${issue.priority.name} | **Przypisany do:**      | ${issue.assigned_to?.name || "brak"}  |
| **Projekt:**    | ${issue.project.name}  | **Utworzono:**          | ${issue.created_on}                   |
${customFieldsRows ? customFieldsRows + "\n" : ""}

---

## Opis

${convertTextileToMarkdown(issue.description) || "brak opisu"}

---

|                         |                                       |                         |                                       |
|-------------------------|---------------------------------------|-------------------------|---------------------------------------|
| **Autor:**              | ${issue.author?.name || "brak"}       | **Zaktualizowano:**     | ${issue.updated_on}                   |
| **Typ:**                | ${issue.tracker.name}                 | **Szacowane godziny:**  | ${issue.estimated_hours ?? "brak"}    |
| **Data rozpoczęcia:**   | ${issue.start_date}                   | **Procent ukończenia:** | ${issue.done_ratio}%                  |
| **Data zakończenia:**   | ${issue.due_date || "brak"}           | -                       | -                                     |

---

## Notatki

${notes}
`);

await div({ height: 1000, html: result }, [
  {
    name: "Zmień status",
    onAction: async () => {
      await run("./edit_issue_status.ts", id.toString());
    },
  },
  {
    name: "Dodaj notatkę",
    onAction: async () => {
      await run("./add_note.ts", id.toString());
    },
  },
  {
    name: "Edytuj tytuł",
    onAction: async () => {
      await run("./edit_issue_subject.ts", id.toString());
    },
  },
  {
    name: "Edytuj opis",
    onAction: async () => {
      await run("./edit_issue_description.ts", id.toString());
    },
  },
  {
    name: "Zmień piorytet",
    onAction: async () => {
      await run("./edit_issue_priority.ts", id.toString());
    },
  },
]);
