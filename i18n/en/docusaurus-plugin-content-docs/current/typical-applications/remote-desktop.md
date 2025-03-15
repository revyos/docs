---
title: Remote Desktop Connection to LicheePi 4A
sidebar_position: 7
---

# Remote Desktop Connection to LicheePi 4A

This article introduces various methods to remotely connect to the desktop environment of Licheepi 4A, helping users achieve remote development and usage without an external monitor.

## Prerequisites

- Licheepi 4A development board
- RevyOS system
- Stable network connection
- Remote host (Windows/Linux/Mac)

Introduction: If you want to use the LicheePi 4A desktop but find it inconvenient to switch keyboards, mice, and monitors every time, and you can't record the screen, you can try VNC remote desktop.

### Operations needed on LicheePi 4A:

```bash
sudo apt-get update
//Usually, the LicheePi 4A official system desktop is xfce4
sudo apt-get install xfce4 xfce4-goodies
```

##### Install tigervncserver:

```bash
sudo apt install tigervnc-standalone-server
```

##### Initialize vncserver:

After installing the VNC server, use the vncserver command to set up a secure password and create initial configuration files:

```bash
sudo vncserver
```

The first time you run it, the system will prompt you to **set a password for remote access to the machine**

##### Edit the configuration file:

```bash
vim .vnc/xstartup
```

Paste the following code and save:

```bash
#!/bin/sh
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
startxfce4 &
```

##### Start the VNC service:

```bash
sudo vncserver -localhost no :1
```

Note: Not adding options will cause the LicheePi 4A vncserver to only listen on the local loopback port 5901 instead of all 5901 ports. (This is what troubled me; I couldn't connect remotely until I tried to access the VNC from the LicheePi itself and discovered the issue.)

Check the listening status:

```bash
sudo netstat -tuln | grep 5901
```

Additional:

```bash
# View vncserver services
sudo vncserver -list
# Kill the service on port 5901
sudo vncserver -kill :1
```

### Operations needed on your computer:

##### Install remmina:

```bash
sudo apt install remmina remmina-plugin-vnc
```

##### Launch remmina:

`remmina`

After launching the UI, click the plus sign in the upper left corner to add a configuration:

![image-20240926193206009](https://raw.githubusercontent.com/jason-hue/plct/main/imagesimage-20240926193206009.png)

Click save and connect to successfully connect

![image-20240926193333404](https://raw.githubusercontent.com/jason-hue/plct/main/imagesimage-20240926193333404.png)

by: You can set up an auto-start service for more convenience.
