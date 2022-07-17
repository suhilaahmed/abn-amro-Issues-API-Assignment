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
import { Issue } from "resources/api/schema";

/*
 * Module variables
 */

const api = new Api();
let createdIssueId: number;
let issue: Issue;

/*
 * Module
 */

describe("Update an existing project issue - Happy Flows", () => {
  beforeAll(async () => {
    issue = await api.issue.addNewIssueToProject(
      projectId,
      randomeTitle,
      labels.slice(-1)[0]
    );
    createdIssueId = issue.iid;
  });

// Delete the created issue as a cleanup setp
  afterAll(async () => {
    await api.issue.deleteIssueFromProject(projectId, createdIssueId);
  });

  //This test is created to mark the issue as closed and to assert on that
  test("Update Issue - mark a issue that belong to a project to be closed", async (): Promise<void> => {
    expect(issue.state).toEqual("opened");

    const updateIssue = await api.issue.updateAnIssue(
      "state_event",
      "close",
      createdIssueId,
      projectId
    );
    expect(updateIssue.state).toEqual("closed");
  });

//This test is created to mark the issue as confidential and to assert on that
  test("Update Issue - mark a issue that belong to a project to be confidential", async (): Promise<void> => {
    expect(issue.confidential).toEqual(false);

    const updateIssue = await api.issue.updateAnIssue(
      "confidential",
      true,
      createdIssueId,
      projectId
    );
    expect(updateIssue.confidential).toEqual(true);
  });
});

// This test suite mainly target providing incorrect values and missing the private token
describe("Update an existing project issue - Unhappy Flows", () => {
  beforeAll(async () => {
    issue = await api.issue.addNewIssueToProject(
      projectId,
      randomeTitle,
      labels.slice(-1)[0]
    );
    createdIssueId = issue.iid;
  });

  afterAll(async () => {
    await api.issue.deleteIssueFromProject(projectId, createdIssueId);
  });

  test("Update Issue - update state event of an issue with incorrect value", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.updateAnIssue(
        "state_event",
        randomeTitle,
        createdIssueId,
        projectId
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 400"
    );
  });

  test("Update Issue - update the confidentiality of an issue with incorrect value", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.updateAnIssue(
        "confidential",
        randomeTitle,
        createdIssueId,
        projectId
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 400"
    );
  });

  test("Update Issue - update the issue with non existing parameter", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.updateAnIssue(
        randomeTitle,
        randomeTitle,
        createdIssueId,
        projectId
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 400"
    );
  });

  test("Update Issue - update the issue with incorrect project id", async (): Promise<void> => {
    const randomProjectId =
      Math.floor(Math.random() * 100) + Math.floor(Date.now() / 1000);
    await expect(async () => {
      await api.issue.updateAnIssue(
        randomeTitle,
        randomeTitle,
        createdIssueId,
        randomProjectId
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 400"
    );
  });

  test("Update Issue - update the issue with incorrect issue id", async (): Promise<void> => {
    const randomeIssueId =
      Math.floor(Math.random() * 100) + Math.floor(Date.now() / 1000);
    await expect(async () => {
      await api.issue.updateAnIssue(
        randomeTitle,
        randomeTitle,
        randomeIssueId,
        projectId
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 400"
    );
  });

  test("Update Issue - update the issue without private token", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.updateAnIssueWithoutPrivateToken(
        randomeTitle,
        randomeTitle,
        createdIssueId,
        projectId
      );
    }).rejects.toThrowError(
      "PUT request failed with error: Request failed with status code 401"
    );
  });
});
