import "@johnlindquist/kit";

import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { putRedmine } from "../../../common/requestRedmine.js";
import { chooseIssue } from "../helpers/chooseIssue.js";

const id = await chooseIssue();

const notes = await editor({
  headers: ["Tytuł", "Opis"],
  footer: `Wciśnij cmd+s żeby kontynuować...`,
});

putRedmine(`${await getRedmineUrl()}/issues/${id}.json`, {
  issue: {
    notes,
  },
});

await run("./read_issue.ts", id.toString());
