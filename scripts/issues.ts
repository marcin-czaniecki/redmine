// Name: Zagadnienia Redmine

import "@johnlindquist/kit";

import { getIssues } from "../lib/utils/getIssues.js";
import { getRedmineUrl } from "../lib/common/getRedmineUrl.js";
import { getIssue } from "../lib/utils/getIssue.js";
import { RedmineIssue } from "../lib/types/RedmineIssue.js";

const issues = await getIssues();

const choosedIssue: RedmineIssue = await arg({
  placeholder: "Wybierz zadanie",
  choices: issues
    .sort((a, b) => {
      const priorityA = a.priority.id;
      const priorityB = b.priority.id;

      // Sort by priority (higher priority ID first)
      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Descending order by priority
      }
      // If priorities are the same, sort by ID for consistent ordering
      return a.id - b.id;
    })
    .map((issue) => {
      return {
        name: `[${issue.id}] ${issue?.subject}`,
        description: `${issue.priority.name}, ${issue.status.name}, ${issue.project.name}`,
        value: issue,
      };
    }),
});

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
