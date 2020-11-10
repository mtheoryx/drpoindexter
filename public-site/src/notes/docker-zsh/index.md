---
title: "Introducing a zsh test with docker"
---

I'm going to iterate on a simple idea: I want to test out zsh in a docker container and validate that some of my existing bash scripts, config, aliases, and functions still work.

This is the start of a series of notes. I'll be listing links to the other pages at the top as these notes grow too large for one note.

[Source Tutorial I started with](https://kifarunix.com/install-and-setup-zsh-and-oh-my-zsh-on-ubuntu-20-04/)

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

```bash
docker pull ubuntu:20.04
```

Keep an eye on that output. You will see something like this:

```bash
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

```bash
docker image ls | grep ubuntu
```

```bash
ubuntu  20.04  9140108b62dc  3 weeks ago  72.9MB
```

Now that we have an image pulled, we want to create a container from it. Think of an image as blueprints for a house, and a container is the house after it's built.

You can create a container, you can run a container. You can create and run a container in one step, and here are the 3 ways:

Create a container from an image:

```bash
docker container create ubuntu:20.04
```

This will spit out a long hash, and you can see the container created, but not running with:

```bash
docker container ls -a
```

```bash
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
0f176a00b28a        ubuntu:20.04        "/bin/bash"         8 seconds ago       Created                                 elastic_ellis

```

Now let's start that specific container. The name has been automatically created, but it's much easier than typing in the container ID.

```bash
docker start elastic_ellis
```

Wait, what happened? Well it did start the container, but there isn't any defined process to keep that container running, so it will exit immediately.

Let's verify that assumption:

```bash
docker container ls -a
```

```bash
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                     PORTS               NAMES
0f176a00b28a        ubuntu:20.04        "/bin/bash"         17 minutes ago      Exited (0) 7 minutes ago                       elastic_ellis

```

Ah-ha! Look at the status. Now the status is `Exited (0)` which illustrates that the start worked, and the container exited successfully with an exit code of zero.

Well this is all fun and whatnot, but we really want to have a container running interactively, and be able to do some experiments inside of it. Like, installing and testing software. The command we want to run is just the bash shell itself. Here's what this will look like:

```bash
docker run -it ubuntu:20.04 /bin/bash
```

```bash
root@406b61332161:/#
```

Your terminal prompt will now be within the running ubuntu container, in the bash shell, as the root user. Feel free to browse around, install software, test things out. When you exit the container, all changes are lost and you will be back to square one with a fresh container the next time you execute this command. More on change persistence soon.

### Install zsh

Well, we aren't _just_ going to install zsh. I want to try some other extras too. However, baby steps, one foot in front of the other.

First we have to update stuff in ubuntu. Here's some stuff to run:

```bash
apt update && apt upgrade -y
```

**Note**: Normally you would run this with `sudo`, but we are already in this container as root, so it's not needed.

Although zsh is available officially in the default Ubuntu 20.04 default repos, we will want to install oh-my-zsh later, so we'll go ahead and install that now.

```bash
apt install -y zsh
```

We can then verify that it's installed by listing the version:

```bash
zsh --version
zsh 5.8 (x86_64-ubuntu-linux-gnu)
```

List your current shell:

```bash
ps -p $$
PID TTY          TIME CMD
  1 pts/0    00:00:00 bash
```

List all available shells:

```bash
cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/bash
/bin/rbash
/usr/bin/rbash
/bin/dash
/usr/bin/dash
/bin/zsh
/usr/bin/zsh
```

Now we need to change our default shell, log out and then log back in. But remember, this is a container. When we exit the container, everything we did above is going to be lost. Now we need to start persisting some of these changes in a custom docker image. Let's start doing that next

### Start Recording the Basic Configuration

Every time we exit our container, everything we did above gets lost, and we have to re-do it every time. Let's record some of these basics in a custom Dockerfile that extends the base image.

For this part, we will essentially walk through he above steps, but this time record those lines in a file. So next time we "restart" our container, those things we know must happen, and we know they work, will be automatic. So create a docker file. The file name is just `Dockerfile`. No file extension, and spelled just like that.

```bash
cd some-project && touch Dockerfile
```

I'll be using vim for this, but feel free to open any text editor or IDE you prefer.

Similarly to before steps, we need a base image to pull from.

```Dockerfile
FROM ubuntu:20.04
```

Then we need to do updates to the OS itself

```Dockerfile
FROM ubuntu:20.04

RUN apt update && apt upgrade -y
```

How do we build this image? Previously we pulled an already made image from Docker Hub. But now, we need to build our own image, and then run a container from that custom image. Let's try it out.

```bash
docker build -t give-it-an-image-name .
```

Wait, the hecc is this?

```bash
WARNING: apt does not have a stable CLI interface. Use with caution in scripts.
```

Uh oh, what is that warning? [Well this looks like we should be using apt-get](https://askubuntu.com/questions/990823/apt-gives-unstable-cli-interface-warning) because apt itself shows progress bars and such that aren't "good" for scripts? We can change that.

```Dockerfile
FROM ubuntu:20.04

RUN apt-get update && apt-get upgrade -y
```

```bash
docker build -t give-it-an-image-name .
```

Giving this image a name with the `-t give-it-an-image-name` argument will make it easier for our later commands, and gives it an implicit image tag of `latest`. For anything other than local tests like these, don't rely on the `latest` tag with anything in docker.

**Note**: That final `.` at the end of the command designates the current working directory as the target to locate a Dockerfile, which we have created.

Now let's install zsh, in our Dockerfile, and then run our new container to make sure we have what we think we have.

```Dockerfile
FROM ubuntu:20.04

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y zsh
```

```bash
docker build -t zsh-custom .
```

```bash
docker run -it zsh-custom /bin/bash
```

```bash
root@a2a89385ade1:/# which zsh
/usr/bin/zsh
root@a2a89385ade1:/# zsh --version
zsh 5.8 (x86_64-ubuntu-linux-gnu)
```

Fantastic. Now let's refine our operation to do 2 more things:

1. Make sure the shell is permanently changed in the Dockerfile
2. Now let's "shell into" the new container with zsh.

```Dockerfile
FROM ubuntu:20.04

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y zsh

RUN usermod -s $(which zsh) root
```

And now we use zsh as our command:

```bash
docker run -it zsh-custom /bin/zsh
```

Double check a few things in the container:

```bash
c4e82a8aa39e# whoami
root
c4e82a8aa39e# zsh --version
zsh 5.8 (x86_64-ubuntu-linux-gnu)
c4e82a8aa39e# ps -p $$
  PID TTY          TIME CMD
    1 pts/0    00:00:00 zsh
c4e82a8aa39e#
```

Now we have an image with the very basics, and it's a little easier to fire up. And checked into code, if we want. Now we probably want a little bit more, like [Oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh/wiki).

There are 2 more commands we will need to install this, per instructions:

- git
- curl (or wget, pick your flavor)

We can add these to the `RUN` line where we are already installing zsh:

```Dockerfile
RUN apt-get install -y zsh curl git
```

Then, before we elect our default shell, we will insert the call to install oh-my-zsh.

It's really important to make sure that things we install have a non-interactive mode. Which means they don't wait for input to progress through installation steps. Lucky for us, oh-my-zsh had one with the option `--unattended`

The Dockerfile should now look similar to this:

```Dockerfile
FROM ubuntu:20.04

RUN apt-get update && apt-get upgrade -y

RUN apt-get install -y zsh curl git

RUN sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended

RUN usermod -s $(which zsh) $(whoami)

WORKDIR /root
```

### Save container state

_(@TODO)_

Now that we have a reproducible environment, we want to start introducing some tests of various bash customizations to test out in this container. We can persist data into and out of the container with Volumes.

### Validate existing bash stuff in zsh

_(@TODO)_

Now we should have some basic needs met in a zsh compatible way that is being saved in our container, that we can commit and push up to Github. When we update our OS, and use zsh as a default, we can easily clone this repo and have all those tested configurations immediately available in our new, happy zsh home.

### Remediate any defects found back into my repo

_(@TODO)_

Depending on the changes required, we might back-port those changes in a bash-compatible way. I will still have some other machines still on the older os, and still needing to use bash.
