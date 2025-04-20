import "@johnlindquist/kit";
import { getRedmineApiKey } from "./getRedmineApiKey.js";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export async function getRedmine<Data extends object = object>(url: string, config?: AxiosRequestConfig<any>) {
  return (await get(url, {
    ...config,
    headers: {
      ...(config?.headers || {}),
      "Content-Type": "application/json",
      "X-Redmine-API-Key": await getRedmineApiKey(),
    },
  })) as AxiosResponse<Data, any>;
}

export async function postRedmine(url: string, body: object, config?: AxiosRequestConfig<any>) {
  return await post(url, body, {
    ...config,
    headers: {
      ...(config?.headers || {}),
      "Content-Type": "application/json",
      "X-Redmine-API-Key": await getRedmineApiKey(),
    },
  });
}
