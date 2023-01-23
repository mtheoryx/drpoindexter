---
title: "Creating and Deploying a Gatsby Site with AWS CDK"
---

- [x] initialize a gatsby blog starter
- [x] make the first gatsby default commit

- [x] install aws cdk
- [x] cdk init an app, choose javascript
- [x] update the gitignore
- [x] make the first commit
- [x] configure AWS sso
- [x] cdk bootstrap account and regions
- [x] cdk sync test and deploy shell to aws
- [x] configure cdk stack environment with account

Site Deployment Resources

- [x] set variables (domain) as props
- [x] set tags
- [x] create s3 bucket
- [ ] create sample static deployment
- [x] import hosted zone
- [x] create cert
- [x] set OAI
- [x] create distribution
- [x] Create r53 record for apex
- [x] create r53 record for www

CI/CD Pipeline

- [ ] create codestar connection (pending)
- [ ] authenticate github connection in codestar
- [ ] create aws resources

Blog Post(s) & Theme

- [ ] Find and implement a dark theme for site
- [ ] Write 3 blog posts
  - [ ] Project motivations & Document repo (possibly a markdown slide deck in MDX as a gatsby post?)
  - [ ] Review of CDK Implementation
  - [ ] Review of Gatsby && Build implementation

Gatsby Starter Blog
https://www.gatsbyjs.com/starters/gatsbyjs/gatsby-starter-blog

```sh
npm i -g aws-cdk
cdk --version # 2.45.0 (build af1fb7c)
```

```sh
cdk init app --language javascript
```

Configure AWS CLI for SSO
https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html

Make sure you select the region your SSO lives in, not the region you want to interact with! You will get an error otherwise about an Invalid Grant.

More info about using named profiles with IAM Identity Center (formerly AWS SSO)

Bootstrapping basics
https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_bootstrap

Bootstrapping multiple regions
https://gist.github.com/mtheoryx/a3f15acaa62259d07708cf1a2ed9471f

```bash
cdk bootstrap \
aws://310141637485/us-east-1 \
aws://310141637485/us-east-2 \
aws://310141637485/us-west-1 \
aws://310141637485/us-west-2 \
--profile cstgsso
```

CDK Docs
https://docs.aws.amazon.com/cdk/api/v2/

CDK API Reference Docs
https://docs.aws.amazon.com/cdk/api/v2/docs/aws-construct-library.html

Static Site Construct

https://constructs.dev/packages/aws-cdk-static-https-site/v/0.0.8?lang=typescript

CDK Pipelines
https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_codepipeline-readme.html

Note about github codestar connections
No L2 constructs in v2 yet?

Locally test Codebuild Buildspecs
https://aws.amazon.com/blogs/devops/announcing-local-build-support-for-aws-codebuild/

./codebuild_build.sh -i 3c8ea9e9584d -a local-build -m
