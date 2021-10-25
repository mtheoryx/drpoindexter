---
title: "Upgrading this site from Gatsby version 2 to version 4"
---

## Known stuff to do

- [x] Take care of existing Dependabot PRs (verify builds in Amplify, my god these take a long time)
- [x] Clean up some old branches
- [x] Clean up old Amplify connected branches (automatic, see below)
- [x] Make a fresh branch for the upgrade process
- [x] Make a fresh connected build in Amplify for upgrade branch (automatic, see below)
- [x] Follow the [Gatsby Upgrade Guide](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/#introduction)
- [x] Fix any broken functionality from upgrade breaking changes
- [x] PR and deploy production site

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

Deleting the connected branch in Github also removes the Amplify branch-based preview. You may need to refresh to see the change in Amplify Console.

Additionally, I have a branch name-matching configuration that will pick up any branch that starts with `feat/` in Github, and create a preview environment in Amplify. It works really seamlessly.

Using yarn to upgrade interactive to latest... is problematic. Gatsby v4 is now the latest. I don't know an easy way to automatically update just to what gatsby 3 would want (or to what versions need only gatsby 3)

It was easier to just update everything to latest. Including skipping Gatsby 3 and going right for Gatsby 4. I still have two plugins not working:

- `gatsby-remark-copy-relative-linked-files`
- `gatsby-plugin-robots-txt`

Amplify was using node v12 by default. In order to force it to use node 14+ (required by Gatsby v4), I had to do 2 things.

- Create a `.nvmrc` file
- Add 2 steps in the Amplify build settings yaml

`.nvmrc`

```
v14.17.1
```

`amplify.yml`

```yaml
version: 0.1
frontend:
  phases:
    preBuild:
      commands:
        - cd public-site
        - nvm install
        - nvm use
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
