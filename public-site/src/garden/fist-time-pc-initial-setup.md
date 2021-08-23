---
title: "Setting up a fresh PC For development"
---

- [ ] Chrome & google sign-in (sync)
- [ ] 1password sign-in (sync)
- [ ] Enable Remote desktop, configure on mac https://docs.microsoft.com/en-us/windows-server/remote/remote-desktop-services/clients/remote-desktop-allow-access
- [ ] Enable WSL 1 and restart https://www.dpoindexter.com/garden/install-cmder-on-win-10-wsl-1/
- [ ] Install and set up ubuntu https://docs.microsoft.com/en-us/windows/wsl/user-support
- [ ] Set up auto hotkeys
- [ ] Set up cmder terminal for ubuntu
- [ ] Install and set up tmux with settings
- [ ] Configure vim and settings
- [ ] Install and configure vs code for cmder
- [ ] Configure AWS credentials and profiles

Note: I found out how to set the default directory in Ubuntu correctly https://conemu.github.io/en/BashOnWindows.html#wsl-home

`set "PATH=%ConEmuBaseDirShort%\wsl;%PATH%" & %ConEmuBaseDirShort%\conemu-cyg-64.exe --wsl -C~ -cur_console:pm:/mnt`

The addition of `-C~` after `--wsl` is the key.

- [ ] Create ssh key
- [ ] Set up ubuntu installs (below)

## Ubuntu Installs

- `sudo apt update && sudo apt upgrade`
- Git
- Node
- Nvm
- aws-cli
- awsume??

## New thoughts after a crash, the new first steps

First, get windows on there

- [x] Don't accept additional services
- [x] Don't enter license
- [x] Log into ms account
- [x] Confirm correct install drive, 2 external drives
- [x] Log out, shut down, remove media
- [x] Start up (check bios boot order)
- [x] Check drives are correct
- [x] Format "mistake drives"

Basic day to day:

- [x] Enter win pro license key
- [x] Backup/Recovery destinations & Schedule
- [x] Updates & interruption schedule
- [x] remote desktop setup and verify
- [x] chrome install, pin to taskbar
- [x] Remove edge shortcut and taskbar pin
- [x] 1password install, secret key, authenticate, and sync
- [x] chrome login
- [x] autohotkey install
- [x] autohokey mac script (need to re-find)
- [x] auto execute autohotkey on startup
- [x] discord
- [x] [ssh setup and verify](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)
- [x] foklift remote sftp setup and verify

Content Creation

- [x] obs
- [x] goxlr install
- [x] goxlr basic mic setup, starter settings
	- https://kettnercreative.com/audio-mixer/goxlr-sm7b-setup-settings/
- [x] Basic component, composite, and scene for sm7b audio in
- [x] obs ndi plugin
- [x] recording disk location (2nd SSD)

Streaming?

- [x] OBS profile (and credentials)
- [x] Camera control install and setup
- [ ] Scenes & Components
- [x] Stream & Record settings
- [ ] Music, effects, local stuff
- [ ] Screen cap from mac
- [ ] Camera(s)
- [ ] Streamdeck and controls

Games?

- [x] blizzard
	- [x] Go here! https://www.blizzard.com/en-us/apps/battle.net/desktop
	- [x] Make sure it's for windows!
	- [x] Auth to battlenet
	- [x] Pick games to install, and pick an alt install location. Be careful, your C drive is default on every install (the battlenet client, and the game(s))
- [x] steam
	- [x] Go here! https://store.steampowered.com/about/
	- [x] Click Install Steam (double check it's windows)
	- [x] Go ahead and install it on an external, esp if it's SSD and SATA internal
	- [x] The above may not apply if local disk latency impacts your game experience

Work?

- [ ] wsl2
- [ ] docker
- [ ] vs code with sync
- [ ] remote connect locally
- [ ] remote connect remotely (via ssh)
