import "@johnlindquist/kit";

import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { getUserId } from "../../../common/getUserId.js";
import { inputDate } from "../../../common/inputDate.js";
import { postRedmine } from "../../../common/requestRedmine.js";
import { RedmineTime } from "../../../types/RedmineTime.js";
import { getIssues } from "../../../utils/getIssues.js";
import { chooseIssue } from "../../issues/helpers/chooseIssue.js";

const date = await inputDate();

const issues = await getIssues();

const id = await chooseIssue(issues);
const issue = issues.find((issue) => Number(issue.id) === Number(id));

const hours = await arg({
  placeholder: "Podaj ilość godzin (np. 1.5)",
  validate: (input) => (!isNaN(Number(input)) && Number(input) > 0 ? true : "Podaj liczbę większą od zera"),
});

const note = await textarea({
  placeholder: "Wpisz notatkę do czasu pracy",
  value: "",
  height: 200,
});

const timeResponse = await postRedmine<{ time_entry: RedmineTime[] }>(`${await getRedmineUrl()}/time_entries.json`, {
  time_entry: {
    issue_id: issue.id,
    project_id: issue.project.id,
    user_id: await getUserId(),
    spent_on: date,
    activity_id: "25",
    hours: Number(hours),
    comments: note,
  },
});

if (timeResponse.status === 201) {
  await div(`<h1>Czas pracy został dodany</h1>`, [
    {
      name: `Zobacz zagadnienie [${id.toString()}] ${issue.subject}`,
      onAction: async () => {
        await run("../issues/core/read_issue.ts", id.toString());
      },
    },
  ]);
} else {
  await div("Błąd podczas dodawania czasu pracy.");
}
