import "@johnlindquist/kit";

import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { putRedmine } from "../../../common/requestRedmine.js";
import { chooseIssue } from "../helpers/chooseIssue.js";
import { getIssue } from "../../../utils/getIssue.js";

const id = await chooseIssue();
const issue = await getIssue(id);

const subject = await arg({
  placeholder: "Wprowadź nowy tytuł",
  hint: issue.subject,
});

putRedmine(`${await getRedmineUrl()}/issues/${id}.json`, {
  issue: { subject },
});

await run("./read_issue.ts", id.toString());
