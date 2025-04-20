import "@johnlindquist/kit";
import { getDateRange } from "../../../common/getDateRange.js";
import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { getUserId } from "../../../common/getUserId.js";
import { inputDateRange } from "../../../common/inputDateRange.js";
import { generateIssueTimeEntryHTML } from "../helpers/generateIssueTimeEntryHTML.js";
import { generateProjectTimeEntryHTML } from "../helpers/generateProjectTimeEntryHTML.js";
import { getTimeEntries } from "../helpers/getTimeEntries.js";
import { displayError } from "../../../utils/displayError.js";
import { getIssue } from "../../../utils/getIssue.js";
const date = await inputDateRange();

const limit = 5;
let offset = 0;

async function readTimeEntries(date: string, offset?: number, limit: number = 5) {
  const url = await getRedmineUrl();
  const userId = await getUserId();
  const [from, to] = getDateRange(date);

  const timeEntries = await getTimeEntries({ userId, from, to, offset, limit });

  if (!timeEntries || timeEntries.length === 0) {
    await div(md(`**Brak wpisów czasu pracy dla wybranego zakresu dat.**`));
  }

  const tempTimeEntries = timeEntries.map(async (entry, index) => {
    try {
      const issue = await getIssue(entry.issue.id);

      return generateIssueTimeEntryHTML({ offset, index, url, id: issue.id, subject: issue.subject, comments: entry.comments, hours: entry.hours, spent_on: entry.spent_on });
    } catch (error) {
      return generateProjectTimeEntryHTML({ offset, index, url, id: entry.project.id, name: entry.project.name, comments: entry.comments, hours: entry.hours, spent_on: entry.spent_on });
    }
  });

  const timeEntriesHTML = await Promise.all(tempTimeEntries);

  return `
  <div class="flex flex-row px-4 pt-2 place-content-between" style="gap: 10px;"><div class="text-amber-400">Poprzednie wpisy <code class="p-[2px] bg-gray-700 rounded-sm"> \< </code></div> | <div class="text-amber-400">Następne wpisy <code class="p-[2px] bg-gray-700 rounded-sm"> \> </code></div></div>
  <div class="flex flex-col py-4" style="gap: 10px;">${timeEntriesHTML.join("\n")}</div>
  `;
}

try {
  await div(await readTimeEntries(date, offset, limit), [
    {
      name: "Kolejne wpisy",
      shortcut: ".",
      onAction: async () => {
        offset += limit;
        await setPanel(await readTimeEntries(date, offset, limit));
      },
    },
    {
      name: "Poprzednie wpisy",
      shortcut: ",",
      onAction: async () => {
        if (offset <= 0) {
          await notify("Nie na to się umawialiśmy 👀");
          return;
        }
        offset -= limit;
        await setPanel(await readTimeEntries(date, offset, limit));
      },
    },
    {
      name: "Dodaj czas pracy",
      onAction: async () => {
        await run("./add_time_entries.ts");
      },
    },
  ]);
} catch (error) {
  await displayError(error);
}
