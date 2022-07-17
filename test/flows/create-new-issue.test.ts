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
import {
  gitlabName,
  gitlabURL,
  gitlabUserName,
  projectId,
} from "../../utils/config";
import { Api } from "../../resources/api";
import { randomeTitle, labels, author } from "../../utils/test-data";
import moment from "moment";

/*
 * Module variables
 */

const api = new Api();
let userId: number;
let createdIssueId: number;
/*
 * Module
 */
describe("Add a new issue to a project - Happy Flows", () => {
  beforeAll(async () => {
    const issues = await api.issue.listAllIssuesToUser();
    userId = issues[0].author.id;

    author.username = gitlabUserName;
    author.name = gitlabName;
    author.web_url = `${gitlabURL}/${gitlabUserName}`;
  });

  // Delete the created issue as a cleanup setp
  afterAll(async () => {
    await api.issue.deleteIssueFromProject(projectId, createdIssueId);
  });

  test("Add new issue to a project with a valid project Id", async (): Promise<void> => {
    const issue = await api.issue.addNewIssueToProject(
      projectId,
      randomeTitle,
      labels.slice(-1)[0]
    );

    author.id = userId;
    createdIssueId = issue.iid;

    expect(issue.project_id).not.toBe(null);
    expect(issue.project_id).toEqual(projectId);

    expect(issue.id).not.toBe(null);
    expect(issue.iid).not.toBe(null);

    expect(issue.title).not.toBe(null);
    expect(issue.state).toEqual("opened");
    expect(moment(issue.created_at, true).isValid());
    expect(moment(issue.updated_at, true).isValid());
    expect(labels).toEqual(expect.arrayContaining(issue.labels));

    expect(issue.assignees).not.toBe([]);
    expect(issue.author).toEqual(author);
    expect(issue.type).toEqual("ISSUE");
  });
});

describe("Add a new issue to a project - Unhappy Flows", () => {
  test("Add new issue to a project with invalid project Id", async (): Promise<void> => {
    const randomProjectId =
      Math.floor(Math.random() * 100) + Math.floor(Date.now() / 1000);

    await expect(async () => {
      await api.issue.addNewIssueToProject(
        randomProjectId,
        randomeTitle,
        labels.slice(-1)[0]
      );
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 404"
    );
  });

  test("Add new issue to a project without a title", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.addNewIssueToProject(projectId, "", labels.slice(-1)[0]);
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 400"
    );
  });

  test("Add new issue to a project without private token", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.addNewIssueToProjectWithoutPrivateToken(
        projectId,
        randomeTitle,
        labels.slice(-1)[0]
      );
    }).rejects.toThrowError(
      "POST request failed with error: Request failed with status code 401"
    );
  });
});
