export interface RedmineIssue {
  id: number;
  project: {
    id: number;
    name: string;
  };
  tracker: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
    is_closed: boolean;
  };
  priority: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
  };
  assigned_to: {
    id: number;
    name: string;
  };
  subject: string;
  description: string;
  start_date: string;
  due_date: string | null;
  done_ratio: number;
  is_private: boolean;
  estimated_hours: number | null;
  total_estimated_hours: number | null;
  spent_hours: number;
  total_spent_hours: number;
  custom_fields: {
    id: number;
    name: string;
    value: string | string[];
    multiple?: boolean;
  }[];
  created_on: string;
  updated_on: string;
  closed_on: string | null;
}
