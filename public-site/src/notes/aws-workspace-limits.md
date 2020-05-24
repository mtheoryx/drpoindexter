---
title: "Important AWS Workspace Limits"
---

## Know Thy Limits

There are some important AWS Workspace limits to be aware of:

- Number of workspaces per user - 1
- Number of total workspaces per account/region - 1
- Number of workspace images per account/region - 5

### Per-user Workspace limits

Limit: 1 workspace per user account in your AD

This applies to a single user in a directory, they can only have a single workspace. It doesn't matter if you launch another workspace with different OS, different machine-size.

Only one.

This **cannot** be changed.

### Per Account Workspace Limits

Limit: 1 workspace, per Account, per region.

Keep in mind, when I say "account" I don't mean a user account, or an IAM user account. This is the capital 'A' account meaning.

This **can** be raised via a request.

### Per Account Workspace Image Limits

Limit: 5 images, per Account, per region.

As above, this is capital 'A' account.

This **can** be raised via a request.

## My Recent Examle

We made 2 service requests for limit increases during the MVP of this project.

The first came at the inception of the project. We requested the workspaces/region raised to 5, and workspace images/region raised to 10. This was when we had a small group of engineers quickly iterating through version of a "Windows 10 Experience, Windows Server 2016" deployment. This request took around a day.

The second request came when we were ready to roll this out for broader testing. We anticipated 25 users, and requested the limit raised to 50 workspaces and kept the images at 10. This request was fulfilled within 2 hours.
