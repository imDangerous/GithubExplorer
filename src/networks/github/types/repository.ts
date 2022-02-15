export interface ISearchRepositoryRequestParams {
  q: string;
  per_page: number;
  page: number;
  sort?: string;
  order?: string;
}

export interface ISearchRepositoryResponse {
  total_count: number;
  incomplete_results: boolean;
  items: [];
}

export type RepositoryItem = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description: string;

  issue_events_url: string;
  events_url: string;

  license: License;
  // TODO
  topics: string[];
  visibility: string;
  // TODO
  favor: boolean;
};

export type Owner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  type: string;
};

export type License = {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
};
