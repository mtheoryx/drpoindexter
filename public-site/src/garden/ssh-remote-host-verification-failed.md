---
title: "SSH remote host identification has changed"
---

From time to time, I have an AWS EC2 instance that I SSH into. And then on reflection, I create a static EIP for a more dependable experience.

But when I try to SSH into that new public DNS, I get the following error:

```sh
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
```

Well here's how to fix that:

```sh
ssh-keygen -R <hostname>
```

That's it, any entry in known_hosts will get removed, and it's like you're starting fresh.
