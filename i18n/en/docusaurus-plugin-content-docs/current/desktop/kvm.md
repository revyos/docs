---
title: KVM
sidebar_position: 3
---

# KVM Virtualization based on OpenSBI-H

RevyOS provides KVM support for `TH1520` platform, based on OpenSBI-H.

Currently supported & verified boards:

- Milk-V Meles
- Sipeed Lichee Pi 4A

:::warning
OpenSBI-H support on TH1520 is **experimental**.
Do expect issues like long KVM boot time, slow console output, or significant performance loss in specific use cases.
:::

## Install Packages

:::note
Older system versions are not supported, please use the latest system image.
:::

Before proceeding, you must do a full system upgrade, and install kernel version `6.6.77`, which comes with `kvm` module.

Once the installation is completed, do a system reboot.

```shell
sudo apt update; sudo apt upgrade -y
sudo apt install -y th1520-mainline-opensbi-h qemu-system wget linux-image-6.6.77-th1520
# If you need to boot the VM with U-Boot:
# sudo apt install -y u-boot-qemu
sudo reboot
```

## Verification

If you already connected UART serial to your board, you will see the following log output during boot:

```log
Hypervisor Extension      : Emulated
Shadow PT Space Base      : 0x3ff000000
Shadow PT Space Size      : 4096 pages
```

After booting into the system, you can check `/proc/cpuinfo`:

```shell
grep isa /proc/cpuinfo
```

Which should looks like this (every core's ISA part has H extension added):

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

## Usage

Load `kvm` kernel module.

```shell
sudo modprobe kvm
```

Check `dmesg`：

```log
$ sudo dmesg | grep kvm
[ 1645.703407] kvm [762]: hypervisor extension available
[ 1645.708548] kvm [762]: using Sv39x4 G-stage page table format
[ 1645.714352] kvm [762]: VMID 0 bits available
```

We provide a KVM demo based on `busybox`, which comes with a static built `coremark` binary for your convenience.

:::warning
You might see unreasonably slow execution time for `coremark`. This is expected.
For now, benchmark results might not reflect real VM performance.
:::

```shell
wget https://mirror.iscas.ac.cn/revyos/extra/kvm_demo/rootfs_kvm_guest.img \
     https://mirror.iscas.ac.cn/revyos/extra/kvm_demo/start_vm.sh \
     https://mirror.iscas.ac.cn/revyos/extra/kvm_demo/Image \
```

Start the KVM:

```shell
chmod +x start_vm.sh; ./start_vm.sh
```

The following warnings by `qemu-system-riscv64` are expected and can be safely ignored:

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

Press `Enter` to active the console:

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

CoreMark results as follows:

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

## Restore

Revert to the original OpenSBI and then reboot.

```shell
sudo apt install th1520-mainline-opensbi -y
```

## Credits

- [OpenSBI-H](https://github.com/dramforever/opensbi-h) - [dramforever](https://github.com/dramforever), [ZenithalHourlyRate](https://github.com/ZenithalHourlyRate)
- [TH1520 OpenSBI-H](https://github.com/revyos/opensbi/tree/th1520-v1.6-h) port - [wxjstz](https://github.com/wxjstz)
- RevyOS - [RevySR](https://github.com/RevySR)
- Testing and documents - [KevinMX](https://github.com/KevinMX)