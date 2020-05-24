---
title: "AWS Workspace iteration takes time"
---

## When creating AWS Workspace Images for your organization

Here is the lifecycle of Workspace Creation, and approximate **minimum** times:

- Create a Workspace from a base image (5 minutes)
- Make modifications to the base image (Plan on at least 1 hour)
- Create an image from the workspace (45 minutes)
- Launch a new Worksace from the new Image (5 minutes)

Discarding the fact that a single user in AD can only have one workspace... you can see that a single iteration will take at the very least 2 hours.

## A hypothetical examle

_Note, this is not hypothetical, I just did this with my team for a client_

Here are the requirements for the workspace and associated software:

- Microsoft AD-Connected
- Office 365 (not associatad with existing AD)
- Teams
- OneDrive

If everything went perfectly each time, we count now 3 iterations at a minimum. Which means the minimum time, if you know what you're doing, have everything ready, and everything "just works" is going to be at least a full work day.

And that doesn't include any testing time on the new iteration images, communication of issues back to the team, communication with the stakeholders, or creating documentation and training resources.

## Closing Thoughts

If I had to do this again, it would take much less time. But as a zero-to-hero exerience, it wasn't bad. **It just took time**.
