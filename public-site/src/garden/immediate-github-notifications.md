---
title: "Quick Thinking with a Twilio Integration"
---

I was presented with a simple ask:

`Can you help me curate and help our Pull Requests for new people trying to update their member pages in our gatsby site?`

Well I'm not going to say no. So I set about asking how I can help and what examples might be for things that needed that extra help.

So here is an example:

A member submits a PR. It's just a markdown file edit, due to our consideration for dev experience and simplicity. But! Markdown does have valid and invalid syntax.

At this point I may need to help out with pulling down that PR as a branch, making a few changes, pushing it backup, and then seeing our linters and checks work.

Great! But, how do I know when this happens??

- Github notifications, check
- I get github notifications in my gmail, nice
- But hell, I don't check my gmail very often at all!

What do?

_Placeholder for a whole talk I did about getting the right info to the right people at the right time_

Here's what the idea was. And it actually worked!

Step 1: Creat a gmail filter search syntax to find this type of message. For me, it was like this:

`in:inbox subject:([livecoders/website]) -in:chats`

Nice! So, connect my gmail in a zap. Set up the `Customize Email Matching Search`

Next step! Well, I deem this personally very high priority so I reach for my good friend Twilio!

_Placeholder for Twilio is a communications platform..._

Now my next zap step is to send me an SMS message from one of my registered Twilio phone numbers to my cell phone number.

I configure the account SID, the token the from number, and the to number. Give it a message like:

`New Live Coder Website PR Opened`

Done. Save it, turn on the zap.

And I had a friend on the team open a PR as a test, [this was the one](https://github.com/livecoders/website/pull/77) and it worked!

I had a text on my phone! Then I could jump into gmail, octobox, or right in github notifications and handle it straight away.
