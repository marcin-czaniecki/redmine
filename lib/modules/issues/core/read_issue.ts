import "@johnlindquist/kit";

import { convertTextileToMarkdown } from "../../../common/convert_textile_to_md.js";
import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { getIssue } from "../../../utils/getIssue.js";
import { getIssues } from "../../../utils/getIssues.js";
import { chooseIssue } from "../helpers/chooseIssue.js";
import { generateNote } from "../helpers/generateNote.js";

const issues = await getIssues();

const id = await chooseIssue(issues);
const issue = await getIssue(id);

const customFieldsRows =
  issue.custom_fields && issue.custom_fields.length ? issue.custom_fields.map((field) => `| **${field.name}:** | ${Array.isArray(field.value) ? field.value.join(", ") : field.value || "brak"} |  |  |`).join("\n") : "";

const formattedJournalNotes =
  issue.journals &&
  issue.journals
    .filter((journal) => journal.notes && journal.notes.at(0) != "!")
    .map(generateNote)
    .join("\n\n---\n");

const formattedIssueDetails = md(`
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

${formattedJournalNotes}
`);

await div({ height: 1000, html: formattedIssueDetails }, [
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
