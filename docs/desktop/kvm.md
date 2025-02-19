---
title: KVM
sidebar_position: 3
---

# 基于 OpenSBI-H 的 KVM 虚拟化

RevyOS 为 `TH1520` 平台提供基于 OpenSBI-H 的 KVM 虚拟化。

目前已验证支持的开发板：

- Milk-V Meles
- Sipeed Lichee Pi 4A

:::warning
TH1520 平台的 OpenSBI-H 为**实验性支持**。
可能会遇到 KVM 启动时间久、控制台输出缓慢、特定场景性能下降严重等问题。
:::

## 软件包安装

:::note
旧版本系统不被支持，请使用最新版本镜像。
:::

在安装之前，请务必执行一次全系统更新，并安装 `6.6.77` 版本内核。此版本附带了 `kvm` 内核模块。

安装结束后，重启系统。

```shell
sudo apt update; sudo apt upgrade -y
sudo apt install -y th1520-mainline-opensbi-h qemu-system wget linux-image-6.6.77-th1520
# 如需使用 U-Boot 引导 VM：
# sudo apt install -y u-boot-qemu
sudo reboot
```

## 验证

若您的开发板已连接 UART 串口，则可以在启动时的串口打印中看到类似如下字样：

```log
Hypervisor Extension      : Emulated
Shadow PT Space Base      : 0x3ff000000
Shadow PT Space Size      : 4096 pages
```

此外，进入系统后，可检查 `/proc/cpuinfo`：

```shell
grep isa /proc/cpuinfo
```

应当会输出类似如下内容（可以看到每个核心的 ISA 部分增加了 H 扩展）：

```log
processor       : 0
hart            : 0
isa             : rv64imafdch_zicntr_zicsr_zifencei_zihpm_xtheadvector
mmu             : sv39
uarch           : thead,c910
mvendorid       : 0x5b7
marchid         : 0x0
mimpid          : 0x0

processor       : 1
hart            : 1
isa             : rv64imafdch_zicntr_zicsr_zifencei_zihpm_xtheadvector
mmu             : sv39
uarch           : thead,c910
mvendorid       : 0x5b7
marchid         : 0x0
mimpid          : 0x0

processor       : 2
hart            : 2
isa             : rv64imafdch_zicntr_zicsr_zifencei_zihpm_xtheadvector
mmu             : sv39
uarch           : thead,c910
mvendorid       : 0x5b7
marchid         : 0x0
mimpid          : 0x0

processor       : 3
hart            : 3
isa             : rv64imafdch_zicntr_zicsr_zifencei_zihpm_xtheadvector
mmu             : sv39
uarch           : thead,c910
mvendorid       : 0x5b7
marchid         : 0x0
mimpid          : 0x0
```

## 使用

加载 `kvm` 内核模块。

```shell
sudo modprobe kvm
```

检查 `dmesg`：

```log
$ sudo dmesg | grep kvm
[ 1645.703407] kvm [762]: hypervisor extension available
[ 1645.708548] kvm [762]: using Sv39x4 G-stage page table format
[ 1645.714352] kvm [762]: VMID 0 bits available
```

我们提供了一个基于 `busybox` 的 KVM demo，其中附带了一份静态编译的 `coremark` 二进制，可自行取用。

:::warning
您可能会发现 `coremark` 执行速度非常慢，这是预期结果。
目前的性能测试结果可能无法反映 VM 的真实性能。
:::

```shell
wget https://mirror.iscas.ac.cn/revyos/extra/kvm_demo/rootfs_kvm_guest.img \
     https://mirror.iscas.ac.cn/revyos/extra/kvm_demo/start_vm.sh \
     https://mirror.iscas.ac.cn/revyos/extra/kvm_demo/Image \
```

启动 KVM：

```shell
chmod +x start_vm.sh; ./start_vm.sh
```

`qemu-system-riscv64` 的如下警告是预期的，可安全忽略：

```log
qemu-system-riscv64: warning: disabling h extension for hart 0x0 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zba extension for hart 0x0 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zbb extension for hart 0x0 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zbc extension for hart 0x0 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zbs extension for hart 0x0 because privilege spec version does not match
qemu-system-riscv64: warning: disabling sstc extension for hart 0x0 because privilege spec version does not match
qemu-system-riscv64: warning: disabling h extension for hart 0x1 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zba extension for hart 0x1 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zbb extension for hart 0x1 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zbc extension for hart 0x1 because privilege spec version does not match
qemu-system-riscv64: warning: disabling zbs extension for hart 0x1 because privilege spec version does not match
qemu-system-riscv64: warning: disabling sstc extension for hart 0x1 because privilege spec version does not match
```

按 `Enter` 激活终端：

```log
[   13.274754] Run /init as init process
           _  _
          | ||_|
          | | _ ____  _   _  _  _ 
          | || |  _ \| | | |\ \/ /
          | || | | | | |_| |/    \
          |_||_|_| |_|\____|\_/\_/

               Busybox Rootfs

Please press Enter to activate this console.
/ #
```

屏幕录像（运行在 Milk-V Meles 上）：

[![asciicast](https://asciinema.org/a/0WZEkADT8gh9GmTHuqoHrSxHa.svg)](https://asciinema.org/a/0WZEkADT8gh9GmTHuqoHrSxHa)

CoreMark 结果如下：

```log
/ # coremark
2K performance run parameters for coremark.
CoreMark Size    : 666
Total ticks      : 19343
Total time (secs): 19.343000
Iterations/Sec   : 10339.657757
Iterations       : 200000
Compiler version : GCC13.2.0
Compiler flags   : -O2   -lrt
Memory location  : Please put data memory location here
                        (e.g. code in flash, data on heap etc)
seedcrc          : 0xe9f5
[0]crclist       : 0xe714
[0]crcmatrix     : 0x1fd7
[0]crcstate      : 0x8e3a
[0]crcfinal      : 0x4983
Correct operation validated. See README.md for run and reporting rules.
CoreMark 1.0 : 10339.657757 / GCC13.2.0 -O2   -lrt / Heap
/ #
```

## 恢复

恢复原本的 OpenSBI，然后重启即可。

```shell
sudo apt install th1520-mainline-opensbi -y
```

## 致谢

- [OpenSBI-H](https://github.com/dramforever/opensbi-h) - [dramforever](https://github.com/dramforever), [ZenithalHourlyRate](https://github.com/ZenithalHourlyRate)
- [TH1520 OpenSBI-H](https://github.com/revyos/opensbi/tree/th1520-v1.6-h) 适配 - [wxjstz](https://github.com/wxjstz)
- RevyOS - [RevySR](https://github.com/RevySR)
- 测试及文档撰写 - [KevinMX](https://github.com/KevinMX)