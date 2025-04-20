import { getRedmineUrl } from "./getRedmineUrl.js";
import { getRedmine } from "./requestRedmine.js";

export async function getUserId() {
  const response = await getRedmine<{ user: { id: number } }>(`${await getRedmineUrl()}/users/current.json`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    throw new Error(`Error fetching user ID: ${response.status} - ${response.statusText}`);
  }

  return response.data.user.id;
}
