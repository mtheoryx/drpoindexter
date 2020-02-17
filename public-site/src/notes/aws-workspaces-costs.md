---
title: "AWS Workspaces: Costs and Break-even points"
---

## Types of Workspaces Costs

There are a handful of costs associated with AWS Workspaces

- The Workspace
- The backup storage
- The administration overhead

Let's talk about the first one right now.

### Cost Models

There are 2 cost models:

- Hourly
- Always-On

These have very similar meanings to two other frequently-used terms in the AWS ecosystem, respectively:

- On-Demand
- Reserved Capacity

So under the Hourly model, you only pay for when you run the workspace. You can determine the auto-shutoff period which means that after a user disconnects or logs off the machine, it will shut down, and you will no longer be billed.

Under the Always-on mode, you will pay monthly. The workspace will always be on and ready for a login.

### Cost Breakdowns

As with other pricing models, there are tradeoffs. At first it may seem like you would only want to go with the Hourly billing, saving money by shutting down the workspace when it isn't even being used. You would be correct, in theory. In practice, the pricing models mean you might have a surprise coming...

**Scenario A**

You primarily work on a Mac. You occassionally want to boot up a Windows 10 machine to do various tasks. Maybe you have a system that required Windows. Maybe you want to test compatibility in IE/Edge. Maybe you just really miss Windows. I don't know, just go with me here.

You're going to use this at most 1 hour a day, 5 days a week, 4.33 weeks per month. We're going to want a good experience so we will use the Bundle "Power" which includes 4vCPU, 16GiB memory, and a 100GB user volume that persists and has backups.

Pricing: $13/month + $0.64/hour

22 Hours a month = **\$27.96 / month**

**Scenario B**

You have elected to just always have a ready to go workspace, and elected monthly billing. Perhaps you only use this workspace, or are in a regulated environment where all work must be done in this workspace. It's not as strange as you think. So we have flat pricing.

Pricing: **\$70.00 / month**

**Reality**

There is a break-even point here. Let's do some math:

Take the $70 and subtract the mandatory $13 monthly fee. We're left with \$57 of hourly usage for break even.

X = $57 per month / $0.64/hour

**X = 89 hours per month**

If you run this more than 4 hours per day, each day, in a given month, you will actually **save money** by using monthly, Always-On billing.

You can also switch billing plans whenever you want, even mid-month.

### Reference

All values were pulled straight from the [AWS documentation on Workspaces pricing](https://aws.amazon.com/workspaces/pricing/), feel free to play around with the numbers as you like.

Or, reach out to me and see how I can help with your Workspaces Implementation.
