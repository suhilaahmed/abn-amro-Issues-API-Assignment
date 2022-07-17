/*
 * Copyright (c) 2022 Suhila Ahmed - ABN AMRO.
 *
 * Unauthorized copying of this file via any medium IS STRICTLY PROHIBITED.
 * Proprietary and confidential.
 *
 * The above copyright notice shall be included in all copies or
 * substantial portions of the Software.
 */

/*
 * Module dependencies
 */
import { Api } from "..";
import { gitlabAPI, gitlabAPIVersion, gitlabURL } from "../../../utils/config";
import { Issue } from "../schema";

/*
 * Module
 */
export class IssuesApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  public async listAllIssues(
    paramter: string,
    value: string
  ): Promise<Issue[]> {
    return this.api.get(
      `${gitlabURL}/api/${gitlabAPIVersion}/${gitlabAPI}?${paramter}=${value}`
    );
  }

  public async listAllIssuesWithoutPrivateToken(): Promise<Issue[]> {
    return this.api.getUnAuthorized(
      `${gitlabURL}/api/${gitlabAPIVersion}/${gitlabAPI}?`
    );
  }

  public async listAllIssuesToUser(): Promise<Issue[]> {
    return this.api.get(`${gitlabURL}/api/${gitlabAPIVersion}/${gitlabAPI}`);
  }

  public async readByIssueId(id: number): Promise<Issue> {
    return this.api.readById(
      async (): Promise<Issue[]> => this.listAllIssuesToUser(),
      id
    );
  }

  public async listAllIssuesUnderProject(projectId: number): Promise<Issue[]> {
    return this.api.get(
      `${gitlabURL}/api/${gitlabAPIVersion}/projects/${projectId}/${gitlabAPI}`
    );
  }

  public async addNewIssueToProject(
    projectId: number,
    title: string,
    label: string
  ): Promise<Issue> {
    return this.api.post(
      `${gitlabURL}/api/${gitlabAPIVersion}/projects/${projectId}/${gitlabAPI}?title=${title}&labels=${label}`
    );
  }

  public async addNewIssueToProjectWithoutPrivateToken(
    projectId: number,
    title: string,
    label: string
  ): Promise<Issue> {
    return this.api.postUnAuthorized(
      `${gitlabURL}/api/${gitlabAPIVersion}/projects/${projectId}/${gitlabAPI}?title=${title}&labels=${label}`
    );
  }

  public async deleteIssueFromProject(
    projectId: number,
    issueId: number
  ): Promise<Issue> {
    return this.api.delete(
      `${gitlabURL}/api/${gitlabAPIVersion}/projects/${projectId}/${gitlabAPI}/${issueId}`
    );
  }

  public async deleteIssueFromProjectWithoutPrivateToken(
    projectId: number,
    issueId: number
  ): Promise<Issue> {
    return this.api.deleteUnAuthorized(
      `${gitlabURL}/api/${gitlabAPIVersion}/projects/${projectId}/${gitlabAPI}/${issueId}`
    );
  }

  public async updateAnIssue(
    paramter: string,
    value: any,
    issueId: number,
    projectId: number
  ): Promise<Issue> {
    return this.api.put(
      `${gitlabURL}/api/${gitlabAPIVersion}/projects/${projectId}/${gitlabAPI}/${issueId}?${paramter}=${value}`
    );
  }

  public async updateAnIssueWithoutPrivateToken(
    paramter: string,
    value: any,
    issueId: number,
    projectId: number
  ): Promise<Issue> {
    return this.api.putUnAuthorized(
      `${gitlabURL}/api/${gitlabAPIVersion}/projects/${projectId}/${gitlabAPI}/${issueId}?${paramter}=${value}`
    );
  }
}
