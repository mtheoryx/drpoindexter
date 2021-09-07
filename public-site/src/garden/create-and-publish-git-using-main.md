---
title: "Create and publish a new repo with Main as the default branch name"
---

Below is my previous method for initializing a local git repo, and publishing it to Github. The problem was that my local repo was using `master` as the default branch name, which is not the default branch name for my repo in github.

Turns out, there is an option you can pass to git init that allows you to specify the default branch name. In my case, I choose main

```bash
$ > git init -b main
```

Using hub to publish has no issues, nor does using the `git push` command.

```bash
~/code/training/cdk/basics > [main]
$ > hub create -p cdk-basics
Updating origin
https://github.com/mtheoryx/cdk-basics
~/code/training/cdk/basics > [main]
$ > git remote -v
origin  git@github.com:mtheoryx/cdk-basics.git (fetch)
origin  git@github.com:mtheoryx/cdk-basics.git (push)
~/code/training/cdk/basics > [main]
$ > git branch -a
* main
~/code/training/cdk/basics > [main]
$ >
```

### Create a new repo in github

My usual method of git init:

```bash
$ > git init
Initialized empty Git repository in /Users/drpoindexter/code/contrib/dynamo-geosearch/.git/
```

We add a couple of files, add them, and commit them locally

```bash
$ > ls -la

total 8
drwxr-xr-x   6 drpoindexter  staff   192 Aug 16 19:27 .
drwxr-xr-x  32 drpoindexter  staff  1024 Aug 16 19:23 ..
drwxr-xr-x  13 drpoindexter  staff   416 Aug 16 19:29 .git
-rw-r--r--   1 drpoindexter  staff  3037 Aug 16 19:28 .gitignore
drwxr-xr-x   3 drpoindexter  staff    96 Aug 16 19:23 .vscode
-rw-r--r--   1 drpoindexter  staff     0 Aug 16 19:27 README.md
```

Then we can use `hub` to create a private repo, for now

```bash
$ > hub create -p
Updating origin
https://github.com/mtheoryx/dynamo-geosearch
```

Wait, something's wrong... if we pop the new repo open and find the help for "push an existing repo" we notice that github made the primary branch `main` (which is great!)

```bash
$ > git remote add origin git@github.com:mtheoryx/dynamo-geosearch.git
$ > git branch -M main
$ > git push -u origin main
```

But a local git init still made this `master` (can we override this by default? To explore later)

```bash
$ > git branch -a
* master
```

No worries, this is fixable locally before we do the push to remote. First, let's make a new branch named main and switch to it, and then just delete the master branch.

_Note, you can chain operations in bash/zsh/etc in this way_

```bash
$ > git checkout -b main && git branch -D master
Switched to a new branch 'main'
Deleted branch master (was 55ef951).
```

Great! now let's follow the advice from the hub of git to connect this thing up and get a reliable remote.

Success looks like this:

```bash
$ > git branch -a
* main
```
