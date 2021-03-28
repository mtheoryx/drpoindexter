---
title: "How to use gmail aliases for multiple AWS Accounts"
---

The only **true isolation** and separation in AWS is with Accounts. Using dedicated accounts for dev/test/prod and product team isolation is a standard practice. And creating a new account under an AWS Organization is pretty easy.

That said, you need to have a **dedicated email address** for _each separate account_ you create.

**Email Aliases to the rescue!**

_Disclaimer: I happen to know that you can create email address aliases in Office 365, but I don't administer that for my company, and sure as hecc don't use Office 365 for my personal use, so your mileage may vary with ease of adoption for this technique._

When you create an account, the email address is important for a few reasons.

1. You need to verify a link if this is the root
1. You need to get important updates to the account, regardless whether it's root
1. You will need this for password reset, account transfer, and other administrative tasks

Okay so we need an email address, and it can't be the same as your main root account. So let's just... invent one? This is where Gmail plus aliases come in. What's a plus alias?

If my email address was `roberttables@gmail.com` then I would probably use that for my first AWS account. Also called the **root** account. Often called master account, payer account, org account, top account, etc.

If I convert his account to an AWS Organization, now I can create new entire accounts under this organization. So let's create one called `sandbox` where I could simultaneously have freedom to play, but also know it's isolated from my main account.

The email address we would pick could be `roberttables+sandbox@gmail.com`. That's it. The emails will come straight through to the same inbox as the `roberttables@gmail.com` account. Perfect. Repeat as needed for each account.

You can use a for each of your individual accounts you create under an AWS Organization. This is within the rules, and a great idea, especially for a fast growing company doing things the right way: Account-level isolation.

Additionally you can set up filters and rules to divert the "plus alias" incoming emails into dedicated folders to set up a simulation of multiple virtual inboxes.

If you're interested in more neat things you can do with Gmail, check out [my associate, Jacob Bolda's, blog for some really great productivity turbo-boost ideas](https://www.jacobbolda.com/gmail-productivity-hacks/).

And if you like what you see here, maybe [say hey on Twitter](https://twitter.com/drpoindexter), show some <3, and tell me about other things you would like to learn!
