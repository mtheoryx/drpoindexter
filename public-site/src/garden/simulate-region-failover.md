---
title: "Simulate an AWS Region failure with Service Control Policies"
---

AWS Organizations Service Control Policies

https://aws.amazon.com/blogs/security/how-to-use-service-control-policies-to-set-permission-guardrails-across-accounts-in-your-aws-organization/

Example Policy to restrict access based on requested region:

https://asecure.cloud/a/scp_whitelist_region/

_Note: The terminology in the linked article says "whitelist" but the preferred term set is "allow-list" and "block-list_

Approach

- [x] Create a new AWS child account, provide a user with limited access
- [x] Create account with email alias
- [x] Request password reset for root user, do so
- [x] Record user/pass
- [x] Configure hardware MFA (yubikey)
- [x] Create an admin role with cross-account trust relationship, note the role ARN
- [x] Create a limited role with cross-account trust relationship, note the role ARN - This will be used for permission escalation requirements - Use the AWS ReadOnly permission set for now
- [x] Log out of root, and never use it unless break glass
- [x] In primary account, add the cross-account access sts permissions to user(s) for role ARN
- [x] Configure entries in chrome account switcher
- [x] Configure AWS CLI credentials/config entry for role assumption
- [x] Cross-authenticate into new account. Do this from now on.
- [x] Discover, incrementally, permissions required to do the following, via the CLI, issuing from the root management account (**it's a limitation, can't issue from the child account!**)
- [x] Create an SCP
- [x] Attach an SCP to an account
- [x] Detach an SCP from an account
- [x] Update an SCP
- [x] View policies
  - This precise policy can used alone as a role, or attached to a group
  - Or send this to others to create (your DevOps group, for example)
- [x] Create a resource in us-east-2, in the experimental account (not the management)
- [x] Create a resource in us-west-2, in the experimental account (not the management)
- [x] Create a policy, using the example as a guideline
- [x] Attach the policy, block us-east-2 - expect to no longer access resource in us-east-2 - expect to still access us-west-2
- [x] Detach the policy, unblock us-east-2 - expect to access resource in us-east-2 - expect to access resource in us-west-2
- [x] Delete us-east-2 resource(s)
- [x] Delete us-west-2 resources

### Policy Iteration

Learned! You can only call this from the actual org root account, not child accounts! Regardless, this is what a policy would look like:

Name: ListExperimentalAccountSCPs

```bash
aws organizations list-policies-for-target --filter SERVICE_CONTROL_POLICY --target-id <account_id>
```

Starting Policy to list Account SCPs:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "organizations:ListPoliciesForTarget",
      "Resource": "arn:aws:organizations::*:account/o-*/*"
    }
  ]
}
```

Example Response:

This shows the default policy added to any account created in an organization with SCP features enabled. Or accounts that are invited to an organization.

```json
{
  "Policies": [
    {
      "Id": "p-FullAWSAccess",
      "Arn": "arn:aws:organizations::aws:policy/service_control_policy/p-FullAWSAccess",
      "Name": "FullAWSAccess",
      "Description": "Allows access to every operation",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": true
    }
  ]
}
```

Why is the above important? When we attach/detach policies, there is an important restriction with the second step. You cannot remove the last remaining policy.

Why would that matter? If the account has NO policies and you attached this region blocking one, then detach it, you are then removing the last policy. This is not likely to happen here, so let's move on!

### Create a policy

The SCP policy, from the example. We will leave two regions allow-listed, but adjust them slightly later.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "NotAction": [
        "a4b:*",
        "acm:*",
        "aws-marketplace-management:*",
        "aws-marketplace:*",
        "aws-portal:*",
        "awsbillingconsole:*",
        "budgets:*",
        "ce:*",
        "chime:*",
        "cloudfront:*",
        "config:*",
        "cur:*",
        "directconnect:*",
        "ec2:DescribeRegions",
        "ec2:DescribeTransitGateways",
        "ec2:DescribeVpnGateways",
        "fms:*",
        "globalaccelerator:*",
        "health:*",
        "iam:*",
        "importexport:*",
        "kms:*",
        "mobileanalytics:*",
        "networkmanager:*",
        "organizations:*",
        "pricing:*",
        "route53:*",
        "route53domains:*",
        "s3:GetAccountPublic*",
        "s3:ListAllMyBuckets",
        "s3:PutAccountPublic*",
        "shield:*",
        "sts:*",
        "support:*",
        "trustedadvisor:*",
        "waf-regional:*",
        "waf:*",
        "wafv2:*",
        "wellarchitected:*"
      ],
      "Resource": "*",
      "Effect": "Deny",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": ["us-east-2", "us-west-1"]
        }
      }
    }
  ]
}
```

Command to create policy from file above, named `policy.json`:

```bash
aws organizations create-policy --name AllowListRegion --type SERVICE_CONTROL_POLICY --description "Allows operation in only a region(s)" --content file://policy.json
```

IAM Policy to allow creation of a SCP:

Name: CreateSCP

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "organizations:CreatePolicy",
      "Resource": "*"
    }
  ]
}
```

If this works correctly, there should be some json output in the terminal, with the policy json-stringified in the "content" spot. It's visually a hot mess, so I won't put it in here.

### Attach an SCP to an account

Now we have the allow-list policy for further use. The next step is to attach the restriction to an account. In our case, the new experimental account we created for this experiment.

This will require the policy id. To retrieve this, another set of permissions are requried.

Command to list policies:

```bash
aws organizations list-policies --filter SERVICE_CONTROL_POLICY
```

Permissions Required:

Name: ListOrgSCPs

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "organizations:ListPolicies",
      "Resource": "*"
    }
  ]
}
```

Response (org ID and target account number redacted)

```json
{
  "Policies": [
    {
      "Id": "p-FullAWSAccess",
      "Arn": "arn:aws:organizations::aws:policy/service_control_policy/p-FullAWSAccess",
      "Name": "FullAWSAccess",
      "Description": "Allows access to every operation",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": true
    },
    {
      "Id": "p-inro61w0",
      "Arn": "arn:aws:organizations::<account_id>:policy/<organization_id>/service_control_policy/p-inro61w0",
      "Name": "AllowListRegion",
      "Description": "Explicity allows operation in only a region(s)",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": false
    },
    {
      "Id": "p-t4wzso4u",
      "Arn": "arn:aws:organizations::<account_id>:policy/<organization_id>/service_control_policy/p-t4wzso4u",
      "Name": "Quarantine",
      "Description": "Deny creating any infrastructure or services",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": false
    }
  ]
}
```

Our "AllowListRegion" policy is what we are after, so note that `"Id"` in the output. In our case it's `p-inro61w0`

arn:aws:organizations::716374413161:policy/o-6lhxkkma2d/service_control_policy/p-inro61w0

Command to attach policy

```bash
aws organizations attach-policy --policy-id p-inro61w0 --target-id <account_number>
```

Permissions required

Name: AttachSCP

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "organizations:AttachPolicy",
      "Resource": [
        "arn:aws:organizations::*:account/o-*/*",
        "arn:aws:organizations::716374413161:policy/o-6lhxkkma2d/service_control_policy/p-inro61w0"
      ]
    }
  ]
}
```

If successful, there will be no errors, but there won't be any output, either. That's okay, we can use an earlier command to verify if that is attached to our experimental account

```bash
aws organizations list-policies-for-target --filter SERVICE_CONTROL_POLICY --target-id <account_id>
```

Instead of just the one, default policy, there should now be 2 policies listed, and more precisely, our AllowListRegion policy:

```json
{
  "Policies": [
    {
      "Id": "p-inro61w0",
      "Arn": "arn:aws:organizations::<account_id>:policy/o-6lhxkkma2d/service_control_policy/p-inro61w0",
      "Name": "AllowListRegion",
      "Description": "Explicity allows operation in only a region(s)",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": false
    },
    {
      "Id": "p-FullAWSAccess",
      "Arn": "arn:aws:organizations::aws:policy/service_control_policy/p-FullAWSAccess",
      "Name": "FullAWSAccess",
      "Description": "Allows access to every operation",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": true
    }
  ]
}
```

### Detach Policy

Now we need to make sure we have permissions to detach the policy from the account for when we want to restore back to using our region that we blocked above.

```bash
aws organizations detach-policy --policy-id p-inro61w0 --target-id <account_id>
```

Name: DetachSCP

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "organizations:DetachPolicy",
      "Resource": [
        "arn:aws:organizations::*:account/o-*/*",
        "arn:aws:organizations::716374413161:policy/o-6lhxkkma2d/service_control_policy/p-inro61w0"
      ]
    }
  ]
}
```

Similar to attaching and verifying, we can detach and verify that we no longer have this policy and are back to just the default policy

```json
{
  "Policies": [
    {
      "Id": "p-FullAWSAccess",
      "Arn": "arn:aws:organizations::aws:policy/service_control_policy/p-FullAWSAccess",
      "Name": "FullAWSAccess",
      "Description": "Allows access to every operation",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": true
    }
  ]
}
```

### Update Policy

We know there will be some experimentation with regions on, regions off. But sometimes your desired region choices change. Either due to pricing, feature availability, or latency. Let's make sure we can change our allow-listed "DR" region in that event.

For this example, we will just change from allowing `us-west-1, us-east-2` to allowing `us-west-2, us-east-2`

```bash
aws organizations update-policy --policy-id p-inro61w0 --content file://policy.json
```

Name: UpdateSCP

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "organizations:UpdatePolicy",
      "Resource": "arn:aws:organizations::716374413161:policy/o-6lhxkkma2d/service_control_policy/p-inro61w0"
    }
  ]
}
```

Similar to creating an SCP, successfully updating one will spit back the updated policy, and the json-stringified policy contents. We will omit that here, because it's a mess.

### Create a resource in 2 regions, we'll just use an ec2 instance

If you want to get a bare-bones nginx instance running, this article is my goto https://www.nginx.com/blog/setting-up-nginx/

But we really just want to see if we can describe instances before and after region blocking.

Create a tiny ec2 instance in the experimental account in the primary (us-east-2) and secondary (us-west-2) regions.

Do note, we are going to dramatically reduce the output of these commands by parsing with a tool called `jq`. This is a reference you can follow for quick syntax examples

https://blog.scottlowe.org/2018/05/23/quick-post-parsing-aws-instance-data-with-jq/

List instance in us-east-2 (remember to assume a role in the experimental account, not the master account)

```bash
aws ec2 describe-instances --region us-east-2 | jq '.Reservations[] | .Instances[] | {ID: .InstanceId}'
```

```json
{
  "ID": "i-0b5a6563865e097da"
}
```

List instance in us-west-2 (remember to assume a role in the experimental account, not the master account)

```bash
aws ec2 describe-instances --region us-west-2 | jq '.Reservations[] | .Instances[] | {ID: .InstanceId}'
```

```json
{
  "ID": "i-0be1ea7c43f78a323"
}
```

At this point, feel free to stop the running instances, we aren't requiring them to be running (and charging you money) to complete the experiment.

Do note: You must terminate these to avoid all charges. The basic 8gb of EBS storage for each of the 2 instances does have a nominal charge, on a recurring monthly basis!

Stopped, unused, instances are an insidious place to leak money.

### Block our primary region

- Update policy to block us-east-2
- Attach policy
- List from primary (us-east-2)
- List from secondary (us-west-2)

Hypothesis:

We can list from secondary (us-west-2)
We cannot list from primary (us-east-2)

Updated policy blocking primary (us-east-2)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "NotAction": [
        "a4b:*",
        "acm:*",
        "aws-marketplace-management:*",
        "aws-marketplace:*",
        "aws-portal:*",
        "awsbillingconsole:*",
        "budgets:*",
        "ce:*",
        "chime:*",
        "cloudfront:*",
        "config:*",
        "cur:*",
        "directconnect:*",
        "ec2:DescribeRegions",
        "ec2:DescribeTransitGateways",
        "ec2:DescribeVpnGateways",
        "fms:*",
        "globalaccelerator:*",
        "health:*",
        "iam:*",
        "importexport:*",
        "kms:*",
        "mobileanalytics:*",
        "networkmanager:*",
        "organizations:*",
        "pricing:*",
        "route53:*",
        "route53domains:*",
        "s3:GetAccountPublic*",
        "s3:ListAllMyBuckets",
        "s3:PutAccountPublic*",
        "shield:*",
        "sts:*",
        "support:*",
        "trustedadvisor:*",
        "waf-regional:*",
        "waf:*",
        "wafv2:*",
        "wellarchitected:*"
      ],
      "Resource": "*",
      "Effect": "Deny",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": ["us-west-2"]
        }
      }
    }
  ]
}
```

Attach the policy (execute this from the limited user in the management account)

```bash
aws organizations attach-policy --policy-id p-inro61w0 --target-id <account_number>
```

Verify the attached policy

```bash
aws organizations list-policies-for-target --filter SERVICE_CONTROL_POLICY --target-id <account_id>
```

```json
{
  "Policies": [
    {
      "Id": "p-inro61w0",
      "Arn": "arn:aws:organizations::<master_account_number>:policy/o-6lhxkkma2d/service_control_policy/p-inro61w0",
      "Name": "AllowListRegion",
      "Description": "Explicity allows operation in only a region(s)",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": false
    },
    {
      "Id": "p-FullAWSAccess",
      "Arn": "arn:aws:organizations::aws:policy/service_control_policy/p-FullAWSAccess",
      "Name": "FullAWSAccess",
      "Description": "Allows access to every operation",
      "Type": "SERVICE_CONTROL_POLICY",
      "AwsManaged": true
    }
  ]
}
```

From the child account, now try to list the instances in us-east-2

```bash
$ > aws ec2 describe-instances --region us-east-2 | jq '.Reservations[] | .Instances[] | {ID: .InstanceId}'

An error occurred (UnauthorizedOperation) when calling the DescribeInstances operation: You are not authorized to perform this operation.
```

And then from us-west-2

```bash
$ > aws ec2 describe-instances --region us-west-2 | jq '.Reservations[] | .Instances[] | {ID: .InstanceId}'
{
  "ID": "i-0be1ea7c43f78a323"
}
```

So far, our experiment is successful! Even an administrator role in the child account, with full stars access, can no longer even issue that command!

### Undo our work and validate

Detach the policy (from the limited user, in the management account)

```bash
aws organizations detach-policy --policy-id p-inro61w0 --target-id <account_id>
```

Validate (from the child account, that instances in both regions can again be described)

Primary

```bash
$ > aws ec2 describe-instances --region us-east-2 | jq '.Reservations[] | .Instances[] | {ID: .InstanceId}'
{
  "ID": "i-0b5a6563865e097da"
}
```

Secondary

```bash
$ > aws ec2 describe-instances --region us-west-2 | jq '.Reservations[] | .Instances[] | {ID: .InstanceId}'
{
  "ID": "i-0be1ea7c43f78a323"
}
```

We have tested our hypothesis that this SCP will be able to shut down almost all access to resources, via IAM. This means that anything relying on API calls to AWS itself will be blocked.

This would be API gateways invoking lambdas, operations with dynamo, interaction with queues, etc. All the basics needed to power a modern app. Shut down immediately.

Fascinating stuff!

### Cleanup

To save money:

Terminate EC2 instances (don't forget any key-pairs, if you created them)

These things are handy to have around for further experimentation, but can safely be deleted for this exercise:

- SCP policy we created
- IAM policies in the management account for the limited user
- Cross-account policies for limited user and admin user
- Entire experimental account, if desired
