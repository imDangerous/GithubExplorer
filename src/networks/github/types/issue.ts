export interface ISearchIssuesRequestParams {
  user: string;
  repo: string;
  per_page: number;
  page: number;
  state: 'all' | 'open' | 'closed';
}

export type ISearchIssuesResponse = IssueItem[];

export type IssueItem = {
  url: string;
  id: number;
  html_url: string;
  number: number;
  title: string;
  user: User;
  state: string;
  locked: boolean;
  labels: Label[];
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  body: string;
};

export type User = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
};

export type Label = {
  id: number;
  name: string;
  color: string;
  default: boolean;
};
