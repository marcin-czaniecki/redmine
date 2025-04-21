export interface RedmineProject {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  is_public: boolean;
  inherit_members: boolean;
  custom_fields: {
    id: number;
    name: string;
    value: string;
  }[];
  created_on: string;
  updated_on: string;
}
