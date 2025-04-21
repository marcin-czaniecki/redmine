import "@johnlindquist/kit";

import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { putRedmine } from "../../../common/requestRedmine.js";
import { chooseIssue } from "../helpers/chooseIssue.js";
import { getIssue } from "../../../utils/getIssue.js";

const id = await chooseIssue();
const issue = await getIssue(id);

const description = await editor({
  value: issue.description || "",
  footer: `Wciśnij cmd+s żeby kontynuować...`,
});

putRedmine(`${await getRedmineUrl()}/issues/${id}.json`, {
  issue: {
    description,
  },
});

await run("./read_issue.ts", id.toString());
