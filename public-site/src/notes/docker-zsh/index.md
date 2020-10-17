---
title: "Introducing a zsh test with docker"
---

I'm going to iterate on a simple idea: I want to test out zsh in a docker container and validate that some of my existing bash scripts, config, aliases, and functions still work.

This is the start of a series of notes. I'll be listing links to the other pages at the top as these notes grow too large for one note.

## Why would I want to do this

Well, I'm really behind on a mac os upgrade. There is software I can't use (karabiner, for example) because of this. I normally wait about one version, out of an abundance of caution. But I wanted longer than that for one big reason: zsh is now the default shell. I use bash, and more importantly, old bash that came pre-installed on mac.

Now, you're probably thinking to yourself, "You can always switch back to bash, and it's only the default shell for new accounts, not existing ones." And you'd be right!

However, why not dive in and try to learn and use a more modern, elegant shell (from what I've heard) and just "pretend" that I have an urgent reason?

## So here is the experiment plan

Every good experiment should start with a hypothesis. And the experiment should be as clear as possible.

Hypothesis: The current bash setup that I have is not terribly incompatible with zsh, and with a little remediation should be the least of my concerns when migrating mac versions.

To accomplish the experiment, I will use Docker to isolate the installation, configuration, and testing. While using an actual separate mac would be the ideal test bed, and I do have one I could use, many others do not and I want this to be informative for as many people as possible (Including future me for when I may not have an extra, modern mac just laying around).

### Base image

First we need to start with a base image. I'm going to pick Ubuntu, just because it has enough of the things already included. I'll also be picking 20.04 as it's the latests LTS, released April 23rd, 2020. Let's get started.

First, head over to [Docker Hub](https://hub.docker.com/_/ubuntu) and search for `Ubuntu`. The image we want is the Ubuntu version 20.04. The way Docker does versioning is the image name, then a colon, then the `tag` for the image. The tags are controlled in a similar (but slightly different) way that GIT uses tags to create "markers in time" for a version of software.

To get this image locally, fire up a terminal and run this:

```sh
docker pull ubuntu:20.04
```

Keep an eye on that output. You will see something like this:

```sh
20.04: Pulling from library/ubuntu
d72e567cc804: Pull complete
0f3630e5ff08: Pull complete
b6a83d81d1f4: Pull complete
Digest: sha256:bc2f7250f69267c9c6b66d7b6a81a54d3878bb85f1ebb5f951c896d13e6ba537
Status: Downloaded newer image for ubuntu:20.04
docker.io/library/ubuntu:20.04
```

Where you see the lines that start with a hash, then pull complete. Those are called `layers`. We'll be talking more about that soon.

Verify that you have it available locally with (hecc, you may already have it):

```sh
docker image ls | grep ubuntu
```

```sh
ubuntu  20.04  9140108b62dc  3 weeks ago  72.9MB
```

Now that we have an image pulled, we want to create a container from it. Think of an image as blueprints for a house, and a container is the house after it's built.

You can create a container, you can run a container. You can create and run a container in one step, and here are the 3 ways:

Create a container from an image:

```sh
docker container create ubuntu:20.04
```

This will spit out a long hash, and you can see the container created, but not running with:

```sh
docker container ls -a
```

```sh
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
0f176a00b28a        ubuntu:20.04        "/bin/bash"         8 seconds ago       Created                                 elastic_ellis

```

Now let's start that specific container. The name has been automatically created, but it's much easier than typing in the container ID.

```sh
docker start elastic_ellis
```

Wait, what happened? Well it did start the container, but there isn't any defined process to keep that container running, so it will exit immediately.

Let's verify that assumption:

```sh
docker container ls -a
```

```sh
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
0f176a00b28a        ubuntu:20.04        "/bin/bash"         17 minutes ago      Exited (0) 7 minutes ago                       elastic_ellis

```

Ah-ha! Look at the status. Now the status is `Exited (0)` which illustrates that the start worked, and the container exited successfully with an exit code of zero.

Well this is all fun and whatnot, but we really want to have this thing running, and be able to do some experiments inside of it. Like, installing and testing software.

### Install zsh

### Record the configuration

### Save container state

### Validate existing bash stuff in zsh

### Remediate any defects found back into my repo
