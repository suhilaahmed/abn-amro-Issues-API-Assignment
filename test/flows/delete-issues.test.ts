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
import { projectId } from "../../utils/config";
import { Api } from "../../resources/api";
import { randomeTitle, labels } from "../../utils/test-data";

/*
 * Module variables
 */

const api = new Api();
let issueInternalId: number;

/*
 * Module
 */
describe("Delete an issue that belong to a specific project - Happy Flows", () => {
  beforeAll(async () => {
    const issues = await api.issue.addNewIssueToProject(
      projectId,
      randomeTitle,
      labels.slice(-1)[0]
    );
    issueInternalId = issues.iid;
  });

  test("Delete an issue using valid internal issue Id ", async (): Promise<void> => {
    await api.issue.deleteIssueFromProject(projectId, issueInternalId);

    await expect(async () => {
      await api.issue.readByIssueId(issueInternalId);
    }).rejects.toThrowError(
      `Unable to find issue with id:  ${issueInternalId}`
    );
  });
});

describe("Delete an issue that belong to a specific project - Unhappy Flows", () => {
  test("Delete an issue using invalid internal issue Id ", async (): Promise<void> => {
    const randomIssueId =
      Math.floor(Math.random() * 100) + Math.floor(Date.now() / 1000);

    await expect(async () => {
      await api.issue.deleteIssueFromProject(projectId, randomIssueId);
    }).rejects.toThrowError(
      "DELETE request failed with error: Request failed with status code 404"
    );
  });

  test("Delete an issue using invalid project Id ", async (): Promise<void> => {
    const randomProjectId =
      Math.floor(Math.random() * 100) + Math.floor(Date.now() / 1000);

    await expect(async () => {
      await api.issue.deleteIssueFromProject(randomProjectId, issueInternalId);
    }).rejects.toThrowError(
      "DELETE request failed with error: Request failed with status code 404"
    );
  });

  test("Delete an issue without private token ", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.deleteIssueFromProjectWithoutPrivateToken(
        projectId,
        issueInternalId
      );
    }).rejects.toThrowError(
      "DELETE request failed with error: Request failed with status code 401"
    );
  });
});
