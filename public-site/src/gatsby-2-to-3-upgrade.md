---
title: "Upgrading this site from Gatsby version 2 to version 3"
---

## Known stuff to do

- [x] Take care of existing Dependabot PRs (verify builds in Amplify, my god these take a long time)
- [ ] Clean up some old branches
- [ ] Clean up old Amplify connected branches
- [ ] Make a fresh branch for the upgrade process
- [ ] Make a fresh connected build in Amplify for upgrade branch
- [ ] Follow the [Gatsby Upgrade Guide](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#introduction)
- [ ] Fix any broken functionality from upgrade breaking changes
- [ ] PR and deploy production site

## Stuff I didn't know

The dependabot-generated PRs will auto-delete the branch after merge. Saves cleanup later, neat!

I mostly use `npm` for work and other projects, but for this one I use `yarn`. I noticed that the default auto-detection settings in Amplify used `yarn` for the build command, so I stick with that locally as well. Just in case.

`amplify.yml`

```yaml
version: 0.1
frontend:
  phases:
    preBuild:
      commands:
        - cd public-site
        - yarn install
    build:
      commands:
        - yarn build
  artifacts:
    baseDirectory: public-site/public
    files:
      - "**/*"
  cache:
    paths:
      - public-site/node_modules/**/*
```
