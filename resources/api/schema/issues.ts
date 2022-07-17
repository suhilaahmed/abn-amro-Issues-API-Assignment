/*
 *  Copyright (c) 2022 Suhila Ahmed - ABN AMRO.
 *
 * Unauthorized copying of this file via any medium IS STRICTLY PROHIBITED.
 * Proprietary and confidential.
 *
 * The above copyright notice shall be included in all copies or
 * substantial portions of the Software.
 */

export type user = {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
};

export type time_stats = {
  time_estimate: number;
  total_time_spent: number;
  human_time_estimate: string;
  human_total_time_spent: string;
};

export type _links = {
  self: string;
  notes: string;
  award_emoji: string;
  project: string;
  closed_as_duplicate_of: string;
};

export type reference = {
  short: string;
  relative: string;
  full: string;
};

export interface Issue {
  id: number;
  iid: number;
  project_id: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  updated_at: string;
  closed_at: string;
  closed_by: string;
  labels: [string];
  milestone: {};
  assignees: user[];
  author: user;
  type: string;
  assignee: user;
  user_notes_count: number;
  merge_requests_count: number;
  upvotes: number;
  downvotes: number;
  due_date: string;
  confidential: boolean;
  discussion_locked: boolean;
  issue_type: string;
  web_url: string;
  time_stats: time_stats;
  task_completion_status: {
    count: number;
    completed_count: number;
  };
  weight: number;
  blocking_issues_count: number;
  has_tasks: boolean;
  task_status: string;
  _links: _links;
  references: reference;
  severity: string;
  moved_to_id: string;
  service_desk_reply_to: string;
  epic_iid: number;
  epic: string;
  iteration: string;
  health_status: string;
}
