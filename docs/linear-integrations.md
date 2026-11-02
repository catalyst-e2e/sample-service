# Linear integrations

Ticket ADV-2 is Linear's "Connect your tools" onboarding walkthrough. This file keeps
its links next to how each one relates to `sample-service`, for whoever picks up the
next ticket.

## Key integrations

- Slack — create issues from Slack messages and sync threads:
  https://linear.app/settings/integrations/slack
- GitHub — automate pull request and commit workflows, and keep issues synced both
  ways: https://linear.app/settings/integrations/github
- GitLab — same as GitHub: automate pull request and commit workflows, and keep
  issues synced both ways: https://linear.app/settings/integrations/gitlab
- Agents — deploy AI agents that work alongside you as teammates:
  https://linear.app/integrations/agents

## Browse all integrations

- https://linear.app/integrations — 150+ available connections, for example:
  - Bug creation via support tools such as Intercom.
  - Bug creation via support tools such as Zendesk.
  - Issues created from design explorations in Figma.

## Linear API

- https://linear.app/developers — the Linear API is built on GraphQL; this is the
  route for custom tooling beyond the integrations above.

## How this repo relates

- `sample-service` contains no integration code: no webhook receiver, no outbound
  API client, and no tokens. Integrations are configured in Linear workspace
  settings, not in this repository.
- The repo has no CI workflows.
- Ticket branches use the bare ticket ID (for example `ADV-2`), so PRs carry the
  issue ID that Linear's GitHub integration links on.
