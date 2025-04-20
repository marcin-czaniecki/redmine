import "@johnlindquist/kit";
import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { getUserId } from "../../../common/getUserId.js";
import { inputDate } from "../../../common/inputDate.js";
import { postRedmine } from "../../../common/requestRedmine.js";
import { RedmineIssue } from "../../../types/RedmineIssue.js";
import { RedmineTime } from "../../../types/RedmineTime.js";
import { getIssues } from "../../../utils/getIssues.js";

const date = await inputDate();

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
