---
title: Licheepi 4A运行游戏Baby Is You
sidebar_position: 6
---

# Licheepi 4A运行游戏Baby Is You

本文介绍如何在 LicheePi 4A平台上编译、安装和运行独立游戏 `Baby Is You`。

## 游戏简介

`Baby Is You` 是一款受欢迎的益智推箱子类游戏，灵感来源于 `Baba Is You`。它具有简单的像素图形和基于规则的游戏机制，非常适合在嵌入式设备上运行。

## 环境准备

- Licheepi 4A开发板
- RevyOS系统
- 基本的开发环境

1. 配置 `locales`

   ```
   sudo apt install locales
   sudo dpkg-reconfigure locales
   ```

2. 安装 box64，参考 [COMPILE.md](https://github.com/ptitSeb/box64/blob/main/docs/COMPILE.md#for-risc-v)。

   ```bash
   git clone https://github.com/ptitSeb/box64.git
   cd box64
   mkdir build
   cd build
   cmake .. -D RV64=1 -D CMAKE_BUILD_TYPE=RelWithDebInfo
   make -j$(nproc)
   sudo make install
   ```

   

3. 安装 [gl4es](https://github.com/ptitSeb/gl4es)：

   ```
   git clone https://github.com/ptitSeb/gl4es
   cd gl4es
   mkdir build
   cd build 
   cmake .. -DCMAKE_BUILD_TYPE=RelWithDebInfo
   make -j$(nproc)
   ```

4. 购买 `Baby Is You`，下载 Linux 版

5. `chmod +x 游戏包中的run.sh`

6. 运行 `LD_LIBRARY_PATH=path/to/gl4es/lib/:$LD_LIBRARY_PATH BOX64_BASH=path/to/box64/tests/bash box64 path/to/Baby Is You/run.sh`，等一会，就可以看到游戏界面启动了