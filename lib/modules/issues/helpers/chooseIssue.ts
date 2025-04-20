import { RedmineIssue } from "../../../types/RedmineIssue.js";

export async function chooseIssue(issues: RedmineIssue[]): Promise<RedmineIssue> {
  return await arg({
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
}
