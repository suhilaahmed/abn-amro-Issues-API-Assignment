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
import { gitlabName, gitlabURL, gitlabUserName } from "../../utils/config";
import { Api } from "../../resources/api";
import { author, state, labels } from "../../utils/test-data";
import moment from "moment";

/*
 * Module variables
 */
const api = new Api();
let userId: number;
let projectId: number;
let issuesIds: number[] = [];
let iids: number[] = [];

/*
 * Module
 */

// In this test suite we will test the happy flows of getting list of available issues

// NOTE: in the ideal world each test should assert on a specific feature - and because this data is being generated in a random way,
//multiple assertions should be executed for each and every test to insure the consitency.
describe("List all issues - Happy Flows", () => {
  beforeAll(async () => {
    author.username = gitlabUserName;
    author.name = gitlabName;
    author.web_url = `${gitlabURL}/${gitlabUserName}`;
  });

  // gitlab issue: getting all issues available is resulting in 500 error
  test("Get list of all available issues ", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.listAllIssues("scope", "all");
    }).rejects.toThrowError();
  });

  test("Get list of all issues available to the user", async (): Promise<void> => {
    const issues = await api.issue.listAllIssuesToUser();
    expect(issues != null || {});

    projectId = issues[0].project_id;
    userId = issues[0].author.id;

    // since most of the response is a randome changing values and not required,
    // the assertions will be based on the types of the values and assertions on the author of the issue.

    issues.forEach((issue) => {
      author.avatar_url = issue.author.avatar_url;
      author.state = issue.author.state;
      author.id = userId;

      // this assertion is important as we need to make sure that the project id never changes for all issues under the project
      expect(issue.project_id).not.toBe(null);
      expect(issue.project_id).toEqual(projectId);

      expect(issue.id).not.toBe(null);
      expect(issue.iid).not.toBe(null);

      expect(issue.title).not.toBe(null);
      expect(state).toContain(issue.state);
      expect(moment(issue.created_at, true).isValid());
      expect(moment(issue.updated_at, true).isValid());
      expect(labels).toEqual(expect.arrayContaining(issue.labels));

      expect(issue.assignees).not.toBe([]);
      expect(issue.author).toEqual(author);
      expect(issue.type).toEqual("ISSUE");

      issuesIds.push(issue.id);
      iids.push(issue.iid);
    });
  });

  test("Get list of all issues with state Opened", async (): Promise<void> => {
    const issues = await api.issue.listAllIssues("state", "opened");
    expect(issues != null || {});

    issues.forEach((issue) => {
      // this assertion is important as we need to make sure that the project id never changes for all issues under the project
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

  test("Get list of all issues with state Closed", async (): Promise<void> => {
    const issues = await api.issue.listAllIssues("state", "closed");
    expect(issues != null || {});

    issues.forEach((issue) => {
      // this assertion is important as we need to make sure that the project id never changes for all issues under the project
      expect(issue.project_id).not.toBe(null);
      expect(issue.project_id).toEqual(projectId);

      expect(issue.id).not.toBe(null);
      expect(issue.iid).not.toBe(null);

      expect(issue.title).not.toBe(null);
      expect(issue.state).toEqual("closed");
      expect(moment(issue.created_at, true).isValid());
      expect(moment(issue.updated_at, true).isValid());
      expect(labels).toEqual(expect.arrayContaining(issue.labels));

      expect(issue.assignees).not.toBe([]);
      expect(issue.author).toEqual(author);
      expect(issue.type).toEqual("ISSUE");
    });
  });
});

// In this test suite we will test the unhappy flows of getting list of available issues.
// ex: passing an incorrect paramter
describe("List all issues - Unhappy Flows", () => {
  test("Get issues list with incorrect parameter value - state = active", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.listAllIssues("state", "active");
    }).rejects.toThrowError(
      "GET request failed with error: Request failed with status code 400"
    );
  });

  test("Get issues list with incorrect boolean parameter value - confidential = abc", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.listAllIssues("confidential", "abc");
    }).rejects.toThrowError(
      "GET request failed with error: Request failed with status code 400"
    );
  });
  test("Get issues list without a private token", async (): Promise<void> => {
    await expect(async () => {
      await api.issue.listAllIssuesWithoutPrivateToken();
    }).rejects.toThrowError(
      "GET request failed with error: Request failed with status code 401"
    );
  });
});

// In this test suite we will test the flows of getting a singe issue by id 

describe("List a single issue - Happy/Unhappy Flows", () => {
  test("Get issue with correct id", async (): Promise<void> => {
    for (const issueId of issuesIds) {
      let issue = await api.issue.readByIssueId(issueId);
      // this assertion is important as we need to make sure that the project id never changes for all issues under the project
      expect(issue.project_id).not.toBe(null);
      expect(issue.project_id).toEqual(projectId);

      expect(issue.id).not.toBe(null);
      expect(issue.iid).not.toBe(null);

      expect(issue.title).not.toBe(null);
      expect(state).toContain(issue.state);
      expect(moment(issue.created_at, true).isValid());
      expect(moment(issue.updated_at, true).isValid());
      expect(labels).toEqual(expect.arrayContaining(issue.labels));

      expect(issue.assignees).not.toBe([]);
      expect(issue.author).toEqual(author);
      expect(issue.type).toEqual("ISSUE");
    }
  });

  test("Get issue with an incorrect id", async (): Promise<void> => {
    const randomIssueId =
      Math.floor(Math.random() * 100) + Math.floor(Date.now() / 1000);

    await expect(async () => {
      await api.issue.readByIssueId(randomIssueId);
    }).rejects.toThrowError(`Unable to find issue with id:  ${randomIssueId}`);
  });
});

// In this test suite we will test the flows of getting list of available issues under a specific project

describe("List project issues - Happy/Unhappy Flows", () => {
  test("List issues under a correct project id", async (): Promise<void> => {
    const issues = await api.issue.listAllIssuesUnderProject(projectId);

    issues.forEach((issue) => {
      author.avatar_url = issue.author.avatar_url;
      author.state = issue.author.state;
      author.id = userId;

      // this assertion is important as we need to make sure that the project id never changes for all issues under the project
      expect(issue.project_id).not.toBe(null);
      expect(issue.project_id).toEqual(projectId);

      expect(issue.id).not.toBe(null);
      expect(issue.iid).not.toBe(null);

      expect(issue.title).not.toBe(null);
      expect(state).toContain(issue.state);
      expect(moment(issue.created_at, true).isValid());
      expect(moment(issue.updated_at, true).isValid());
      expect(labels).toEqual(expect.arrayContaining(issue.labels));

      expect(issue.assignees).not.toBe([]);
      expect(issue.author).toEqual(author);
      expect(issue.type).toEqual("ISSUE");
    });
  });
  test("List issues under an incorrect project id", async (): Promise<void> => {
    const randomProjectId =
      Math.floor(Math.random() * 100) + Math.floor(Date.now() / 1000);

    await expect(async () => {
      await api.issue.listAllIssuesUnderProject(randomProjectId);
    }).rejects.toThrowError(
      "GET request failed with error: Request failed with status code 404"
    );
  });
});
