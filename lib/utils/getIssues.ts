import { RedmineIssue } from "../types/RedmineIssue.js";
import { getRedmineUrl } from "../common/getRedmineUrl.js";
import { getRedmine } from "../common/requestRedmine.js";

export async function getIssues(user_id: number | string = "me") {
  const query = new URLSearchParams({
    assigned_to_id: user_id.toString(),
    limit: `100`,
  });

  const url = `${await getRedmineUrl()}/issues.json?${query.toString()}`;

  return (await getRedmine<{ issues: RedmineIssue[] }>(url)).data.issues;
}
