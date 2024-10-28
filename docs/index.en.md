# RevyOS

## Introduction

[RevyOS](https://github.com/revyos) is a Debian-optimized custom distribution developed by the RevyOS team, supported by the [RuyiSDK](https://github.com/ruyisdk). 

__RevyOS__ provides comprehensive adaptation and optimization support for chips such as c910v, c920, c906fdv, and c908. It comes pre-integrated with the GCC toolchain supporting RVV0.7.1 and XThead, and utilizes glibc and thead-kernel optimized with the RVV0.7.1 instruction set.

Currently, __RevyOS__ meets basic user needs in office work, web browsing, and video watching.

Based on these customizations and optimizations, __RevyOS__ delivers excellent performance and a great experience on hardware platforms like Lichee Pi 4A, BeagleV-Ahead, and Milk-V Pioneer.

## Image Download and Flashing

The user version images of __RevyOS__ are currently updated on the [ISCAS (Institute of Software, Chinese Academy of Sciences)](https://mirror.iscas.ac.cn/revyos) / [Felix Finland Source](https://mirrors.felixc.at/revyos/) open-source mirror sites.

If you want to obtain the latest version of __RevyOS__, please select the corresponding device to get the appropriate U-Boot, boot partition, and root partition files:

| Supported Devices | Image Download (Latest Version) | Flashing Tutorial | SD Card Support | Kernel Version |
| --- | --- | --- | --- | --- |
| Lichee Pi 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/20240720/) | [Flashing Tutorial](./Installation/licheepi4a.md) |  |  |
| LicheePi Cluster 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lpi4a/) | [Flashing Tutorial](./Installation/licheepi4a.md)  |  |  |
| LicheeConsole 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/lcon4a/20240720/) | [Flashing Tutorial](./Installation/licheeconsole4a.md)  |  |  |
| Lichee Book 4A | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/laptop4a/) | [Flashing Tutorial](./Installation/licheebook.md)  |  |  |
| Milk-V Pioneer | [20241025](https://mirror.iscas.ac.cn/revyos/extra/images/sg2042/20241025/) | [Flashing Tutorial](./Installation/milkv-pioneer.md)  |  | 6.6.46 |
| Milk-V Meles | [20240720](https://mirror.iscas.ac.cn/revyos/extra/images/meles/20240720/) | [Flashing Tutorial](https://milkv.io/zh/docs/meles/installation)  |  |  |
| Beagle-Ahead | [20231210](https://mirror.iscas.ac.cn/revyos/extra/images/beagle/20231210/) | [Flashing Tutorial]()  |  |  |
| Huiwei Book | [20240617](https://mirror.iscas.ac.cn/revyos/extra/images/huiwei/test/20240617/) | [Flashing Tutorial]()  |  |  |

### How to Enable T-Head Optimized GCC

For detailed instructions, see this document on [How to Enable Optimized GCC](build/debian/enable_optimization_gcc.md).

## Changelog

After updating the version of the image, we will publish the supported content for the current version. If you wish to view the supported content of the image, please click on the [RevyOS Version Change Log](./changelog/) and select the version you need to check.

## Issues

If you encounter problems during use, you can report them by creating an [issue](https://github.com/revyos/revyos/issues).

## User Documentation

In this documentation, we provide relevant building and adaptation documentation, as well as testing documents to facilitate users' reference to certain content. Comprehensive documentation support accelerates users' familiarization with the system.

## User Group

RevyOS has its own Telegram group: [Invitation Link](https://t.me/+Pi6px22-OsUxM2M1)
