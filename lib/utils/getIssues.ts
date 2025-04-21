import { RedmineIssue } from "../types/RedmineIssue.js";
import { getRedmineUrl } from "../common/getRedmineUrl.js";
import { getRedmine } from "../common/requestRedmine.js";

export async function getIssues(assigned_to_id?: number | string | null, author_id?: number | string | null) {
  const query = new URLSearchParams({ limit: "100" });
  assigned_to_id && query.set("assigned_to_id", assigned_to_id.toString());
  author_id && query.set("author_id", author_id.toString());

  const url = `${await getRedmineUrl()}/issues.json?${query.toString()}`;

  return (await getRedmine<{ issues: RedmineIssue[] }>(url)).data.issues;
}
