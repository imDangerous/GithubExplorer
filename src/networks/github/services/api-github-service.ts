import {request, onError} from '../instances/api-github-instance';
import {GithubTypes} from '../../github.apis';

class GithubService {
  searchRepositories(params: GithubTypes.Repository.ISearchRepositoryRequestParams) {
    return request
      .get('/search/repositories', params)
      .then((response: GithubTypes.Repository.ISearchRepositoryResponse) => response)
      .catch(onError);
  }
  fetchIssues(params: GithubTypes.Issue.ISearchIssuesRequestParams) {
    return request
      .get(`/repos/${params.user}/${params.repo}/issues`, {
        page: params.page,
        per_page: params.per_page,
        state: params.state,
      })
      .then((response: GithubTypes.Issue.ISearchIssuesResponse) => response)
      .catch(onError);
  }
}

export default new GithubService();
