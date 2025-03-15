---
title: Running the Game "Baby Is You" on LicheePi 4A
sidebar_position: 6
---

# Running the Game "Baby Is You" on LicheePi 4A

This article explains how to compile, install, and run the indie game "Baby Is You" on the Licheepi 4A platform.

## Game Introduction

"Baby Is You" is a popular puzzle game inspired by "Baba Is You." It features simple pixel graphics and rule-based game mechanics, making it well-suited for running on embedded devices.

## Environment Preparation

- Licheepi 4A development board
- RevyOS system
- Basic development environment

1. Configure `locales`

   ```
   sudo apt install locales
   sudo dpkg-reconfigure locales
   ```

2. Install box64, refer to [COMPILE.md](https://github.com/ptitSeb/box64/blob/main/docs/COMPILE.md#for-risc-v).

   ```bash
   git clone https://github.com/ptitSeb/box64.git
   cd box64
   mkdir build
   cd build
   cmake .. -D RV64=1 -D CMAKE_BUILD_TYPE=RelWithDebInfo
   make -j$(nproc)
   sudo make install
   ```

3. Install [gl4es](https://github.com/ptitSeb/gl4es):

   ```
   git clone https://github.com/ptitSeb/gl4es
   cd gl4es
   mkdir build
   cd build 
   cmake .. -DCMAKE_BUILD_TYPE=RelWithDebInfo
   make -j$(nproc)
   ```

4. Purchase Baby Is You and download the Linux version

5. Make the game launcher executable: `chmod +x run.sh` in the game package

6. Run `LD_LIBRARY_PATH=path/to/gl4es/lib/:$LD_LIBRARY_PATH BOX64_BASH=path/to/box64/tests/bash box64 path/to/Baby Is You/run.sh`, and after a moment, you should see the game interface launch