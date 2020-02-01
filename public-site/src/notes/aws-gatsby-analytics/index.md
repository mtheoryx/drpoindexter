---
title: "Can you get analytics from a Gatsby JAMStack site? Sure!"
---

So I wanted to see how my outreach was going. I wanted to _not_ reach for the boring solutions that exist like everywhere, and keep everything AWS/Amplify. Would it work? Yes, yes it did work.

Here are the criteria:

- I want to have a low-cost, serverless solution
- I want to record hits on pages
- I want some basic demographics for user devices and browsers

_Note: If you don't care how I did it, you can explore the actual docs here [AWS Amplify Analytics Docs](https://aws-amplify.github.io/docs/js/analytics)_

Here's how I did it...

- First thing's first, you gotta init the amplify backend.
- Then you need to update your app to publish "page hits" to the backend.
- That's it.

Presuming you already have an amplify frontend with Gatsby, you need a backend. So, init the amplify backend.

```bash
amplify add analytics
```

You'll get some config options. If you get concerned(as I did), it does use Cognito behind the scenes, but the permissions are unauthenticated access, by default.

Also, Pinpoint (the service behind these analytics) may not be available in the region your site is in. No worries, cross-region works just fine. I host this site in us-east-2 (Ohio), but my analytics are in us-east-1 (N. Virginia). You won't notice any issues.

After you go through the prompts to configure all of it, run a push to get it out in the cloud working for you with:

```bash
amplify push
```

TO BE CONTINUED (with the gatsby code)...
