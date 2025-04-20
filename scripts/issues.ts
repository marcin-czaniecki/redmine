// Name: Zagadnienia Redmine

import "@johnlindquist/kit";

import { getRedmineUrl } from "../lib/common/getRedmineUrl.js";
import { chooseIssue } from "../lib/modules/issues/helpers/chooseIssue.js";
import { RedmineIssue } from "../lib/types/RedmineIssue.js";
import { getIssue } from "../lib/utils/getIssue.js";
import { getIssues } from "../lib/utils/getIssues.js";

const issues = await getIssues();

const choosedIssue: RedmineIssue = await chooseIssue(issues);
const issue = await getIssue(choosedIssue.id);

await div(
  md(`
## [#${issue.id}](${await getRedmineUrl()}/issues/${issue.id}) ${issue.subject}

|  |  |
|----------|-------|
| **Projekt:** | ${issue.project.name} |
| **Priorytet:** | ${issue.priority.name} |
| **Status:** | ${issue.status.name} |


---

**Opis:**
${issue.description || "brak opisu"}

${issue.notes && issue.notes.map((note) => JSON.stringify(note)).join("\n\n---\n\n")}

|  |  |
|----------|-------|
| **Typ:** | ${issue.tracker.name} |
| **Przydzielony do:** | ${issue.assigned_to?.name || "brak"} |
| **Autor:** | ${issue.author?.name || "brak"} |
| **Data rozpoczęcia:** | ${issue.start_date} |
| **Data zakończenia:** | ${issue.due_date || "brak"} |
| **Procent ukończenia:** | ${issue.done_ratio}% |
| **Szacowane godziny:** | ${issue.estimated_hours ?? "brak"} |
| **Wydane godziny:** | ${issue.spent_hours ?? "brak"} |
| **Utworzono:** | ${issue.created_on} |
| **Zaktualizowano:** | ${issue.updated_on} |
`),
  [
    {
      name: "Dodaj notatkę",
    },
  ]
);
