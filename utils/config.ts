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
require("dotenv").config();

/*
 * Module declarations
 */
interface Config {
  gitlabURL: string;
  gitlabAPIVersion: string;
  gitlabAPI: string;
  privateToken: string;
  gitlabUserName: string;
  gitlabName: string;
  projectId: number;
}

/*
 * Module
 */
const config: Config = {
  gitlabURL: "https://gitlab.com",
  gitlabAPIVersion: "v4",
  gitlabAPI: "issues",
  privateToken: process.env.PRIVATE_ACCESS_TOKEN,
  gitlabUserName: process.env.GITLAB_USER_NAME,
  gitlabName: process.env.GITLAB_NAME,
  projectId: Number(process.env.PROJECT_ID)
};

/*
 * Module exports
 */
export const {
  gitlabURL,
  gitlabAPIVersion,
  gitlabAPI,
  privateToken,
  gitlabName,
  gitlabUserName,
  projectId
} = config;
