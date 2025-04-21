import "@johnlindquist/kit";

import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { putRedmine } from "../../../common/requestRedmine.js";
import { chooseIssue } from "../helpers/chooseIssue.js";
import { priorityLevels } from "../helpers/priorityLevels.js";

const id = await chooseIssue();

const priority_id = await arg({
  placeholder: "Wybierz priorytet",
  choices: priorityLevels,
});

putRedmine(`${await getRedmineUrl()}/issues/${id}.json`, {
  issue: {
    priority_id,
  },
});

await run("./read_issue.ts", id.toString());
