//Name: Dodaj czas Redmine
// Description: Dodanie do zadania czas pracy przez Redmine API

import "@johnlindquist/kit";
import { getRedmineUrl } from "../lib/common/getRedmineUrl.js";
import { getUserId } from "../lib/common/getUserId.js";
import { inputDate } from "../lib/common/inputDate.js";
import { postRedmine } from "../lib/common/requestRedmine.js";
import { RedmineIssue } from "../lib/types/RedmineIssue.js";
import { RedmineTime } from "../lib/types/RedmineTime.js";
import { getIssues } from "../lib/utils/getIssues.js";

const issues = await getIssues();

const issuesChoices = issues.map((issue) => ({
  name: `${issue.id}: ${issue.subject}`,
  value: issue,
}));

const issue: RedmineIssue = await arg({
  placeholder: "Wybierz zadanie",
  choices: issuesChoices,
});

// const issue = issues.find((issue) => issue.id === Number(issueId));
const date = await inputDate();

const hours = await arg({
  placeholder: "Podaj ilość godzin (np. 1.5)",
  validate: (input) => (!isNaN(Number(input)) && Number(input) > 0 ? true : "Podaj liczbę większą od zera"),
});

const note = await textarea({
  placeholder: "Wpisz notatkę do czasu pracy",
  value: "",
  height: 200,
});

const timeResponse = (await postRedmine(`${await getRedmineUrl()}/time_entries.json`, {
  time_entry: {
    issue_id: issue.id,
    project_id: issue.project.id,
    user_id: await getUserId(),
    spent_on: date,
    activity_id: "25",
    hours: Number(hours),
    comments: note,
  },
})) as {
  status: number;
  data: {
    time_entry: RedmineTime[];
  };
};

if (timeResponse.status === 201) {
  const { time_entry } = timeResponse.data;

  await div(
    `<h1>Czas pracy został dodany</h1><div>
    <pre>${JSON.stringify(time_entry, null, 2)}</pre>
    </div>`
  );
} else {
  await div("Błąd podczas dodawania czasu pracy.");
}
