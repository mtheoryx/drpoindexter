---
title: "How to close an AWS Organization Sub-account"
---

tldr: You must login as the root user for that account

This can only be done from the Billing and Cost Management console of the account itself, as the root user. It cannot be done from the organization itself.

Reference: [https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_close.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_close.html)

When you create an account under an org from that org root account, there is sort of a "shadow" root user created on your behalf. The username will be the unique email address you chose when creating it.

The password will be a random 64+ character string, but at no point are you ever given this password. And often your next step would be to cross-account over and create your first cross-account roles.

But to close out this sub account, you NEED to get that password AND log in as that shadow root user.

Go to the main console login page, and elect to sign in as the root user. Enter that email. Then select "forgot password". It's a little misleading because you didn't forget it, you just never got it. Noted.

Email back and forth, pick a good password, then sign in as root with that email and the new password you chose.

A couple precautions:

If there are any scheduled workloads, auto-scaling activities, etc, you may still be billed for these even after you request to close the account. You will lose access to the account, so make sure you shut down, terminate, and backup/transfer any data you would like to save from this account.

Now that we have access to log in as the actual root user, we can close the account.

Got to Billing and Cost Management Console by selecting your name from the top right, find and click an entry in the drop down of "My Account".

Scroll all the way to the bottom to the "Close Account" section. Check all the boxes (and read the stuff you're checking, of course). Then click the big red scary "Close Account" button and confirm in the popup dialog.

You will receive an email to this root user's email address with a confirmation and some additional information you can save for later reference.

To confirm, sign out of this account and sign back into the main root account of the organization (ideally NOT as root). In the drop down below the username at the top-right, select "My Organization". The account should now have a "Suspended" status. This will remain for around 90 days, and then will be removed completely.

It's not a bad time to clean up any references to this closed account, such as in cross-account roles, any AWS CLI/SDK configurations, things of that sort. But, account IDs are never re-used. I would still prefer the clean up, but maybe that's just me.
