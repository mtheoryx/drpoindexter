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
