export interface RedmineTime {
  id: number;
  project: {
    id: number;
    name: string;
  };
  issue?: {
    id?: number;
  };
  user: {
    id: number;
    name: string;
  };
  activity: {
    id: number;
    name: string;
  };
  hours: number;
  comments: string;
  spent_on: string;
  created_on: string;
  updated_on: string;
  custom_fields: Array<{
    id: number;
    name: string;
    value: string;
  }>;
}
