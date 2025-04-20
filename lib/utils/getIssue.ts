import { RedmineExtendedIssue } from "../types/RedmineExtendedIssue.js";
import { getRedmineUrl } from "../common/getRedmineUrl.js";
import { getRedmine } from "../common/requestRedmine.js";

export async function getIssue(issue_id: number | string) {
  const query = new URLSearchParams({
    include: "journals",
  });
  const url = `${await getRedmineUrl()}/issues/${issue_id}.json?${query.toString()}`;

  return (
    (await getRedmine(url)) as {
      data: {
        issue: RedmineExtendedIssue;
      };
    }
  ).data.issue;
}
