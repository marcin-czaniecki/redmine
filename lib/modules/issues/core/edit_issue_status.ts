import "@johnlindquist/kit";

import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { putRedmine } from "../../../common/requestRedmine.js";
import { chooseIssue } from "../helpers/chooseIssue.js";
import { statusLevels } from "../helpers/statusLevels.js";

const id = await chooseIssue();

const status_id = await arg({
  placeholder: "Wybierz status",
  choices: statusLevels,
});

putRedmine(`${await getRedmineUrl()}/issues/${id}.json`, {
  issue: {
    status_id,
  },
});

await run("./read_issue.ts", id.toString());
