---
title: "Minimum Permissions for CDK Bootstrap"
status: "featured"
---

I just knew people shouldn't need to use "AdministratorAccess" permissions to simply bootstrap an AWS account, and I couldn't find a definitive example anywhere.

Not from AWS themselves, or their documentation, or any examples, or anyone else in tutorials mentioning the actual minimum permissions. So I went on my own journey.

This is the minimum required permissions to `cdk bootstrap` and AWS account and region:

[Github Gist Link](https://gist.github.com/mtheoryx/f38ee31edccd203532488e8d009f56dc)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "0",
      "Effect": "Allow",
      "Action": [
        "cloudformation:DescribeStacks",
        "cloudformation:CreateChangeSet",
        "cloudformation:DescribeChangeSet",
        "cloudformation:ExecuteChangeSet",
        "cloudformation:GetTemplate"
      ],
      "Resource": "arn:aws:cloudformation:<REGION>:<ACCOUNT_NUMBER>:stack/CDKToolkit/*"
    }
  ]
}
```

Methodology:

1. Create an IAM user
1. Provision and record the Access Key ID and Access Key Secret
1. Provide NO permissions at all.
1. Attempt to bootstrap a region.
1. Note the failure, and the permission that was missing
1. Add that to the user's policy directly attached to the user
1. Re-run the bootstrap command.
1. Repeat as needed until successful
