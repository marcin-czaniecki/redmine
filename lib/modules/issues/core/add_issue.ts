import "@johnlindquist/kit";

import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { getRedmine, postRedmine } from "../../../common/requestRedmine.js";
import { RedmineMembership } from "../../../types/RedmineMembership.js";
import { RedmineProject } from "../../../types/RedmineProject.js";
import { priorityLevels } from "../helpers/priorityLevels.js";
import { RedmineIssue } from "../../../types/RedmineIssue.js";

const redmineUrl = await getRedmineUrl();

async function getAllProjects(): Promise<RedmineProject[]> {
  const url = `${redmineUrl}/projects.json`;
  let offset = 0;
  const limit = 100;
  let total_count = 0;
  let allProjects: RedmineProject[] = [];

  do {
    const { data } = await getRedmine<{ projects: RedmineProject[]; total_count: number; offset: number; limit: number }>(url, {
      params: { limit, offset },
    });
    allProjects = allProjects.concat(data.projects);
    total_count = data.total_count;
    offset += limit;
  } while (allProjects.length < total_count);

  return allProjects;
}

const projects = await getAllProjects();

const project: RedmineProject = await arg({
  placeholder: "Wybierz projekt",
  choices: projects.map((project) => {
    return {
      name: `[${project.id}] ${project.name}`,
      value: project,
      description: project.description,
    };
  }),
});

const project_id = project.id;

const {
  data: { memberships },
} = await getRedmine<{ memberships: RedmineMembership[] }>(`${redmineUrl}/projects/${project_id}/memberships.json`, {});

const subject = await arg("Wprowadź tytuł");
const description = await editor({
  language: "md",
  footer: `Wprowadź opis`,
});

const priority_id = await arg({
  placeholder: "Wybierz priorytet",
  choices: priorityLevels,
});

const assigned_to_id = await arg({
  placeholder: "Wybierz priorytet",
  choices: memberships.map((membership) => {
    return {
      name: membership.user.name,
      value: membership.user.id,
    };
  }),
});

try {
  const result = await postRedmine<{ issue: RedmineIssue }>(`${redmineUrl}/issues.json`, {
    issue: {
      tracker_id: 18,
      project_id,
      subject,
      description,
      priority_id,
      assigned_to_id,
    },
  });

  if (result.status === 201) {
    await run("./read_issue.ts", result.data.issue.id.toString());
  }
} catch (error) {
  await div(md(`# Wystąpił problem:\n\n ${error?.message}`));
}
