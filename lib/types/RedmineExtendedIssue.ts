import { RedmineIssue } from "./RedmineIssue.js";

export interface RedmineExtendedIssue extends RedmineIssue {
  journals: {
    id: number;
    user: { id: number; name: string };
    notes: string;
    created_on: string;
    private_notes: boolean;
    details: {
      property: string;
      name: string;
      old_value: string | null;
      new_value: string | null;
    }[];
  }[];
}
