//Name: Dodaj czas Redmine
// Description: Dodanie do zadania czas pracy przez Redmine API

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

await editor(JSON.stringify(issue, null, 2));

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

// Obsługa klawiszy
onKeydown(async (event) => {});

// let multipleChoice = await grid("Select one or more developer", [
//   {
//     name: "John",
//     onSubmit: async () => {
//       await div("działa?");
//     },
//   },
//   "Nghia",
//   "Mindy",
//   "Joy",
// ]);

/*
   {
      "id": 49272,
      "project": {
        "id": 399,
        "name": "Pracownia Oprogramowania PO"
      },
      "tracker": {
        "id": 18,
        "name": "Zadanie"
      },
      "status": {
        "id": 2,
        "name": "W toku",
        "is_closed": false
      },
      "priority": {
        "id": 3,
        "name": "Niski"
      },
      "author": {
        "id": 278,
        "name": "Marcin Czaniecki"
      },
      "assigned_to": {
        "id": 278,
        "name": "Marcin Czaniecki"
      },
      "subject": "Kurs \"Total TypeScript\"",
      "description": "Link: https://www.totaltypescript.com/workshops\r\n\r\nZbiór profesjonalnych, opartych na ćwiczeniach, dogłębnych warsztatów *TypeScript*, które pozwolą osiągnąć mistrzostwo w posługiwaniu się tym językiem.\r\n\r\n\r\nKurs kupiony z własnych środków.",
      "start_date": "2024-09-09",
      "due_date": null,
      "done_ratio": 30,
      "is_private": false,
      "estimated_hours": null,
      "total_estimated_hours": null,
      "spent_hours": 30,
      "total_spent_hours": 30,
      "custom_fields": [
        {
          "id": 12,
          "name": "projekt_SAP",
          "value": ""
        },
        {
          "id": 75,
          "name": "Sprawdzający",
          "multiple": true,
          "value": []
        }
      ],
      "created_on": "2024-09-09T12:15:48Z",
      "updated_on": "2024-11-12T10:03:02Z",
      "closed_on": null
    },
    */
// toast("Hello from Script Kit!", {
//   autoClose: 3000, // close after 3 seconds
//   pauseOnFocusLoss: false,
// });

// const result = await arg(
//   {
//     placeholder: "Pick one in under 3 seconds or I'll pick one for you",
//     onInit: async () => {
//       await wait(3000);
//       submit("broccoli"); //forces a submission
//     },
//   },
//   ["cookie", "donut"]
// );

// // Wait for 1 second
// await editor(result);

// let multipleChoice = await grid("Select one or more developer", [
//   {
//     name: "John",
//     onSubmit: async () => {
//       await div("działa?");
//     },
//   },
//   "Nghia",
//   "Mindy",
//   "Joy",
// ]);
