---
title: "Set up WSL1, Ubuntu, Cmdr, and VS Code on Windows 10"
---

## Set up remote desktop

For this machine, I need to use VPN for some things, but not all. Which means I can use Remote desktop.

Some info required includes the "computer name". In this case, I want to find the computer's IPv4 address. It is plugged into an 8 port unmanaged network switch, and so is the machine I'm trying to connect with.

Open the `System Settings`
Go to `Network & Internet`
Select `Ethernet` if you are hard-wired
Select the appropriate interface
Scroll down to `Properties` and note the IPv4 address. Mine started with `10.x.x.x`

This value is for the computer name. There is another value you can use for a "Friendly Name" to control how it appears in your list of configured Remote Desktop machines.

The default in Remote desktop will prompt you for a user and a password each time you connect. You can pre-configure a user, and opt to always use that one by default. It will still prompt for a password, but it will save the username/domain name.

## Set up WSL 1

_At time of configuring this, the Win10 version was too far behind to have recieved the back-ported WSL2 goodness. But this is a start._

[From the Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10), open powershell as an admin, and run the following command to enable WSL1:

`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`

Since we are only installing version 1, now we should restart our machine.

## Set up Ubuntu

[From the docs](https://docs.microsoft.com/en-us/windows/wsl/install-win10#install-your-linux-distribution-of-choice), now we can install the distribution of our choice, right from the Windows Store. I chose Ubuntu 18.04 LTS, just to keep things simple.

Once it's downloaded, launch this, and then pick a username and password. _You don't have to use the same username as you have in windows. This is whatever you want to name it, and whatever password you want to create._

## Set up a Terminal Emulator

Again because this version is a tiny bit old, I wasn't able to use the new Windows Terminal, so I looked around and found an app that looked pretty compelling for my use case: [Cmder](https://cmder.net/).

_Just to be safe I exited the Ubuntu VM_

Since I'll be integrating with an existing shell, in this case, the WSL1 Ubuntu installation, I first attempt to download and install the "Mini" version, just to see if I can get something working. I have 2 goals:

1. Use this with the Ubuntu shell
1. Use this with the VS Code integrated terminal

Once downloaded, right click the zip file, and extract to a location that is NOT the Program Files. I chose a folder in my user directory named `cmder_mini`.

### Configure Cmder first time for WSL1 Ubuntu

After launching Cmder, you'll see it just opens the regular Console for windows. What we're after is opening the shell for our WSL1 Ubuntu install.

Click the arrow just to the left of the green plus icon on the bottom tool bar and select {WSL} then the now-revealed option for {bash}. This will launch a new tab, and you will be in your Ubuntu vm.

What happens behind the scenes, sorta, is that you are in your VM. But your Windows home has now been mounted to the VM, and you land at that location inside the VM. This is almost never what you want to do.

_Mental Notes and Left Todos:_

- [ ] TODO: How can I open the wslbridge.exe by default AND land at the ubuntu users \$HOME directory?

### Configure Cmder for VS Code integration

In VS Code under Settings > Features > Terminal looks for the preference `Terminal > External: Windows Exec` and change this to the Windows path to Cmdr.exe on your system. For example:

`C:\Users\David.Poindexter\cmder_mini\Cmdr.exe`

## Update ubuntu

[Source Article](https://www.cyberciti.biz/faq/how-do-i-update-ubuntu-linux-softwares/)

For updating, you can use either `apt-get or` `apt`. I went with `apt`.

The following will update apt itself:

```bash
sudo apt update
```

The following will apply updates and patches on Ubuntu:

```bash
sudo apt upgrade
```

## Install NVM

The scale of this new project, and related services required for integration means I need several versions of node installed. For managing those installations, I've been using a tool called Node Version Manager (nvm) for a few years.

To install this on Ubuntu, I followed the instructions in the nvm repository on github:

[nvm-sh](https://github.com/nvm-sh/nvm#installing-and-updating)

The command I used was the following

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
```

To verify that it was installed correctly, you should see some feedback after running the following:

```bash
command -v nvm
-> nvm
```

## Install a Node version

After asking around on the team, we came up with a list of target node versions: 10, 12, and latest (14 currently). To install these, I ran the following:

```bash
nvm install 10
nvm install 12
nvm install 14
```

To verify these are installed, list the locally installed versions of node with the following:

```bash
nvm list
```

This should list out any of the versions that shipped with Ubuntu, and specicifically these 3 versions we just installed.

## Directory locations in wsl1

They are not meant for us to mess with from windows. They are in a hidden folder.

@TODO: Describe hidden folder
@TODO: Instructions to see hidden folder

## Create a git ssh key

https://docs.microsoft.com/en-us/azure/devops/repos/git/use-ssh-keys-to-authenticate?view=azure-devops

`ssh-keygen -C "you@email.com"`

## Connect a git ssh key in Asure DevOps

Go to your profile dropdown
Select "SSH Public Keys"
New key button
Give it a name
Paste in the public key data

~~@TODO~~Done: How to copy to clipboard with ubuntu?

[Here is a builtin way that appeared to work!](https://www.raymondcamden.com/2017/10/19/copying-to-clipboard-with-windows-subsystem-for-linux)

And with Remote Desktop I now also have that on my mac clipboard, ready to paste! Neat!

Then verify that it has been configured correctly:

```bash
ssh -T git@ssh.dev.azure.com
-> remote: Shell access is not supported.
```

## Install a boat load of VS Code Extensions

- CoenraadS.bracket-pair-colorizer
- formulahendry.auto-rename-tag
- johnpapa.Angular2
- johnpapa.vscode-peacock
- johnpapa.winteriscoming
- mikestead.dotenv
- ms-vscode-remote.remote-containers
- ms-vscode-remote.remote-ssh
- ms-vscode-remote.remote-ssh-edit
- ms-vscode-remote.remote-wsl
- ms-vscode-remote.vscode-remote-extensionpack
- msjsdiag.debugger-for-chrome
- msjsdiag.debugger-for-edge
- PKief.material-icon-theme
