---
title: "How I gained back over 50% of my disk space with a few bash commands"
---

## The leadup to a discovery and a fix for What is using all that dang space??

I had a really nice external SSD (Samsung T5 250GB) that was nearly full. I wanted to find out why, and how to fix it

Here's what the plan of attack was:

- Stream it on twitch
- Be careful not to reveal too much
- Find something common
- Determine if elimination of space-hogs was save
- Do the thing

Let's get started!

## Discovery

Using a Mac application called Daisy Disk, choose the external drive, scan it, and start looking for the large chunks of space. Identify those parts that are kinda "yeah, that stuff is just big" compared to ones that are suspect. Like... directories containing code.

Turns out, as a primarily JS/NodeJS-focused developer, I had a crap ton of `node_modules` directories! How did this happen? You know you should never check node_modules in version control.

Well... back up. Literally backups. I was about to run a pretty invasive, dangerous operation on a machine a while back, and I had code directories that I wasn't 100% sure were checked into github, and I didn't have time to correct that. So I copied those, whole hog, over to this drive. Yup, node_modules and all.

Now we've got a suspect, and we've determined eliminating those is no problem. I still need to get these into version control, or pushed up to github, but that's a tale for another day.

## The solution

So we launch iTerm2, bounce into that volume, and start doing small little tests to get output. We first thought some version of `ls` would work. Then tried `tree`. And eventually found that `find` will give us exactly what we want. The full qualified paths to every node_module directory.

We take that output, and basically just run remove on every single one of them. Like this:

```bash
find . -type d -name "node_modules" -mindepth 3 -maxdepth 4 | wc -l
find . -type d -name "node_modules" -mindepth 3 -maxdepth 7 | awk '{print \$1}' | xargs rm -r

tree -L 8 -f | grep node_modules
```

The result was that my disk usage was reduced from 96% used to only 42% used. And the beauty of it is that any of those can be restored with `npm install`.
