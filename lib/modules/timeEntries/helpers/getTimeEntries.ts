import { RedmineTime } from "../../../types/RedmineTime.js";
import { getRedmineUrl } from "../../../common/getRedmineUrl.js";
import { getRedmine } from "../../../common/requestRedmine.js";

export interface GetTimeEntriesParams {
  userId: number;
  from: string;
  to: string;
  limit?: number;
  offset?: number;
}

export async function getTimeEntries({ userId, from, to, limit = 20, offset = 0 }: GetTimeEntriesParams) {
  const query = new URLSearchParams({
    user_id: userId.toString(),
    spent_on: from === to ? from : `><${from}|${to}`,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const url = `${await getRedmineUrl()}/time_entries.json?${query.toString()}`;

  return (await getRedmine<{ time_entries: RedmineTime[] }>(url)).data.time_entries;
}
