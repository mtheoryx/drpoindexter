---
title: "Notes taken from Learn with Jason writing a scope episode"
---

## Episodes and notes

### How to Write a Scope for a Website Project

[Link to episode](https://www.learnwithjason.dev/how-to-write-a-scope-for-a-website-project)

The following can help eliminate a lot of things that make planning hard.

ATOM:

- Actionable
- Timely
- Ownable
- Measurable

The "ownable" part is what really stuck out to me as an easy thing to lose in the planning steps but always rear its head in the execution phase. The example from the episode is a contact form.

But this could be anything.

The broad category the I can relate to is "Features Masquerading as Tasks".

When you have a "task" like "add a contact form", it's really when you start asking "Can I be the singular person that can own this entire thing" that you find out it's not a task.

It's a whole feature that is a collection of tasks or decisions. Of which a single person can be the sole owner of a subset of those (on most projects).

### Stuff to do in scoping

Starting from a whole designed UI is one way to start:

- Identify and enumerate the features/tasks
- Identify and enumerate the views
- Identify and enumerate the components of the views
- Identify and enumerate the common components

But these things equally can happen before a UI is built. Or they can be derived from something that already exists. As is the case of an adoption (mimic, not steal), a rewrite, a migration, or a refresh.

Including a "generic page" is a pretty good idea. A great number of pages will end up just being copy, images, etc used for a variety of things like about pages, licenses, codes of conduct, company updates, FAQ/Help pages.

Jason refers to this as "do-what-you-want text area" and that makes a lot of sense to me.

### The 'I' in RACI

We were discussing what that "Informed" means and I tossed out my understanding of it, and I think that started to make more sense to people watching.

> Informed means the person or persons who would look bad if they were not informed about the project, but should have been.

### What is the good enough, and what is the priority?

After everything is enumerated, you want to start refining from the "ideal end state" down to what is truly important and provides the MOST value for the LEAST effort/time/risk.

The ordering will then depend on a couple factors.

What can we do with what we have, who we have, and what we know with certainty?

Jason was going to do this part with Notion, but is using Github Projects in a new repo for the tasks.

> Start with what you suspect will work, then measure.

### Dropping things out of scope

As you are detailing out tasks and efforts, it can then become evident that there are just too many unknowns.

When this happens, and the provided value doesn't outweigh the risks of the unknown, an the amount of time/effort required to determine those down to known-knowns... just drag it out of scope.

The idea isn't lost. It's not cancelled. It's just paused until it makes more sense to include it in a later iteration. If you ever do. And if you don't ever do it, that's okay too. The people who contributed the idea and helped on fleshing it out won't be forgotten, ignored, or reprimanded.

Just learn to get comfy with the idea of "let it go" for now. And go build a snowman instead.

### Track ideas to changes to pushes to deployments

If you have smaller issues/prs then things are not only faster to develop, document, review, and push out the door...

They are easier to trace back from the production code to:

1. Who did that prod change?
1. Who approved that prod change?
1. Who even came up with this idea in the first place?

**Note:** This kind of traceability is required by certain regulations and security controls in various industries as well. Might as well get used to them now while you can still "mess up" and not, ya know, commit securities fraud or medical malpractice or something. Trust me.
